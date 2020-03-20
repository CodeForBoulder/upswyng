<script>
  import { onDestroy, createEventDispatcher } from "svelte";
  import CopyToClipboard from "./CopyToClipboard.svelte";
  import insane from "insane"; // html sanitizer
  import marked from "marked";
  import moment from "moment";

  export let alert; // TAlertFull

  export let isProcessingCancel = false;
  export let cancelError = "";
  let isConfirmingCancel = false;
  let confirmingCancelTimeoutHandle;

  export let isProcessingApprove = false;
  export let approveError = "";
  let isConfirmingApprove = false;
  let confirmingApproveTimeoutHandle;

  export let now = new Date();

  const TIME_FORMAT = "dddd, MMMM Do YYYY, h:mm:ss A"; // "Sunday, February 14th 2010, 3:25:50 PM"
  const dispatch = createEventDispatcher();

  let startMoment;
  let endMoment;
  let nowMoment;

  $: startMoment = moment(alert.start);
  $: endMoment = moment(alert.end);
  $: nowMoment = moment(now);

  let alertDetailHtml = null;

  $: alertDetailHtml =
    alert.detail &&
    alert.detail.length &&
    insane(marked(alert.detail), {
      ...insane.defaults,
      allowedAttributes: {
        ...insane.defaults.allowedAttributes,
        iframe: [],
      },
    });

  $: {
    if (typeof alert.start === "string") {
      alert.start = new Date(alert.start);
    }
    if (typeof alert.end === "string") {
      alert.end = new Date(alert.end);
    }
  }

  function handleApproveClick() {
    isConfirmingApprove = true;
    confirmingApproveTimeoutHandle = setTimeout(() => {
      isConfirmingApprove = false;
    }, 8000);
  }

  function handleApproveConfirmClick() {
    if (confirmingApproveTimeoutHandle) {
      clearTimeout(confirmingApproveTimeoutHandle);
    }
    dispatch("approveAlert", { alert });
  }

  function handleCancelClick() {
    isConfirmingCancel = true;
    confirmingCancelTimeoutHandle = setTimeout(() => {
      isConfirmingCancel = false;
    }, 8000);
  }

  function handleCancelConfirmClick() {
    if (confirmingCancelTimeoutHandle) {
      clearTimeout(confirmingCancelTimeoutHandle);
    }
    dispatch("cancelAlert", { alert });
  }

  onDestroy(() => {
    if (confirmingCancelTimeoutHandle) {
      clearTimeout(confirmingCancelTimeoutHandle);
    }
    if (confirmingApproveTimeoutHandle) {
      clearTimeout(confirmingApproveTimeoutHandle);
    }
  });
</script>

<style>
  .icon-bullet {
    border-radius: 50%;
  }

  .detail {
    flex-grow: 1;
  }

  .detail-label {
    margin-right: 0.5em;
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
        <div>
          <h2 class="subtitle">{alert.title}</h2>
          {#if alert.category}
            <h3
              class="category is-marginless is-size-6 has-text-grey-light
              has-text-weight-bold">
              {alert.category}
            </h3>
          {/if}
        </div>
      </div>
    </div>
    <div class="level-right" />
  </div>
  {#if cancelError}
    <div class="notification is-danger">{cancelError}</div>
  {/if}
  {#if approveError}
    <div class="notification is-danger">{approveError}</div>
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
        {#if !alert.isApproved && !alert.isCancelled && alert.end > now}
          {#if !isConfirmingApprove}
            <button
              class="button is-success is-outlined"
              on:click|preventDefault={handleApproveClick}>
              <span class="icon is-small">
                <i class="fas fa-check" />
              </span>
              <span>Approve Alert</span>
            </button>
          {:else}
            <button
              class="button is-success"
              class:is-loading={isProcessingApprove}
              on:click|preventDefault={handleApproveConfirmClick}>
              <span class="icon">
                <i class="fas fa-check" />
              </span>
              <span>Confirm Approve</span>
            </button>
          {/if}
        {/if}
      </div>

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
<div class="content">
  <p>
    <span
      class="alert-label is-size-7 is-uppercase has-text-weight-bold
      has-color-grey-dark">
      ID
    </span>
    <span class="is-family-monospace">{alert._id}</span>
    <CopyToClipboard textToCopy={alert._id} />
  </p>
  <p>
    <span
      class="alert-label is-size-7 is-uppercase has-text-weight-bold
      has-color-grey-dark">
      From
    </span>
    <span>{startMoment.format(TIME_FORMAT)}</span>
  </p>
  <p>
    <span
      class="alert-label is-size-7 is-uppercase has-text-weight-bold
      has-color-grey-dark">
      To
    </span>
    <span>{endMoment.format(TIME_FORMAT)}</span>
  </p>
  <p>
    <span
      class="alert-label is-size-7 is-uppercase has-text-weight-bold
      has-color-grey-dark">
      Created
    </span>
    <span>
      {alert.createdBy.email} - {moment(alert.createdAt).format(TIME_FORMAT)}
    </span>
  </p>
  <p>
    <span
      class="alert-label is-size-7 is-uppercase has-text-weight-bold
      has-color-grey-dark">
      Last Modified
    </span>
    <span>
      {alert.lastModifiedBy.email} - {moment(alert.lastModifiedAt).format(TIME_FORMAT)}
    </span>
  </p>

  {#if alertDetailHtml}
    <div class="is-flex">
      <div class="detail-label">
        <span
          class="alert-label is-size-7 is-uppercase has-text-weight-bold
          has-color-grey-dark">
          Detail &nbsp;
        </span>
      </div>
      <div class="box detail">
        {@html alertDetailHtml}
      </div>
    </div>
  {:else}
    <p>
      <span
        class="alert-label is-size-7 is-uppercase has-text-weight-bold
        has-color-grey-dark">
        Detail
      </span>
      <span class="is-italic">No alert detail was provided</span>
    </p>
  {/if}
</div>
