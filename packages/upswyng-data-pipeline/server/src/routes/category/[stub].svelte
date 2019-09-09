<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`api/category/${params.stub}`);
    const data = await res.json();
    if (res.status === 200) {
      return { category: data.category };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let category;
</script>

<svelte:head>
  <title>Upswyng: {category.name}</title>
</svelte:head>

<h1>{category.name}</h1>

<div class="content">{JSON.stringify(category, null, 2)}</div>
