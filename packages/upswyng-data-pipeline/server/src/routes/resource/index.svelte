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
  import ResourceSearch from "../../components/ResourceSearch.svelte";
  import { goto, stores } from "@sapper/app";

  const { session } = stores();
  const flashMessages = $session.flash || [];
  session.update(s => ({ ...s, flash: [] }));

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
    {#each flashMessages as flashMessage}
      <div
        class="notification"
        class:is-success={flashMessage.type === 'success'}
        class:is-danger={flashMessage.type === 'error'}>
        {flashMessage.message}
      </div>
    {/each}
    <h1 class="title">Resources</h1>
    {#if user}
      <div class="content">
        <a href="/resource/create" class="button is-large">
          <span class="icon is-large">
            <i class="fas fa-plus" />
          </span>
          <span>Create a New Resource</span>
        </a>
      </div>
    {:else}
      <div class="notification">
        <a href="/login">Log in</a>
        to create a resource
      </div>
    {/if}

    <div class="content">
      {#if categories.length}
        <p class="subtitle">Resource Categories</p>
        <ul class="content">
          {#each categories as category}
            <li>
              <a href={`/category/${category.stub}`}>{category.name}</a>
            </li>
          {/each}
        </ul>
      {:else}
        <div class="notification">No categories found.</div>
      {/if}
    </div>

    {#if user && user.isAdmin}
      <div class="content">
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
          <div class="notification">No drafts at this time.</div>
        {/if}
      </div>
    {/if}

    <div class="content">
      <p class="subtitle">Search for a Resource</p>
      <ResourceSearch
        action="view"
        on:resourceClick={({ detail: id }) => {
          goto(`/resource/${id}`);
        }} />
    </div>

    {#if uncategorizedResources.length && user && user.isAdmin}
      <div class="content">
        <p class="subtitle">Uncategorized Resources</p>
        <ul class="content">
          {#each uncategorizedResources as resource}
            <li>
              <a href={`/resource/${resource.id}`}>{resource.name}</a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</section>
