<script>
  import { getContext, onDestroy, onMount } from "svelte";
  import { key } from "./TabbedContent.svelte";

  const {
    focusedTabIndex,
    getTabElements,
    setFocusedTabIndex,
    setSelectedTabIndex,
    selectedTabIndex,
  } = getContext(key);

  let tabElement;
  let tabIndex;

  let currentSelectedTabIndex;
  const unsubscribeSelectedTabIndex = selectedTabIndex.subscribe(tabIndex => {
    currentSelectedTabIndex = tabIndex;
  });
  let currentFocusedTabIndex;
  const unsubscribeFocusedTabIndex = focusedTabIndex.subscribe(tabIndex => {
    currentFocusedTabIndex = tabIndex;
  });

  function handleTabClick() {
    setFocusedTabIndex(tabIndex);
    setSelectedTabIndex(tabIndex);
  }

  function handleTabKeydown(e) {
    const tabElements = getTabElements();
    let newFocusTabIndex;

    switch (event.key) {
      case "ArrowLeft": {
        newFocusTabIndex =
          currentFocusedTabIndex === 0
            ? tabElements.length - 1
            : currentFocusedTabIndex - 1;
        break;
      }
      case "ArrowRight": {
        newFocusTabIndex =
          currentFocusedTabIndex === tabElements.length - 1
            ? 0
            : currentFocusedTabIndex + 1;
      }
    }

    setFocusedTabIndex(newFocusTabIndex);
    tabElements[newFocusTabIndex].focus();
  }

  onDestroy(() => {
    unsubscribeSelectedTabIndex();
    unsubscribeFocusedTabIndex();
  });

  onMount(() => {
    const tabElements = getTabElements();
    tabIndex = tabElements.length;
    tabElements.push(tabElement);
  });
</script>

<button
  aria-selected={currentSelectedTabIndex === tabIndex}
  aria-controls={`tab-panel-${tabIndex}`}
  bind:this={tabElement}
  class={`button is-medium ${currentSelectedTabIndex === tabIndex ? 'is-primary' : ''}`}
  id={`tab-${tabIndex}`}
  on:click|preventDefault={() => handleTabClick()}
  on:keydown={handleTabKeydown}
  role="tab"
  tabindex={currentSelectedTabIndex === tabIndex ? 0 : -1}>
  <slot />
</button>
