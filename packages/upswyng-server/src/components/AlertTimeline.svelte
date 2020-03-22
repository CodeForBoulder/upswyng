<script>
  import AlertTimelineDisplay from "./AlertTimelineDisplay.svelte";
  import DatePicker from "./DatePicker.svelte";

  export let alerts; // TAlertFull[]
  export let isLoadingAlerts = false;
  export let endDay; // MM/DD/YYYY
  export let errorMessage;
  export let selectedAlertId; // string; (bson ObjectId)
  export let startDay; // MM/DD/YYYY

  let minDate;
  let maxDate;

  $: minDate = new Date(startDay);
  $: {
    const d = new Date(endDay);
    d.setHours(23);
    d.setMinutes(59);
    maxDate = d;
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
{#if isLoadingAlerts}
  <progress class="progress is-small is-primary" max="100" />
{/if}

{#if !isLoadingAlerts && !alerts.length}
  <div class="notifications">
    There are no alerts for the selected timeframe
  </div>
{/if}
<div class="content">
  <AlertTimelineDisplay
    {alerts}
    on:click
    {selectedAlertId}
    {minDate}
    {maxDate} />
</div>
