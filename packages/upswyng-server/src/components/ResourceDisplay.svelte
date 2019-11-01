<script>
  export let resource; // TResource

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
    width: 0.75em;
    height: 0.75em;
    border-radius: 100%;
  }
</style>

<h1 class="title">{resource.name}</h1>
<div class="content" class:has-ribbon={resource.deleted}>
  {#if resource.deleted}
    <div class="ribbon is-danger">Trashed</div>
  {/if}
  <h2>ID</h2>
  <p>{resource.id}</p>
  {#if resource.legacyId}
    <h2>Legacy ID</h2>
    <p>{resource.legacyId}</p>
  {/if}
  <h2>Kudos</h2>
  <p>{resource.kudos}</p>
  {#if resource.createdBy}
    <h2>Created By</h2>
    <p>{resource.createdBy.email}</p>
  {/if}
  <h2>Created At</h2>
  <p>{resource.createdAt}</p>
  <h2>Last Modified At</h2>
  <p>{resource.lastModifiedAt}</p>
  <h2>Description</h2>
  <p>{resource.description}</p>
  <h2>Phone</h2>
  <p>{resource.phone}</p>
  <h2>Address</h2>
  <h3>Address 1</h3>
  <p>{resource.address.address1}</p>
  <h3>Address 2</h3>
  <p>{resource.address.address2}</p>
  <h3>City</h3>
  <p>{resource.address.city}</p>
  <h3>State</h3>
  <p>{resource.address.state}</p>
  <h3>ZIP</h3>
  <p>{resource.address.zip}</p>
  <h2>Services</h2>
  <ul>
    {#each resource.services as service}
      <li>{service}</li>
    {/each}
  </ul>
  <h2>Schedule</h2>
  <ul>
    {#each resource.schedule as scheduleEntry}
      <li>
        {@html displayScheduleEntry(scheduleEntry)}
      </li>
    {/each}
  </ul>
  <h2>Close Schedule</h2>
  <ul>
    {#each resource.closeSchedule as closeScheduleEntry}
      <li>
        {@html displayScheduleEntry(closeScheduleEntry)}
      </li>
    {/each}
  </ul>
  <h2>Latitude</h2>
  <p>{resource.latitude}</p>
  <h2>Longitude</h2>
  <p>{resource.longitude}</p>
  <h2>Subcategories</h2>
  <ul>
    {#each resource.subcategories as subcategory}
      <li>
        <div
          class="bullet"
          style={`background-color: ${subcategory.parentCategory.color || 'gray'}`} />
        {subcategory.parentCategory.name} | {subcategory.name}
      </li>
    {/each}
  </ul>
  <h2>Website</h2>
  <p>{resource.website}</p>
</div>
