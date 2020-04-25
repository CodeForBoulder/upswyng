<script>
  import { getContext, onDestroy } from "svelte";
  import { key } from "./Autocomplete.svelte";

  export let id;
  export let value = "";

  const {
    inputIsFocused,
    focusedItemIndex,
    numItems,
    setFocusedItemIndex,
    setInputIsFocused,
  } = getContext(key);

  let numberItems = 0;
  let inputValue;

  let currentFocusedItemIndex;
  const unsubscribeFocusedItemIndex = focusedItemIndex.subscribe(index => {
    currentFocusedItemIndex = index;
  });

  let currentNumItems;
  const unsubscribeNumItems = numItems.subscribe(numItems => {
    currentNumItems = numItems;
  });

  let isFocused;
  const unsubscribeInputIsFocused = inputIsFocused.subscribe(b => {
    isFocused = b;
  });

  function handleInputBlur() {
    setInputIsFocused(false);
    setFocusedItemIndex(null);
  }

  function handleInputKeydown(e) {
    let newFocusedItemIndex = null;

    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();
        if (currentFocusedItemIndex === null) {
          newFocusedItemIndex = currentNumItems - 1;
        } else {
          newFocusedItemIndex =
            currentFocusedItemIndex === 0
              ? currentNumItems - 1
              : currentFocusedItemIndex - 1;
        }
        return setFocusedItemIndex(newFocusedItemIndex);
      }
      case "ArrowDown": {
        e.preventDefault();
        if (currentFocusedItemIndex === null) {
          newFocusedItemIndex = 0;
        } else {
          newFocusedItemIndex =
            currentFocusedItemIndex === currentNumItems - 1
              ? 0
              : currentFocusedItemIndex + 1;
        }
        return setFocusedItemIndex(newFocusedItemIndex);
      }
      case "Enter": {
      }
    }
  }

  $: {
    value = inputValue;
  }

  onDestroy(() => {
    unsubscribeFocusedItemIndex();
    unsubscribeInputIsFocused();
    unsubscribeNumItems();
  });
</script>

<div
  class={`control has-icons-left`}
  role="combobox"
  aria-expanded={!!numberItems.length}
  aria-owns="search-results-list"
  aria-haspopup="listbox">
  <input
    aria-autocomplete="list"
    aria-controls="search-results-list"
    bind:value={inputValue}
    class="input"
    {id}
    name="search"
    on:blur={handleInputBlur}
    on:focus={() => setInputIsFocused(true)}
    on:keydown={handleInputKeydown}
    type="text" />
  <slot />
</div>
