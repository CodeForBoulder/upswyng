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

<section class="section">
  <div class="container">
    <h1 class="title">{category.name}</h1>

    <div class="content">
      <ul>
        {#each category.subcategories as subcategory}
          <a href={`../subcategory/${subcategory.stub}`}>
            <li>{subcategory.name}</li>
          </a>
        {/each}
      </ul>
    </div>
  </div>
</section>
