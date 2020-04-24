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

  let hasQuery = query.length > 3;
  const selectedOption = null;

  let numberItems = 0;
  let inputIsFocused = false;
  let focusedItemIndex = null;

  function handleInputBlur() {
    inputIsFocused = false;
    focusedItemIndex = null;
  }

  function handleInputKeydown(e) {
    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();
        if (focusedItemIndex === null) {
          focusedItemIndex = numberItems - 1;
        } else {
          focusedItemIndex =
            focusedItemIndex === 0 ? numberItems - 1 : focusedItemIndex - 1;
        }
        return;
      }
      case "ArrowDown": {
        e.preventDefault();
        if (focusedItemIndex === null) {
          focusedItemIndex = 0;
        } else {
          focusedItemIndex =
            focusedItemIndex === numberItems - 1 ? 0 : focusedItemIndex + 1;
        }
      }
    }
  }

  $: {
    focusedItemIndex = null;
    if (query && query.length > 3) {
      hasQuery = true;
      isLoading = true;
      errorMessage = "";
      searchIndex
        .search({ query, hitsPerPage: maxResults })
        .then(({ hits }) => {
          numberItems = hits.length || 1;
          return (results = hits);
        })
        .catch(e => {
          numberItems = 1;
          return (errorMessage = e.message);
        })
        .finally(() => (isLoading = false));
    } else {
      numberItems = 0;
      hasQuery = false;
      results = [];
    }
  }
</script>

<div
  class="field dropdown is-block"
  class:is-active={inputIsFocused && hasQuery && !isLoading}>
  <label for="search" class="is-sr-only" id="search-label">
    Search for a provider
  </label>
  <div
    class="control has-icons-left"
    class:is-loading={isLoading}
    role="combobox"
    aria-expanded={hasQuery}
    aria-owns="search-results-list"
    aria-haspopup="listbox">
    <input
      on:focus={() => (inputIsFocused = true)}
      class="input"
      id="search"
      name="search"
      type="text"
      placeholder="Search for a provider..."
      bind:value={query}
      aria-autocomplete="list"
      aria-controls="search-results-list"
      on:blur={handleInputBlur}
      on:keydown={handleInputKeydown} />
    <span class="icon is-left">
      <i class="fas fa-search" />
    </span>
  </div>
  <div class="dropdown-menu">
    <ul
      aria-labelledby="search-label"
      class="dropdown-content is-marginless"
      id="search-results-list"
      role="listbox">
      {#if hasQuery}
        {#if errorMessage || (!isLoading && !results.length)}
          <li
            aria-selected={selectedOption === 0}
            class="dropdown-item help"
            class:help={!isLoading && !results.length}
            class:has-background-dark={focusedItemIndex === 0}
            class:has-text-light={focusedItemIndex === 0}
            role="option">
            {#if errorMessage}
              {errorMessage}
            {:else if !isLoading && !results.length}
              No providers match your search
            {/if}
          </li>
        {/if}
        {#each results as resourceResult, i}
          {#if i !== 0}
            <hr class="dropdown-divider is-marginless" />
          {/if}
          <ResourceSearchResult
            {action}
            {resourceResult}
            isFocused={focusedItemIndex === i}
            on:resourceClick={() => dispatch('resourceClick', resourceResult.objectID)} />
        {/each}
      {/if}
    </ul>
  </div>
</div>
