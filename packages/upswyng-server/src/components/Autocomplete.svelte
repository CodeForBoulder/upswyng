<script context="module">
  export const key = {};
</script>

<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import AutocompleteInput from "./AutocompleteInput.svelte";

  export let className = "";
  export let id;
  export let placeholder;
  export let value;

  const focusedItemIndex = writable(null);
  let inputIsFocused = writable(false);
  let numItems = writable(0);
  let inputValue;

  setContext(key, {
    addItem: () => numItems.update(n => n + 1),
    focusedItemIndex,
    id,
    inputIsFocused,
    numItems,
    removeItem: () => numItems.update(n => n - 1),
    setFocusedItemIndex: i => focusedItemIndex.set(i),
    setInputIsFocused: b => inputIsFocused.set(b),
  });

  const listId = `${id}-list`;

  $: {
    value = inputValue;
  }
</script>

<style>
  .autocomplete-input-container {
    width: 100%;
  }
  .autocomplete-list {
    list-style-type: none;
  }
</style>

<div
  class={`field dropdown ${className}`}
  class:is-active={$inputIsFocused && !!$numItems}>
  <div
    aria-expanded={$inputIsFocused && !!$numItems}
    aria-owns={listId}
    aria-haspopup="listbox"
    class="autocomplete-input-container"
    role="combobox">
    <AutocompleteInput bind:value={inputValue} {id} {placeholder}>
      <span class="icon is-left">
        <slot name="input-left-icon" />
      </span>
    </AutocompleteInput>
    <slot name="help" />
  </div>
  <div class="dropdown-menu">
    <ul
      aria-labelledby="search-label"
      class="dropdown-content autocomplete-list is-marginless"
      id={listId}
      role="listbox">
      <slot />
    </ul>
  </div>
</div>
