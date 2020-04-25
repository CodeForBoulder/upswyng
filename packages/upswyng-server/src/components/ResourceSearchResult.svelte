<script>
  import { createEventDispatcher } from "svelte";

  export let resourceResult;
  export let action; // string "view | addToSubcategory"

  const EXPAND_DESCRIPTION_LENGTH = 120;

  let expandDescription = false;

  const dispatch = createEventDispatcher();
</script>

<li>
  {#if action === 'view'}
    <a href={`/resource/${resourceResult.objectID}`}>{resourceResult.name}</a>
  {:else if action === 'addToSubcategory'}
    <p class="title is-6">{resourceResult.name}</p>
    <p>
      {#if resourceResult.description.length <= EXPAND_DESCRIPTION_LENGTH}
        {resourceResult.description}
      {:else if !expandDescription}
        <span>
          {resourceResult.description
            .slice(0, EXPAND_DESCRIPTION_LENGTH)
            .trim()}...
        </span>
        <button type="button" on:click={() => (expandDescription = true)}>
          more
        </button>
      {:else}
        <span>{resourceResult.description}</span>
        <button
          type="button result-button"
          on:click={() => (expandDescription = false)}>
          less
        </button>
      {/if}
    </p>
    <div class="buttons">
      {#if action === 'addToSubcategory'}
        <button
          class="button is-success is-small"
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
          class="button is-small"
          type="button"
          on:click={() => dispatch('resourceClick')}>
          <span>View</span>
        </button>
      {/if}
    </div>
  {/if}
</li>
