<script>
  import Nav from "../components/Nav.svelte";

  export let segment;

  import { stores } from "@sapper/app";
  const { session } = stores();
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Nav {segment} user={$session.user} />

<main>
  <slot />
</main>
