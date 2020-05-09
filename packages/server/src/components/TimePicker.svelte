<script>
  export let value;
  export let iconColorClass = "has-text-grey-lighter";
</script>

<style>
  :global(input[type="time"]::-webkit-clear-button) {
    display: none;
  }
</style>

<div class="control has-icons-left">
  <input class="input" type="time" bind:value />
  <span class={`icon is-left ${iconColorClass}`}>
    <i class="far fa-clock fa-lg" />
  </span>
</div>
