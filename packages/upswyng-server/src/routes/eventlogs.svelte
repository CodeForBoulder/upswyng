<script context="module">
  export async function preload({ params, query }, { user }) {
    if (!user || !user.isAdmin) {
      this.error(401, "You must be an admin to access this page.");
    }
  }
</script>

<script>
  import EventLogItem from "../components/EventLogItem.svelte";

  let estimatedTotal = Infinity;
  let limit = 7;
  let offset = 0;
  let offsetStep = 5;
  let errorMessage = "";
  let eventLogs = [];
  let isLoading = false;

  async function fetchEventLogs(limit, offset) {
    errorMessage = "";
    isLoading = true;
    let response;
    try {
      response = await fetch(`/api/eventlogs`, {
        method: "POST",
        body: JSON.stringify({
          limit,
          offset,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const {
        eventLogs: newEventLogs,
        estimatedTotal: newEstimatedTotal,
        message,
      } = await response.json();
      if (response.status !== 200) {
        throw new Error(message || "Error getting Resource Issues");
      }
      eventLogs = eventLogs.concat(newEventLogs);
      estimatedTotal = newEstimatedTotal;
    } catch (e) {
      errorMessage = e.message;
    } finally {
      isLoading = false;
    }
  }

  fetchEventLogs(limit, offset);
</script>

<style>
  .spinner {
    animation-duration: 0.75s;
    animation-iteration-count: infinite;
    animation-name: spin;
    animation-timing-function: linear;
    display: inline-block;
    transform-origin: 50% 50%;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<svelte:head>
  <title>UpSwyng: Event Logs</title>
</svelte:head>

<section class="section">
  <div class="container">
    <h1 class="title">Event Logs</h1>
    <div class="timeline">
      {#each eventLogs as eventLog}
        <EventLogItem {eventLog} />
      {:else}
        <div class="has-text-grey is-italic has-text-weight-semibold is-size-6">
          No events to show
        </div>
      {/each}
      {#if eventLogs.length < estimatedTotal}
        <div class="content has-text-centered">
          {#if !isLoading}
            <!-- svelte-ignore a11y-missing-attribute -->
            <a
              on:click|preventDefault={() => {
                offset += offsetStep;
                fetchEventLogs(limit, offset);
              }}
              class="is-uppercase is-size-7 has-text-weight-bold">
              Load More
            </a>
          {:else}
            <div class="is-loading has-text-primary">
              <i class="fas fa-spinner spinner" />
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</section>
