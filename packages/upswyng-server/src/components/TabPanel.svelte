<script>
  import { getContext, onMount, onDestroy } from "svelte";
  import { key } from "./Tabs.svelte";

  const { getTabPanelElements, selectedTabIndex } = getContext(key);

  let tabPanelElement;
  let tabPanelIndex;

  let currentSelectedTabIndex;
  const unsubscribeSelectedTabIndex = selectedTabIndex.subscribe(tabIndex => {
    currentSelectedTabIndex = tabIndex;
  });

  onDestroy(() => unsubscribeSelectedTabIndex());

  onMount(() => {
    const tabPanelElements = getTabPanelElements();
    tabPanelIndex = tabPanelElements.length;
    tabPanelElements.push(tabPanelElement);
  });
</script>

{#if tabPanelIndex === currentSelectedTabIndex}
  <div
    aria-labelledby={`tab-${tabPanelIndex}`}
    bind:this={tabPanelElement}
    id={`tab-panel-${tabPanelIndex}`}
    tabindex="0">
    <slot />
  </div>
{/if}
