<script>
  import { camelCase } from "camel-case";
  import { onDestroy, onMount } from "svelte";
  import Job from "./../../components/Job.svelte";

  let jobs = {}; // Record<string (job id), {job: TJob, jobtTimestamp?: number, updateTimestamp?: number}>
  let messageCounts;
  let readyStatePoller; // setInterval handle
  let redisMetrics;
  let ws;
  let wsReadyState = WebSocket.CLOSED;

  function dateReviver(key, value) {
    if (
      typeof value === "string" &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)
    ) {
      return new Date(value);
    }
    return value;
  }

  onMount(async () => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    ws = new WebSocket(`${protocol}//${window.location.host}`);
    ws.addEventListener("message", ({ data }) => {
      handleMessage(JSON.parse(data, dateReviver));
    });

    ws.addEventListener("close", (a, b) => {
      wsReadyState = ws.readyState;
    });

    ws.addEventListener("error", (a, b) => {
      console.log("error", a, b);
      wsReadyState = ws.readyState;
    });

    readyStatePoller = setInterval(() => (wsReadyState = ws.readyState), 2500);
  });

  onDestroy(() => {
    readyStatePoller && clearInterval(readyStatePoller);
    ws && ws.close();
  });

  function cleanCompletedJobs() {
    ws.send(JSON.stringify({ kind: "clean_completed_jobs" }));
  }

  function retryAllFailedJobs() {
    ws.send(JSON.stringify({ kind: "retry_all_failed_jobs" }));
  }

  function removeJob(jobId) {
    ws.send(JSON.stringify({ kind: "remove_job", data: { jobId } }));
  }

  function retryJob(jobId) {
    ws.send(JSON.stringify({ kind: "retry_job", data: { jobId } }));
  }

  function updateJob(job, timestamp = 0) {
    if (!jobs.hasOwnProperty(job.id)) {
      jobs[job.id] = { job, jobtTimestamp: timestamp };
      return;
    }
    const { job: jobOld, jobtTimestamp: jobtTimestampOld } = jobs[job.id];
    if (!jobtTimestampOld || timestamp > jobtTimestampOld) {
      jobs[job.id] = { job, jobtTimestamp: timestamp };
    }
  }

  function handleMessage(m) {
    const { data, timestamp, kind } = m;
    if (!kind) {
      console.warn("Received a web socket message without a `kind`");
      return;
    }
    switch (kind) {
      case "redis_metrics":
        /**
         * metrics: {
         *   "redis_version":"5.0.7",
         *   "used_memory":"1041152",
         *   "mem_fragmentation_ratio":"2.47",
         *   "connected_clients":"2",
         *   "blocked_clients":"0",
         *   "total_system_memory":"68719476736" }
         */
        redisMetrics = objectMapCamelCase(data.metrics);
        break;
      case "message_counts":
        /**
         * counts: {
         *   active: 0,
         *   completed: 0,
         *   delayed: 0,
         *   failed: 0,
         *   paused: 0,
         *   waiting: 1
         * }
         */
        messageCounts = objectMapCamelCase(data.counts);
        break;
      case "jobs":
        data.jobs.forEach(job => updateJob(job, m.timestamp));
        break;
      case "progress":
        const { jobId, progress } = data;
        if (!jobs.hasOwnProperty(jobId)) {
          console.warn(
            `Received a \`progress\` event for job ${jobId}, but that job isn't in the front-end cache`
          );
        } else {
          const { progressTimestamp: progressTimestampOld } = jobs[jobId];
          if (!progressTimestampOld || progressTimestampOld < m.timestamp) {
            jobs[jobId].job.progress = progress;
            jobs[jobId].progressTimestamp = m.timestamp;
          }
        }
        break;
      case "removed":
        const { jobIds } = data;
        jobIds.forEach(jobId => {
          delete jobs[jobId];
        });
        jobs = jobs;
    }
  }

  function objectMapCamelCase(obj) {
    return Object.entries(obj).reduce((r, [k, v]) => {
      r[camelCase(k)] = v;
      return r;
    }, {});
  }

  function getMemoryUsageString(number) {
    if (number < 0.0001) {
      return "< 0.01%";
    }
    return `${Math.round(number * 10000) / 100}%`;
  }
</script>

<style>
  .upswyngbot-logo {
    width: 10rem;
  }
</style>

<section class="hero is-light">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-vcentered">
        <div class="column is-one-quarter">
          <img
            class="upswyngbot-logo"
            alt="The UpSwyngbot"
            src="/static/upswyngbot.svg" />
        </div>
        <div class="column">
          <h1 class="title is-family-monospace">
            UpSwyngbot
            <span class="tag is-dark is-family-primary">Admin</span>
          </h1>
          <h2 class="subtitle">
            <span class="is-family-monospace">UpSwyngbot</span>
            runs tasks like checking to make sure the links on UpSwyng aren't
            broken. Here is a look at
            <span class="is-family-monospace">UpSwyngbot's</span>
            recent work. To tell
            <span class="is-family-monospace">UpSwyngbot</span>
            to do something, message
            <span class="is-family-monospace">UpSwyngbot</span>
            on Slack.
          </h2>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    {#if (window && wsReadyState === window.WebSocket.OPEN) || messageCounts}
      <div class="level is-mobile">
        {#each ['Active', 'Completed', 'Delayed', 'Failed', 'Paused', 'Waiting'] as status}
          <div class="level-item has-text-centered is-narrow">
            <div>
              <p class="heading">{status}</p>
              <p class="title">
                {#if messageCounts}
                  {messageCounts[status.toLowerCase()]}
                {:else}-{/if}
              </p>
            </div>
          </div>
        {/each}
      </div>
    {/if}

    <div class="level is-mobile">
      <div class="level-left">
        <div
          class="level-item has-text-weight-medium is-uppercase is-size-6
          has-text-grey">
          {#if window}
            {#if wsReadyState === window.WebSocket.OPEN}
              <span class="has-text-info">Connected</span>
            {:else if wsReadyState === window.WebSocket.CONNECTING}
              <span class="has-text-warning">Connecting</span>
            {:else if wsReadyState === window.WebSocket.CLOSED}
              <span class="has-text-warning">Disconnected</span>
            {:else if wsReadyState === window.WebSocket.CLOSING}
              <span class="has-text-warning">Disconnecting</span>
            {/if}
          {/if}
        </div>
      </div>
      <div class="level-right">
        {#if Object.entries(jobs).some(([_, { job: j }]) => j.status === 'failed')}
          <div class="level-item">
            <button
              class="button is-inverted is-danger is-rounded"
              on:click={retryAllFailedJobs}>
              Retry failed
            </button>
          </div>
        {/if}
        {#if Object.entries(jobs).some(([_, { job: j }]) => j.status === 'completed')}
          <div class="level-item">
            <button
              class="button is-inverted is-success is-rounded"
              on:click={cleanCompletedJobs}>
              Clear completed
            </button>
          </div>
        {/if}
      </div>
    </div>

    <div class="content">
      {#each Object.keys(jobs) as id, i (id)}
        <Job
          job={jobs[id]['job']}
          on:remove-job={({ detail }) => removeJob(detail.jobId)}
          on:retry-job={({ detail }) => retryJob(detail.jobId)} />
      {/each}
    </div>

    {#if redisMetrics}
      <div class="level is-mobile metrics">
        <div class="level-item has-text-centered is-narrow">
          <div>
            <p class="heading">
              Version
              <br />
            </p>
            <p class="subtitle">{redisMetrics.redisVersion}</p>
          </div>
        </div>

        <div class="level-item has-text-centered is-narrow">
          <div>
            <p class="heading">
              Memory
              <br />
              usage
            </p>
            <p class="subtitle">
              {getMemoryUsageString(redisMetrics.usedMemory / redisMetrics.totalSystemMemory)}
            </p>
          </div>
        </div>

        <div class="level-item has-text-centered is-narrow">
          <div>
            <p class="heading">
              Fragmentation
              <br />
              ratio
            </p>
            <p class="subtitle">{redisMetrics.memFragmentationRatio}</p>
          </div>
        </div>

        <div class="level-item has-text-centered is-narrow">
          <div>
            <p class="heading">
              Connected
              <br />
              clients
            </p>
            <p class="subtitle">{redisMetrics.connectedClients}</p>
          </div>
        </div>

        <div class="level-item has-text-centered is-narrow">
          <div>
            <p class="heading">
              Blocked
              <br />
              clients
            </p>
            <p class="subtitle">{redisMetrics.blockedClients}</p>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>
