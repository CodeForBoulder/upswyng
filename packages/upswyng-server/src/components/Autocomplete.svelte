<script context="module">
  export const key = {};
</script>

<script>
  import { afterUpdate, onDestroy, setContext } from "svelte";
  import { writable } from "svelte/store";
  import AutocompleteInput from "./AutocompleteInput.svelte";

  export let className = "";
  export let id;
  export let value;

  const focusedItemIndex = writable(null);
  let inputIsFocused = writable(false);
  let numItems = writable(0);
  let inputValue;

  setContext(key, {
    addItem: () => numItems.update(n => n + 1),
    focusedItemIndex,
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
  .dropdown-content {
    list-style-type: none;
  }
</style>

<div
  class={`field dropdown ${className}`}
  class:is-active={$inputIsFocused && !!$numItems}>
  <div
    aria-expanded={!!$numItems}
    aria-owns={listId}
    aria-haspopup="listbox"
    class="control has-icons-left"
    role="combobox">
    <AutocompleteInput bind:value={inputValue} {id}>
      <span class="icon is-left">
        <slot name="input-left-icon" />
      </span>
    </AutocompleteInput>
    <slot name="help" />
  </div>
  <div class="dropdown-menu">
    <ul
      aria-labelledby="search-label"
      class="dropdown-content is-marginless"
      id={listId}
      role="listbox">
      <slot />
    </ul>
  </div>
</div>
