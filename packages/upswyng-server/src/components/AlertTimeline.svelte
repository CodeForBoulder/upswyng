<script>
  import AlertTimelineDisplay from "./AlertTimelineDisplay.svelte";
  import DatePicker from "./DatePicker.svelte";

  export let alertsPromise; // Promise<TAlertFull[]>
  export let endDay; // MM/DD/YYYY
  export let errorMessage;
  export let selectedAlertId; // string; (bson ObjectId)
  export let startDay; // MM/DD/YYYY
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
{#await alertsPromise}
  <progress class="progress is-small is-primary" max="100" />
{:then alerts}
  {#if !alerts.length}
    <div class="notifications">
      There are no alerts for the selected timeframe
    </div>
  {/if}
  <div class="content">
    <AlertTimelineDisplay {alerts} on:click {selectedAlertId} />
  </div>
{:catch error}
  <div class="notification is-danger">{error.message}</div>
{/await}
