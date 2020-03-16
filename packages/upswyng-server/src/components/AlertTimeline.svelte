<script>
  import AlertTimelineDisplay from "./AlertTimelineDisplay.svelte";
  import DatePicker from "./DatePicker.svelte";

  let alerts = [];

  /**
   * Converts a Javascript Date to a MM/DD/YYYY string
   * https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
   */
  function formatDateToDay(d) {
    const dtf = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(
      d
    );
    return `${mo}/${da}/${ye}`;
  }

  const MS_IN_DAY = 1000 * 60 * 60 * 24;

  const now = new Date();

  let startDay = formatDateToDay(new Date(now.getTime() - 2 * MS_IN_DAY)); // string | null; MM/DD/YYYY
  let endDay = formatDateToDay(new Date(now.getTime() + 5 * MS_IN_DAY));

  let errorMessage = "";

  async function fetchAlerts(start, end) /*: Promise<TAlert> */ {
    let response = await fetch(`/api/alert/search`, {
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
    const start = new Date(startDay);
    start.setHours(0);
    start.setMinutes(0);

    const end = new Date(endDay);
    end.setHours(23);
    end.setMinutes(59);

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
<div class="content">
  <div class="columns">
    <div class="column">
      <div class="field">
        <label class="label">Start Date</label>
        <div class="control">
          <DatePicker
            options={{ color: 'grey', showClearButton: false, showHeader: false }}
            bind:value={startDay} />
        </div>
      </div>
    </div>
    <div class="column">
      <div class="field">
        <label class="label">End Date</label>
        <div class="control">
          <DatePicker
            options={{ color: 'grey', showClearButton: false, showHeader: false }}
            bind:value={endDay} />
        </div>
      </div>
    </div>
  </div>
</div>
{#await alertPromise}
  <progress class="progress is-small is-primary" max="100" />
{:then alerts}
  {#if !alerts.length}
    <div class="notifications">
      There are no alerts for the selected timeframe
    </div>
  {/if}
  <AlertTimelineDisplay {alerts} />
{:catch error}
  <div class="notification is-danger">{error.message}</div>
{/await}
