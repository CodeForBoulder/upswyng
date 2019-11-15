<script>
  import ScheduleSelectorScheduleItem from "./ScheduleSelectorScheduleItem.svelte";
  import { ResourceSchedule } from "@upswyng/upswyng-core";

  export let schedule; /* ResourceSchedule */

  if (typeof schedule === "string") {
    throw new Error(
      `\`ResourceScheduleDisplay\` received a non-parsed resource schedule. Call \`ResourceSchedule.parse\` with the string ${schedule} as an argument.`
    );
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
