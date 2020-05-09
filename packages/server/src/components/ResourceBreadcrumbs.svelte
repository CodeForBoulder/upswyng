<script>
  export let resource; // TResource | TNewResource
</script>

<style>
  nav:not(:last-of-type) {
    margin-bottom: 0;
  }
</style>

{#each resource.subcategories || [] as subcategory}
  <nav class="breadcrumb has-bullet-separator" aria-label="breadcrumbs">
    <ul>
      <li>
        <a href={`/provider/category/${subcategory.parentCategory.stub}`}>
          {subcategory.parentCategory.name}
        </a>
      </li>
      <li>
        <a href={`/provider/subcategory/${subcategory.stub}`}>
          {subcategory.name}
        </a>
      </li>
      <li class="is-active">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" aria-current="page">{resource.name}</a>
      </li>
    </ul>
  </nav>
{/each}
