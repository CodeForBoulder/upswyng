<script>
  import Nav from "../components/Nav.svelte";

  export let segment;

  import { stores } from "@sapper/app";
  const { session } = stores();
</script>

<style global lang="scss">
  @import './style/main.scss';

</style>

<Nav {segment} user={$session.user} />

<main>
  <slot />
</main>
