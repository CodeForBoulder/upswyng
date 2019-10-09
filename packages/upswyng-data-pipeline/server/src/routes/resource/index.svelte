<script context="module">
  export async function preload({ params, query }, { user }) {
    const { categories } = await this.fetch("/api/categories").then(r =>
      r.json()
    );
    const { uncategorizedResources } = await this.fetch(
      "/api/resources/uncategorized"
    ).then(r => r.json());
    // TODO: Remove displaying all resources once they get too big
    const { resources: allResources } = await this.fetch("/api/resources").then(
      r => r.json()
    );
    const { draftResources } = await this.fetch("/api/resources/drafts").then(
      r => r.json()
    );
    return {
      allResources,
      categories,
      draftResources,
      uncategorizedResources,
      user
    };
  }
</script>

<script>
  export let categories = null;
  export let draftResources = null;
  export let uncategorizedResources = null;
  export let allResources = null;
  export let user = null;
</script>

<svelte:head>
  <title>Resources</title>
</svelte:head>

<section class="section">
  <div class="container">
    <h1 class="title">Resources</h1>
    <div class="content">
      <!-- TODO: Gate this for logged in only -->
      <a href="/resource/create" class="button is-large">
        Create a New Resource
      </a>
    </div>

    <p class="subtitle">Resource Categories</p>

    {#if categories.length}
      <ul class="content">
        {#each categories as category}
          <li>
            <a href={`/category/${category.stub}`}>{category.name}</a>
          </li>
        {/each}
      </ul>
    {:else}
      <span>No categories found.</span>
    {/if}

    {#if user && user.isAdmin}
      <p class="subtitle">Draft Resources</p>

      {#if draftResources.length}
        <ul class="content">
          {#each draftResources as draftResource}
            <li>
              <a href={`/resource/draft/${draftResource._id}`}>
                {draftResource.name}
              </a>
            </li>
          {/each}
        </ul>
      {:else}
        <span>No drafts at this time.</span>
      {/if}
    {/if}

    <p class="subtitle">Uncategorized Resources</p>

    {#if uncategorizedResources.length}
      <ul class="content">
        {#each uncategorizedResources as resource}
          <li>
            <a href={`/resource/${resource.id}`}>{resource.name}</a>
          </li>
        {/each}
      </ul>
    {:else}
      <span>No uncategorized resources.</span>
    {/if}

    <p class="subtitle">All Resources</p>
    {#if allResources.length}
      <ul class="content">
        {#each allResources as resource}
          <li>
            <a href={`/resource/${resource.id}`}>{resource.name}</a>
          </li>
        {/each}
      </ul>
    {:else}
      <span>There an no resources.</span>
    {/if}
  </div>
</section>
