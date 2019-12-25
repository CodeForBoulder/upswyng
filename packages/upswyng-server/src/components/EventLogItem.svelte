<script>
  import { onMount } from "svelte";
  import { EventLog } from "@upswyng/upswyng-core";

  let timeAgo;

  export let eventLog; // EventLog

  onMount(async () => {
    const javascriptTimeAgoModule = await import("javascript-time-ago");
    const { default: en } = await import("javascript-time-ago/locale/en");
    const TimeAgo = javascriptTimeAgoModule.default;
    TimeAgo.addLocale(en);
    timeAgo = new TimeAgo("en-US");
  });

  let parsedEventLog;

  $: parsedEventLogSummary = eventLog && EventLog.parse(eventLog);
  $: console.log(parsedEventLogSummary);
</script>

<div class="timeline-item">
  {#if eventLog.kind === 'draft_deleted'}
    <div class="timeline-marker" />
    <div class="timeline-content">
      <p class="heading">
        {#if timeAgo}{timeAgo.format(new Date(eventLog.createdAt))}{/if}
      </p>
      <p>
        {#await parsedEventLogSummary}
          waiting
        {:then parsedEventLog}
          {parsedEventLog.toSummary()}
        {/await}
      </p>
    </div>
  {/if}
</div>
