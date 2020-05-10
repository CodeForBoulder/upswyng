<script>
  import algoliaSearch from "algoliasearch";
  import { createEventDispatcher } from "svelte";

  import Autocomplete from "./Autocomplete.svelte";
  import AutocompleteItem from "./AutocompleteItem.svelte";
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

  const dev = process.env.NODE_ENV && process.env.NODE_ENV !== "production";

  const appId = process.env.ALGOLIA_APP_ID;
  const indexName = process.env.ALGOLIA_INDEX_NAME;
  const searchApiKey = process.env.ALGOLIA_SEARCH_API_KEY;

  let client;
  let searchIndex;

  let mock = false; // if not in prod and incomplete algolia creds, this will be set true

  if (appId && indexName && searchApiKey) {
    client = algoliaSearch(appId, searchApiKey);
    searchIndex = client.initIndex(indexName);
  } else {
    if (!dev) {
      throw new Error(
        `Attempted to start server without Algolia credentials in production`
      );
    } else {
      console.warn("Initiating ResourceSearch as a mock");
      mock = true;
    }
  }

  const dispatch = createEventDispatcher();
  const handleSelect = resourceId => dispatch("select", resourceId);

  let hasQuery = query.length > 3;

  $: {
    if (query && query.length > 3) {
      if (mock) {
        console.warn(`ResourceSearch in mock mode. q: ${query}`);
      } else {
        hasQuery = true;
        isLoading = true;
        errorMessage = "";
        searchIndex
          .search({ query, hitsPerPage: maxResults })
          .then(({ hits }) => (results = hits))
          .catch(e => (errorMessage = e.message))
          .finally(() => (isLoading = false));
      }
    } else {
      hasQuery = false;
      results = [];
    }
  }
</script>

<div class="field dropdown is-block">
  <label for="search" class="is-sr-only" id="search-label">
    Search for a provider
  </label>
  <Autocomplete
    className={isLoading ? 'is-flex is-loading' : 'is-flex'}
    bind:value={query}
    id="search"
    placeholder="Search for a provider...">
    <i class="fas fa-search" slot="input-left-icon" />
    <div slot="help">
      {#if hasQuery && !isLoading && !results.length}
        <p class="help is-info">No providers match your search</p>
      {/if}
      {#if hasQuery && errorMessage}
        <p class="help is-error">{errorMessage}</p>
      {/if}
    </div>
    {#if hasQuery}
      {#each results as resourceResult (resourceResult.objectID)}
        <AutocompleteItem
          on:select={() => handleSelect(resourceResult.objectID)}>
          <ResourceSearchResult {action} {resourceResult} />
        </AutocompleteItem>
      {/each}
    {/if}
  </Autocomplete>
</div>
