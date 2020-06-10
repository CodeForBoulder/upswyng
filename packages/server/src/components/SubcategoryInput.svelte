<script>
  import { colors } from "@upswyng/common";
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
    margin-right: 1em;
  }

  .subcategories {
    list-style: none;
  }

  .subcategories > li > div {
    display: flex;
    align-items: center;
  }

  .subcategory-name {
    margin-right: 1em;
  }
</style>

<h1 class="subtitle is-size-3">Categories</h1>
<div class="content">
  <ul class="subcategories">
    {#each value as subcategory (subcategory._id)}
      <li>
        <div>
          <div
            class="bullet"
            style={`background-color: ${colors[subcategory.parentCategory.color] || 'gray'}`} />
          <div class="is-size-6 has-text-weight-semibold subcategory-name">
            {subcategory.parentCategory.name} | {subcategory.name}
          </div>
          <button
            class="button is-danger is-rounded is-small"
            type="button"
            preventDefault
            on:click={() => removeSubcategory(subcategory)}>
            <span class="icon is-small">
              <i class="fas fa-trash" aria-hidden="true" />
            </span>
            <span>Remove</span>
          </button>
        </div>
      </li>
    {/each}
  </ul>
  <fieldset>
    <h2 class="subtitle is-size-4">Add to Category</h2>
    <ul class="subcategories">
      {#each unselectedSubcategories as subcategory (subcategory._id)}
        <li>
          <div>
            <div
              class="bullet"
              style={`background-color: ${colors[subcategory.parentCategory.color] || 'gray'}`} />
            <div class="is-size-6 has-text-weight-semibold subcategory-name">
              {subcategory.parentCategory.name} | {subcategory.name}
            </div>
            <button
              class="button is-success is-rounded is-small"
              type="button"
              preventDefault
              on:click={() => addSubcategory(subcategory)}>
              <span class="icon is-small">
                <i class="fas fa-plus" />
              </span>
              <span>Add</span>
            </button>
          </div>
        </li>
      {/each}
    </ul>
  </fieldset>
</div>
