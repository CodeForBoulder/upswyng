<script>
  import { createEventDispatcher } from "svelte";

  export let name;
  export let description;
  export let action; // string "view | addToSubcategory"

  const EXPAND_DESCRIPTION_LENGTH = 120;

  let expandDescription = false;

  const dispatch = createEventDispatcher();
</script>

<style>
  .result {
    margin-bottom: 1em;
  }

  .result-button {
    margin: 0.75em;
  }

  .result-footer {
    justify-content: flex-end;
  }
</style>

<div class="card result">
  <header class="card-header">
    <p class="card-header-title">{name}</p>
  </header>
  <div class="card-content">
    {#if description.length <= EXPAND_DESCRIPTION_LENGTH}
      {description}
    {:else if !expandDescription}
      <span>{description.slice(0, EXPAND_DESCRIPTION_LENGTH).trim()}...</span>
      <button type="button" on:click={() => (expandDescription = true)}>
        more
      </button>
    {:else}
      <span>{description}</span>
      <button
        type="button result-button"
        on:click={() => (expandDescription = false)}>
        less
      </button>
    {/if}
  </div>
  <footer class="card-footer result-footer">
    {#if action === 'addToSubcategory'}
      <button
        class="button is-success result-button is-small"
        type="button"
        on:click={() => dispatch('resourceClick')}>
        <span class="icon is-small">
          <i class="fas fa-plus" />
        </span>
        <span>Add to subcategory</span>
      </button>
    {/if}
    {#if action === 'view'}
      <button
        class="button result-button is-small"
        type="button"
        on:click={() => dispatch('resourceClick')}>
        <span>View</span>
      </button>
    {/if}
  </footer>
</div>
