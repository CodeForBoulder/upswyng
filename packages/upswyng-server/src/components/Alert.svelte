<script>
  import moment from "moment";
  import { onDestroy, createEventDispatcher } from "svelte";

  export let alert; // TAlertFull
  export let isProcessingCancel = false;
  export let cancelError = "";
  export let now = new Date();

  const TIME_FORMAT = "dddd, MMMM Do YYYY, h:mm:ss A"; // "Sunday, February 14th 2010, 3:25:50 PM"
  const dispatch = createEventDispatcher();

  let startMoment;
  let endMoment;
  let nowMoment;

  $: startMoment = moment(alert.start);
  $: endMoment = moment(alert.end);
  $: nowMoment = moment(now);

  let isConfirmingCancel = false;

  $: {
    if (typeof alert.start === "string") {
      alert.start = new Date(alert.start);
    }
    if (typeof alert.end === "string") {
      alert.end = new Date(alert.end);
    }
  }

  let cancelTimeoutHandle;

  function handleCancelClick() {
    isConfirmingCancel = true;
    cancelTimeoutHandle = setTimeout(() => {
      isConfirmingCancel = false;
    }, 8000);
  }

  function handleCancelConfirmClick() {
    if (cancelTimeoutHandle) {
      clearTimeout(cancelTimeoutHandle);
    }
    dispatch("cancelAlert", { alert });
  }

  onDestroy(() => {
    if (cancelTimeoutHandle) {
      clearTimeout(cancelTimeoutHandle);
    }
  });
</script>

<style>
  .icon-bullet {
    border-radius: 50%;
  }
</style>

<div class="content">
  <div class="level is-mobile">
    <div class="level-left">
      <div class="level-item">
        <span
          class="icon is-large icon-bullet has-text-white"
          style={`background-color:${alert.color}`}>
          <i class={`${alert.icon} fa-2x`} />
        </span>
      </div>
      <div class="level-item">
        <h2 class="subtitle">{alert.title}</h2>
      </div>
    </div>
    <div class="level-right" />
  </div>
  {#if cancelError}
    <div class="notification is-danger">{cancelError}</div>
  {/if}
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        {#if alert.isApproved && !alert.isCancelled}
          {#if alert.end <= now}
            <!-- alert is over-->
            <p class="has-text-weight-bold is-size-6 has-text-grey">
              Alert ended {endMoment.from(nowMoment)}
            </p>
          {:else if now < alert.start}
            <!-- alert is over-->
            <p class="has-text-weight-bold is-size-6 has-text-info">
              Alert starts in {nowMoment.to(startMoment)}
            </p>
          {:else}
            <!-- alert is active-->
            <p class="has-text-weight-bold is-size-6 has-text-success">
              Alert is active now and ends in {endMoment.from(nowMoment)}
            </p>
          {/if}
        {/if}
        {#if alert.isCancelled}
          <p class="has-text-weight-bold is-size-6 has-text-danger">
            This alert is cancelled and will not be shown to users
          </p>
        {:else if !alert.isApproved}
          <p class="has-text-weight-bold is-size-6 has-text-warning">
            This alert needs to be approved in order to be shown to users
          </p>
        {/if}
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        {#if !alert.isCancelled && alert.end > now}
          {#if !isConfirmingCancel}
            <button
              class="button is-danger is-outlined"
              on:click|preventDefault={handleCancelClick}>
              <span class="icon is-small">
                <i class="fas fa-times" />
              </span>
              <span>Cancel Alert</span>
            </button>
          {:else}
            <button
              class="button is-danger"
              class:is-loading={isProcessingCancel}
              on:click|preventDefault={handleCancelConfirmClick}>
              <span class="icon">
                <i class="fas fa-window-close fa-lg" />
              </span>
              <span>Confirm Cancel</span>
            </button>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>
<div class="content columns">
  <p class="column">
    <span class="label">From:</span>
    {startMoment.format(TIME_FORMAT)}
  </p>
  <p class="column">
    <span class="label">To:</span>
    {endMoment.format(TIME_FORMAT)}
  </p>
</div>
