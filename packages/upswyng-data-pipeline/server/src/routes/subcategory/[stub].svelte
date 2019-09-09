<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`api/subcategory/${params.stub}`);
    const data = await res.json();
    if (res.status === 200) {
      return { subcategory: data.subcategory };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let subcategory;
</script>

<svelte:head>
  <title>Upswyng: {subcategory.name}</title>
</svelte:head>

<h1>{subcategory.name}</h1>

<div class="content">
  <ul>
    {#each subcategory.resources as resource}
      <li>
        <a href={`resource/${resource.id}`}>{resource.name}</a>
      </li>
    {/each}
  </ul>
</div>
