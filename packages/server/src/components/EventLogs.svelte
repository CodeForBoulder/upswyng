<script>
  import EventLogItem from "./EventLogItem.svelte";

  export let resourceId /* string | null */ = null;

  let estimatedTotal = Infinity;
  let fetchedAll = false; // if we execute a fetch and we don't get any additional logs, set this to true and hide the "load more" buttons
  let limit = 10;
  let offset = 0;
  let offsetStep = 5;
  let errorMessage = "";
  let eventLogs = [];
  let isLoading = true; // prevent drawing flicker at start

  async function fetchEventLogs(limit, offset, resourceId) {
    errorMessage = "";
    isLoading = true;
    let response;
    try {
      response = await fetch(`/api/eventlogs`, {
        method: "POST",
        body: JSON.stringify({
          limit,
          offset,
          resourceId,
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
        throw new Error(message || "Error getting Service Provider Issues");
      }
      if (!newEventLogs.length) {
        fetchedAll = true;
      }
      eventLogs = eventLogs.concat(newEventLogs);
      estimatedTotal = newEstimatedTotal;
    } catch (e) {
      errorMessage = e.message;
    } finally {
      isLoading = false;
    }
  }

  fetchEventLogs(limit, offset, resourceId);
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

<div class="content">
  {#if errorMessage}
    <div class="notification is-danger">{errorMessage}</div>
  {/if}
  {#if !eventLogs.length && isLoading}
    <progress class="progress is-small is-primary" max="100" />
  {:else if !eventLogs.length && !isLoading}
    <div class="has-text-grey is-italic has-text-weight-semibold is-size-6">
      No events to show
    </div>
  {:else}
    <div class="timeline">
      {#each eventLogs as eventLog}
        <EventLogItem {eventLog} />
      {/each}
      {#if eventLogs.length < estimatedTotal && !fetchedAll}
        <div class="content has-text-centered">
          {#if !isLoading}
            <!-- svelte-ignore a11y-missing-attribute -->
            <a
              on:click|preventDefault={() => {
                offset += offsetStep;
                fetchEventLogs(limit, offset, resourceId);
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
  {/if}
</div>
