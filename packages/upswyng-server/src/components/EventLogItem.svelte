<script>
  import { onMount } from "svelte";
  import { EventLog } from "@upswyng/upswyng-core";

  let timeAgo;

  export let eventLog; // EventLog (already parsed from TEventLogData)

  onMount(async () => {
    const javascriptTimeAgoModule = await import("javascript-time-ago");
    const { default: en } = await import("javascript-time-ago/locale/en");
    const TimeAgo = javascriptTimeAgoModule.default;
    TimeAgo.addLocale(en);
    timeAgo = new TimeAgo("en-US");
  });
</script>

<div class="timeline-item">
  {#if eventLog.detail.kind === 'draft_deleted'}
    <div class="timeline-marker is-icon">
      <i class="fa fa-trash-alt" />
    </div>
    <div class="timeline-content">
      <p class="heading">
        {#if timeAgo}{timeAgo.format(new Date(eventLog.createdAt))}{/if}
      </p>
      <p>{eventLog.toSummary()}</p>
    </div>
  {/if}
</div>
