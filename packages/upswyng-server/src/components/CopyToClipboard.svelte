<script>
  import { onDestroy, onMount } from "svelte";

  export let textToCopy; // string
  export let tooltipText = "Copy to clipboard";

  let alwaysShowTooltip = false;

  let timeoutHandle;

  let canWriteToClipboard = false;

  function handleClick() {
    alwaysShowTooltip = true;
    const lastTooltipText = tooltipText;
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        tooltipText = "Copied";
        timeoutHandle = setTimeout(() => {
          alwaysShowTooltip = false;
          tooltipText = lastTooltipText;
        }, 2500);
      },
      () => {
        tooltipText = "Could not copy";
        timeoutHandle = setTimeout(() => {
          alwaysShowTooltip = false;
          tooltipText = lastTooltipText;
        }, 2500);
      }
    );
  }

  onMount(() => {
    if (navigator && navigator.permissions) {
      navigator.permissions.query({ name: "clipboard-write" }).then(result => {
        if (result.state == "granted" || result.state == "prompt") {
          canWriteToClipboard = true;
        }
      });
    }
  });

  onDestroy(() => {
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
  });
</script>

{#if textToCopy && canWriteToClipboard}
  <button
    class="button is-small"
    on:click={handleClick}
    class:has-tooltip-active={alwaysShowTooltip}
    disabled={alwaysShowTooltip}
    data-tooltip={tooltipText}>
    <span class="icon is-small">
      <i class="far fa-clipboard" />
    </span>
  </button>
{/if}
