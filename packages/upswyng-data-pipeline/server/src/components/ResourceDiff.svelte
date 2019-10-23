<script>
  import diffResources from "../utility/diffResources.ts";
  export let leftResource;
  export let rightResource;

  if (!leftResource || !rightResource) {
    throw new Error("Resource diff must include a left and a right resource");
  }

  const diff = diffResources(leftResource, rightResource);

  function displayScheduleEntry(scheduleEntry /*: TSchedule */) /*: string */ {
    const { day, date, period, from, to, scheduleType } = scheduleEntry;
    switch (scheduleType) {
      case "Weekly":
        return `<span>${day} ${from} - ${to}<span>Weekly</span></span>`;
      case "Monthly":
        return `<span>${day} ${from} - ${to} ${period}<span>Monthly</span></span>`;
      case "Open 24/7":
        return `<span>Open 24/7</span>`;
      case "Date Range":
        return `<span>${date} ${from} - ${to}<span>Date Range</span></span>`;
      default:
        throw new Error(`Unexpected schedule type: ${scheduleType}`);
    }
  }
</script>

<style>
  .bullet {
    display: inline-block;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 100%;
  }

  .field {
    margin-bottom: 2rem;
  }

  .values {
    display: flex;
  }
  .left,
  .right {
    flex-grow: 1;
  }
  .left {
    margin-right: 2rem;
  }
  .right {
    margin-left: 2rem;
  }
</style>

<div class="diff">
  {#each Object.keys(diff.left) as k}
    <div class="field">
      <h2>{k}</h2>
      <div class="values">
        <div class="left">
          <h3>Old</h3>
          {#if k === 'schedule' || k === 'closesSchedule'}
            <ul>
              {#each diff.left[k] as scheduleEntry}
                <li>
                  {@html displayScheduleEntry(scheduleEntry)}
                </li>
              {/each}
            </ul>
          {:else if k === 'services'}
            <ul>
              {#each diff.left[k] as service}
                <li>{service}</li>
              {/each}
            </ul>
          {:else if k === 'subcategories'}
            <ul>
              {#each diff.left[k] as subcategory}
                <li>
                  <div
                    class="bullet"
                    style={`background-color: ${subcategory.parentCategory.color || 'gray'}`} />
                  {subcategory.parentCategory.name} | {subcategory.name}
                </li>
              {/each}
            </ul>
          {:else}{JSON.stringify(diff.left[k], null, 2)}{/if}
        </div>
        <div class="right">
          <h3>New</h3>
          {#if k === 'schedule' || k === 'closesSchedule'}
            <ul>
              {#each diff.right[k] as scheduleEntry}
                <li>
                  {@html displayScheduleEntry(scheduleEntry)}
                </li>
              {/each}
            </ul>
          {:else if k === 'services'}
            <ul>
              {#each diff.left[k] as service}
                <li>{service}</li>
              {/each}
            </ul>
          {:else if k === 'subcategories'}
            <ul>
              {#each diff.right[k] as subcategory}
                <li>
                  <div
                    class="bullet"
                    style={`background-color: ${subcategory.parentCategory.color || 'gray'}`} />
                  {subcategory.parentCategory.name} | {subcategory.name}
                </li>
              {/each}
            </ul>
          {:else}{JSON.stringify(diff.right[k], null, 2)}{/if}
        </div>
      </div>
    </div>
  {/each}
</div>
