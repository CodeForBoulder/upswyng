<script>
  import { createEventDispatcher } from "svelte";
  import { onMount, onDestroy } from "svelte";
  import converter from "number-to-words-en";
  import jsonHighlight from "json-highlight";
  import prettyMilliseconds from "pretty-ms";

  export let job; // TJob

  let bar;
  let color = "#b5";
  let dateUpdateInterval;
  let expanded = false;
  let now = new Date();
  let removeHover = false;
  let retryHover = false;
  let timeAgo;

  onMount(() => {
    dateUpdateInterval = setInterval(() => (now = new Date()), 1000);
  });

  onMount(async () => {
    const javascriptTimeAgoModule = await import("javascript-time-ago");
    const { default: en } = await import("javascript-time-ago/locale/en");
    const TimeAgo = javascriptTimeAgoModule.default;
    TimeAgo.addLocale(en);
    timeAgo = new TimeAgo("en-US");
  });

  onDestroy(() => {
    dateUpdateInterval && clearInterval(dateUpdateInterval);
  });

  const dispatch = createEventDispatcher();

  function dispatchRemoveJob(jobId) {
    dispatch("remove-job", { jobId });
  }

  function dispatchRetryJob(jobId) {
    dispatch("retry-job", { jobId });
  }
</script>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .bottom-level {
    margin-bottom: 0;
  }

  progress.progress {
    height: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .progress.is-info::-webkit-progress-value {
    transition: width 0.33333s ease;
  }

  .actions {
    display: flex;
  }

  .actions > div:not(:last-child) {
    margin-right: 0.75rem;
  }

  .expand {
    border: none;
    padding: 0;
    cursor: pointer;
    transition: transform 0.25s ease;
    transform-origin: 50% 50%;
  }
  .expand.expanded {
    transform: rotate(180deg);
  }

  .extra-data {
    overflow: hidden;
  }

  .extra-data:not(.expanded) {
    height: 0;
  }

  .times {
    margin-bottom: 0.75rem;
  }

  .time {
    display: flex;
  }

  .time > span {
    display: block;
    margin-right: 0.5rem;
  }
</style>

<div class="box">
  <div class="header">
    <span class="has-text-weight-bold is-size-5">{job.name}</span>
    <div class="actions">
      {#if job.status === 'failed'}
        <div>
          <!-- svelte-ignore a11y-missing-attribute -->
          <a
            aria-label="Retry job"
            class:has-text-grey={!retryHover}
            class:has-text-grey-lighter={retryHover}
            on:mouseover={() => (retryHover = true)}
            on:mouseleave={() => (retryHover = false)}
            on:click={() => dispatchRetryJob(job.id)}>
            <span class="icon">
              <i class="fas fa-lg fa-redo" />
            </span>
          </a>
        </div>
      {/if}
      {#if job.status !== 'active'}
        <div>
          <!-- svelte-ignore a11y-missing-attribute -->
          <a
            aria-label="Remove job"
            class:has-text-grey={!removeHover}
            class:has-text-grey-lighter={removeHover}
            on:mouseover={() => (removeHover = true)}
            on:mouseleave={() => (removeHover = false)}
            on:click={() => dispatchRemoveJob(job.id)}>
            <span class="icon">
              <i class="fas fa-lg fa-times-circle" />
            </span>
          </a>
        </div>
      {/if}
    </div>
  </div>
  <div class="job-kind">
    <p class="is-size-8">
      <span
        class="is-size-9 has-text-weight-semibold has-text-grey is-capitalized">
        {job.data.kind.replace(/_/g, ' ')}
      </span>
    </p>
  </div>
  <div class="job-id">
    <p class="is-size-8">
      <span class="has-text-weight-semibold">ID:</span>
      <span class="is-size-9">{job.id}</span>
    </p>
  </div>
  {#if job.attemptsMade && job.status !== 'completed'}
    <div class="is-size-7 has-text-weight-semibold ">
      {#if job.status === 'waiting' || job.status === 'failed'}
        <p>
          Already made {job.attemptsMade} attempt{job.attemptsMade > 1 ? 's' : ''}
        </p>
      {:else if job.status === 'active'}
        <p>
          This is the {converter.toWordsOrdinal(job.attemptsMade + 1)} attempt
          of this job
        </p>
      {/if}
    </div>
  {/if}
  <div class="times has-text-grey is-size-6">
    {#if job.processedOn && job.status === 'active'}
      <div class="time">
        <span class="icon is-small">
          <i class="fas fa-play-circle" />
        </span>
        <span>
          {!isNaN(Math.max(now - new Date(job.processedOn), 0)) ? prettyMilliseconds(
                Math.max(now - new Date(job.processedOn), 0),
                { verbose: true, secondsDecimalDigits: 0 }
              ) : ''}
        </span>
      </div>
    {/if}
    {#if job.processedOn && (job.status === 'completed' || job.status === 'failed')}
      <div class="time">
        <span class="icon is-small">
          <i class="fas fa-play-circle" />
        </span>
        <span>
          {!isNaN(Math.max(new Date(job.finishedOn) - new Date(job.processedOn), 0)) ? prettyMilliseconds(
                Math.max(
                  new Date(job.finishedOn) - new Date(job.processedOn),
                  0
                ),
                { verbose: true, secondsDecimalDigits: 0 }
              ) : ''}
        </span>
      </div>
    {/if}
    {#if job.finishedOn && (job.status === 'completed' || job.status === 'failed') && timeAgo}
      <div class="time">
        <span class="icon is-small">
          {#if job.status === 'completed'}
            <i class="fas fa-check-circle" />
          {:else}
            <i class="fas fa-exclamation-triangle" />
          {/if}
        </span>
        <span>{timeAgo.format(new Date(job.finishedOn))}</span>
      </div>
    {/if}
  </div>
  <progress
    class="progress is-small"
    class:is-info={job.status === 'active'}
    class:is-danger={job.status === 'failed'}
    class:is-success={job.status === 'completed'}
    min="0"
    max="100"
    value={job.progress}>
    {job.progress}%
  </progress>
  <div class="level is-mobile bottom-level">
    <div class="level-left">
      <button
        class="expand"
        class:expanded
        on:click={() => (expanded = !expanded)}>
        <span class="icon is-small">
          <i class="fas fa-chevron-up fa-lg" />
        </span>
      </button>
    </div>
    <div class="level-right">
      <div class="level-item has-text-right">
        <span
          class="is-size-6 is-uppercase has-text-weight-medium"
          class:has-text-danger={job.status === 'failed'}
          class:has-text-info={job.status === 'active'}
          class:has-text-success={job.status === 'completed'}>
          {job.status}
        </span>
      </div>
    </div>
  </div>
  <div class="extra-data" class:expanded>
    <div class="columns">
      <div class="column">
        <p class="has-text-weight-semibold is-size-6">Data</p>
        <pre>
          {@html jsonHighlight(job.data)}
        </pre>
      </div>
      {#if job.returnValue}
        <div class="column">
          <p class="has-text-weight-semibold is-size-6">Return Value</p>
          <pre>
            {@html jsonHighlight(job.returnValue)}
          </pre>
        </div>
      {/if}
    </div>
  </div>
</div>
