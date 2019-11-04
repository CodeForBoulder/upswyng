<script>
  import Select from "svelte-select";

  export let value = []; // TSubcategory[]
  export let subcategories = []; // TSubcategory[], All subcategories in the app

  let unselectedSubcategories = [];
  $: {
    let valueIds = value.map(s => s._id);
    unselectedSubcategories = subcategories.filter(
      s => !valueIds.includes(s._id)
    );
  }

  function removeSubcategory(subcategory) {
    value = value.filter(s => s._id !== subcategory._id);
  }

  function addSubcategory(subcategory) {
    if (!value.map(s => s._id).includes(subcategory._id)) {
      value.push(subcategory);
      value = value; // need this nonsense so the svelte component updates
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

<h1>Categories</h1>
<ul>
  {#each value as subcategory}
    <li>
      <div
        class="bullet"
        style={`background-color: ${subcategory.parentCategory.color || 'gray'}`} />
      {subcategory.parentCategory.name} | {subcategory.name}
      <button
        type="button"
        preventDefault
        on:click={() => removeSubcategory(subcategory)}>
        Remove
      </button>
    </li>
  {/each}
</ul>
<fieldset>
  <h2>Add Category</h2>
  <ul>
    {#each unselectedSubcategories as subcategory}
      <li>
        <div
          class="bullet"
          style={`background-color: ${subcategory.parentCategory.color || 'gray'}`} />
        {subcategory.parentCategory.name} | {subcategory.name}
        <button
          type="button"
          preventDefault
          on:click={() => addSubcategory(subcategory)}>
          Add
        </button>
      </li>
    {/each}
  </ul>
</fieldset>
