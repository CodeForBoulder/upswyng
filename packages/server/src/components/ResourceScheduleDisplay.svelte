<script>
  import ScheduleSelectorScheduleItem from "./ScheduleSelectorScheduleItem.svelte";
<<<<<<< HEAD:packages/server/src/components/ResourceScheduleDisplay.svelte
  import { ResourceSchedule } from "@upswyng/common";
=======
  import { ResourceSchedule } from "@upswyng/core";
>>>>>>> Remove `upswyng-` prefix from package names:packages/upswyng-server/src/components/ResourceScheduleDisplay.svelte

  export let schedule; /* TResourceScheduleData | ResourceSchedule */

  $: {
    if (!(schedule instanceof ResourceSchedule)) {
      schedule = ResourceSchedule.parse(schedule);
    }
  }
</script>

<div class="content">
  <div>
    <span class="has-text-weight-bold">Always Open:</span>
    <span>{schedule.alwaysOpen ? 'Yes' : 'No'}</span>
  </div>
  <div class="content">
    {#if schedule.timezone}
      <div>
        <span class="has-text-weight-bold">Timezone:</span>
        <span>{schedule.timezone}</span>
      </div>
    {:else}
      <div>No Timezone</div>
    {/if}
  </div>
  <div>
    <span class="has-text-weight-bold">Schedule Entrires</span>
  </div>
  <ul>
    {#each schedule.getItems() as item}
      <ScheduleSelectorScheduleItem {item} />
    {/each}
  </ul>
</div>
