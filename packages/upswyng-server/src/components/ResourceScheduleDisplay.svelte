<script>
  import ScheduleSelectorScheduleItem from "./ScheduleSelectorScheduleItem.svelte";
  import { ResourceSchedule } from "@upswyng/upswyng-core";

  export let schedule; /* TResourceScheduleData | ResourceSchedule */

  $: {
    if (!(schedule instanceof ResourceSchedule)) {
      schedule = ResourceSchedule.parse(schedule);
    }
  }
</script>

<div class="content">
  <div>
    <span>Always Open:</span>
    <span>{schedule.alwaysOpen ? 'Yes' : 'No'}</span>
  </div>
  {#if schedule.timezone}
    <div>
      <span>Timezone:</span>
      <span>{schedule.timezone}</span>
    </div>
  {:else}
    <div>No Timezone</div>
  {/if}
  <ul>
    {#each schedule.getItems() as item}
      <ScheduleSelectorScheduleItem {item} />
    {/each}
  </ul>
</div>
