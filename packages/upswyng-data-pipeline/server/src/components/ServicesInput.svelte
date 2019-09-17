<script>
  import Select from "svelte-select";

  export let value = []; // string[]

  let newEntry = "";

  const createRemoveValueCallback = index => () => {
    value.splice(index, 1);
    value = value; // need this nonsense so the svelte component updates
  };

  function addScheduleEntry() {
    value = [...value, newEntry];
    newEntry = "";
  }
</script>

<h1>Services</h1>
<ul>
  {#each value as entry, index}
    <li>
      <span>{entry}</span>
      <button
        type="button"
        preventDefault
        on:click={createRemoveValueCallback(index)}>
        Remove
      </button>
    </li>
  {/each}
</ul>
<fieldset>
  <h2>Add Service</h2>
  <p>
    <label for="new_service">Service</label>
    <input
      name="new_service"
      placeholder="Enter new service..."
      type="text"
      bind:value={newEntry} />
  </p>
  <button type="button" preventDefault on:click={addScheduleEntry}>
    Add Entry
  </button>
</fieldset>
