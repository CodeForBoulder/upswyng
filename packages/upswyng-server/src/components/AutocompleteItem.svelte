<script>
  import { getContext, onMount, onDestroy } from "svelte";
  import { key } from "./Autocomplete.svelte";

  export let className = "";
  export let onSelect = () => {};

  const { addItem, focusedItemIndex, id, numItems, removeItem } = getContext(
    key
  );

  let itemIndex;

  let currentNumItems;
  const unsubscribeNumItems = numItems.subscribe(numItems => {
    currentNumItems = numItems;
  });

  let isFocused;
  const unsubscribeFocusedTabIndex = focusedItemIndex.subscribe(i => {
    isFocused = i === itemIndex;
  });

  onDestroy(() => {
    removeItem();
    unsubscribeFocusedTabIndex();
    unsubscribeNumItems();
  });

  onMount(() => {
    itemIndex = currentNumItems;
    addItem();
  });
</script>

<style>
  .autocomplete-item:hover {
    background-color: #f5f5f5;
    color: #0a0a0a;
    cursor: pointer;
  }
</style>

{#if itemIndex !== 0}
  <hr class="dropdown-divider is-marginless" />
{/if}
<li
  aria-selected={isFocused}
  class={`dropdown-item autocomplete-item ${className}`}
  class:has-background-dark={isFocused}
  class:has-text-light={isFocused}
  data-autocomplete-id={id}
  id={`${id}-item-${itemIndex}`}
  on:click={onSelect}
  role="option"
  tabindex="-1">
  <slot />
</li>
