<script>
  import { createEventDispatcher } from "svelte";
  import algoliaSearch from "algoliasearch";
  import ResourceSearchResult from "./ResourceSearchResult.svelte";

  export let maxResults = 5;
  export let action; // string "view | addToSubcategory"

  if (!(action === "view" || action === "addToSubcategory")) {
    throw new Error(
      `The action for ResourceSearch must be 'view' or 'addToSubcategory'; received ${action}`
    );
  }

  let query = "";
  let results = [];
  let isLoading = false;
  let errorMessage = "";

  const appId = process.env.ALGOLIA_APP_ID;
  const indexName = process.env.ALGOLIA_INDEX_NAME;
  const searchApiKey = process.env.ALGOLIA_SEARCH_API_KEY;

  const client = algoliaSearch(appId, searchApiKey);
  const searchIndex = client.initIndex(indexName);
  const dispatch = createEventDispatcher();

  $: {
    if (query) {
      isLoading = true;
      errorMessage = "";
      searchIndex
        .search({ query, hitsPerPage: maxResults })
        .then(({ hits }) => (results = hits))
        .catch(e => (errorMessage = e.message))
        .finally(() => (isLoading = false));
    } else {
      results = [];
    }
  }
</script>

<div
  class="field dropdown is-block"
  class:is-active={!isLoading && results.length}>
  <label for="search" class="is-sr-only">Search for a provider</label>
  <div class="control has-icons-left" class:is-loading={isLoading}>
    <input
      class="input"
      id="search"
      name="search"
      type="text"
      placeholder="Search for a provider..."
      bind:value={query} />
    <span class="icon is-left">
      <i class="fas fa-search" />
    </span>
  </div>
  <div class="dropdown-menu">
    <ul class="dropdown-content is-marginless">
      {#if query.length > 3 && !isLoading && !results.length}
        <li class="dropdown-item help">No providers match your search</li>
      {/if}
      {#if errorMessage}
        <li class="dropdown-item help is-danger">{errorMessage}</li>
      {/if}
      {#each results as resourceResult, i}
        {#if i !== 0}
          <hr class="dropdown-divider" />
        {/if}
        <ResourceSearchResult
          {action}
          {resourceResult}
          on:resourceClick={() => dispatch('resourceClick', resource.objectID)} />
      {/each}
    </ul>
  </div>
</div>
