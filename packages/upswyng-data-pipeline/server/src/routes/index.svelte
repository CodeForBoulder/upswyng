<script context="module">
  export function preload(page, { user }) {
    return { user };
  }
</script>

<script>
  export let user;
</script>

<svelte:head>
  <title>Upswyng</title>
</svelte:head>

<h1>Upswyng</h1>
{JSON.stringify(user, 2, null)}
<p>Visit us in the Play Store</p>
<p>Visit us on the Web</p>
