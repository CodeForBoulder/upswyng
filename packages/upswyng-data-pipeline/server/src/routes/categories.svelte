<script context="module">
  export function preload({ params, query }) {
    return this.fetch("api/categories")
      .then(r => r.json())
      .then(({ categories }) => {
        return { categories };
      });
  }
</script>

<script>
  export let categories = null;
</script>

<svelte:head>
  <title>Resource Categories</title>
</svelte:head>

<h1>Resource Categories</h1>

{#if categories.length}
  <ul>
    {#each categories as category}
      <li>{category.name}</li>
    {/each}
  </ul>
{:else}
  <span>No categories found!</span>
{/if}
