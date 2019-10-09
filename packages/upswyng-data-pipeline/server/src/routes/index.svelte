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

<section class="section">
  <div class="container">
    <h1 class="title">Upswyng</h1>
    <p class="subtitle">Boulder</p>
  </div>
</section>
