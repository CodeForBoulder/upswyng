<script>
  let alerts = [];

  const MS_IN_DAY = 1000 * 60 * 60 * 24;

  const now = new Date();

  let start = new Date();
  let end = now;
  let errorMessage = "";

  $: start = new Date(end.getTime() - MS_IN_DAY * 7);

  async function fetchAlerts(start, end) /*: Promise<TAlert> */ {
    let response = await fetch(`/api/alert`, {
      method: "POST",
      body: JSON.stringify({
        includeCancelled: true,
        includeUnapproved: true,
        start,
        end,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { alerts, message } = await response.json();
    if (response.status !== 200) {
      throw new Error(message || "Error getting Resource Issues");
    }
    console.log("AAA", alerts);
    return alerts;
  }

  let alertPromise;
  $: {
    alertPromise = fetchAlerts(start, end);
  }
</script>

{#if errorMessage}
  <div class="notification is-danger">
    <button
      class="delete"
      on:click|preventDefault={() => (errorMessage = '')} />
    {errorMessage}
  </div>
{/if}

{#await alertPromise}
  <progress class="progress is-small is-primary" max="100" />
{:then alerts}
  {#each alerts as alert}
    <div>{JSON.stringify(alert, null, 2)}</div>
  {:else}
    <p>No alerts in the timeframe</p>
  {/each}
{:catch error}
  <div class="notification is-danger">{error.message}</div>
{/await}
