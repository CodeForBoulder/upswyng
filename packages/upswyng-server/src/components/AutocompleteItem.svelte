<script>
  import { getContext, onMount, onDestroy } from "svelte";
  import { key } from "./Autocomplete.svelte";

  export let className = "";

  const { addItem, focusedItemIndex, numItems, removeItem } = getContext(key);

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

{#if itemIndex !== 0}
  <hr class="dropdown-divider is-marginless" />
{/if}
<li
  aria-selected={isFocused}
  class={`dropdown-item ${className}`}
  class:has-background-dark={isFocused}
  class:has-text-light={isFocused}
  role="option">
  <slot />
</li>
