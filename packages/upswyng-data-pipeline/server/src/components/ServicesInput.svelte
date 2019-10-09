<script>
  import tagsInput from "bulma-tagsinput/src/js/index.js";
  import { onMount } from "svelte";

  export let value = []; // string[]

  onMount(() => tagsInput.attach());
</script>

<style>
  @import "bulma-tagsinput/dist/css/bulma-tagsinput.sass";
</style>

<input
  type="tags"
  placeholder="Add Service"
  value={value.join(',')}
  on:change={e => (value = (e.target.value || '').split(','))} />
