<script>
  //   import { onMount } from "svelte";
  //   import { EventLog } from "@upswyng/upswyng-core";

  //   let timeAgo;

  export let eventLog; // EventLog

  //   onMount(async () => {
  //     const javascriptTimeAgoModule = await import("javascript-time-ago");
  //     const { default: en } = await import("javascript-time-ago/locale/en");
  //     const TimeAgo = javascriptTimeAgoModule.default;
  //     TimeAgo.addLocale(en);
  //     timeAgo = new TimeAgo("en-US");
  //   });

  let parsedEventLog;
  //   $: parsedEventLog = EventLog.parse(eventLog);
</script>

<div class="timeline-item">
  {JSON.stringify(eventLog)}
  <!-- {#if eventLog.kind === 'draft_deleted'}
    <div class="timeline-marker" />
    <div class="timeline-content">
      <p class="heading">{timeAgo.format(new Date(eventLog.createdAt))}</p>
      <p>Timeline content - Can include any HTML element</p>
    </div>
  {/if} -->
</div>
