<script>
  import algoliaSearch from "algoliasearch";
  import ResourceSearchResult from "./ResourceSearchResult.svelte";
  import { createEventDispatcher } from "svelte";

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

<div class="field">
  <div class="control has-icons-left" class:is-loading={isLoading}>
    <input
      class="input is-rounded"
      type="text"
      placeholder="Search for a resource..."
      bind:value={query} />
    <span class="icon is-left">
      <i class="fas fa-search" />
    </span>
  </div>
  {#if query.length > 3 && !isLoading && !results.length}
    <p class="help">No resources match your search</p>
  {/if}
  {#if errorMessage}
    <p class="help is-danger">{errorMessage}</p>
  {/if}
</div>

<div class="content">
  {#each results as resource}
    <ResourceSearchResult
      {action}
      name={resource.name}
      description={resource.description}
      on:resourceClick={() => dispatch('resourceClick', resource.objectID)} />
  {/each}
</div>
