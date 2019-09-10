<script>
  export let value = []; // TSchedule[]

  let newScheduleEntry = {}; // TSchedule

  const createRemoveScheduleEntry = index => () => {
    value.splice(index, 1);
    value = value; // need this nonsense so the svelte component updates
  };
</script>

<ul>
  {#each value as scheduleEntry, index}
    <li>
      <span>
        {scheduleEntry.day} {scheduleEntry.date} {scheduleEntry.period}
        {scheduleEntry.from} {scheduleEntry.to} {scheduleEntry.type}
      </span>
      <button
        type="button"
        preventDefault
        on:click={createRemoveScheduleEntry(index)}>
        Remove
      </button>
    </li>
  {/each}
</ul>
