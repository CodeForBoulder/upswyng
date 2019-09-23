<script context="module">
  export function preload(page, { grant }) {
    return { grant };
  }
</script>

<script>
  import { stores } from "@sapper/app";
  const { session } = stores();
  //   console.log("SESSION", session);
  export let grant;
</script>

<svelte:head>
  <title>Upswyng</title>
</svelte:head>

<h1>Upswyng</h1>

<p>Visit us in the Play Store</p>
<p>Visit us on the Web</p>
