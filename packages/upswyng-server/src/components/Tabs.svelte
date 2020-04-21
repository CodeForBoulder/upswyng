<script context="module">
  export const key = {};
</script>

<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  const focusedTabIndex = writable(0);
  const selectedTabIndex = writable(0);
  const tabElements = [];
  const tabPanelElements = [];

  setContext(key, {
    focusedTabIndex,
    selectedTabIndex,
    getTabElements: () => tabElements,
    getTabPanelElements: () => tabPanelElements,
    setFocusedTabIndex: i => focusedTabIndex.set(i),
    setSelectedTabIndex: i => selectedTabIndex.set(i),
  });
</script>

<div role="tablist">
  <slot />
</div>
