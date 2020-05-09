<script context="module">
  export async function preload({ params, query }, { user }) {
    const isLoggedIn = !!user;
    const isAdmin = isLoggedIn && user.isAdmin;

    const { categories } = await this.fetch("/api/categories").then(r =>
      r.json()
    );

    let uncategorizedResources = [];
    let draftResources = [];
    let draftsForUser = [];
    if (isAdmin) {
      uncategorizedResources =
        (await this.fetch("/api/resources/uncategorized", {
          credentials: "same-origin",
        }).then(r => r.json()).uncategorizedResources) || [];
      draftResources =
        (await this.fetch("/api/resources/drafts?include-deleted", {
          credentials: "same-origin",
        }).then(r => r.json())).draftResources || [];
    }
    if (isLoggedIn) {
      draftsForUser =
        (await this.fetch("/api/resources/drafts/mine", {
          credentials: "same-origin",
        }).then(r => r.json())).draftResources || [];
    }
    return {
      categories,
      draftResources,
      draftsForUser,
      uncategorizedResources,
      user,
    };
  }
</script>

<script>
  import ResourceSearch from "./../../../components/ResourceSearch.svelte";
  import { goto, stores } from "@sapper/app";
  import { readFlashMessages } from "./../../../utility/flashMessage.ts";

  const { session } = stores();
  const flashMessages = readFlashMessages(session);

  export let categories = null;
  export let draftResources = null;
  export let draftsForUser = []; // The pending drafts created by a user
  export let uncategorizedResources = null;
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
    <h1 class="title">Providers</h1>

    <div class="content">
      <h2 class="subtitle">Search for a Provider</h2>
      <ResourceSearch
        action="view"
        on:select={({ detail: resourceId }) => {
          goto(`/provider/resource/${resourceId}`);
        }} />
    </div>

    {#if user}
      <div class="content">
        <a href="/provider/resource/create" class="button is-large">
          <span class="icon is-large">
            <i class="fas fa-plus" />
          </span>
          <span>Create a New Resource</span>
        </a>
      </div>
    {:else}
      <div class="notification">
        <a href="/provider/login">Log in</a>
        to create a resource
      </div>
    {/if}

    <div class="content">
      {#if categories.length}
        <h2 class="subtitle">Categories</h2>
        <ul class="content">
          {#each categories as category}
            <li>
              <a href={`/provider/category/${category.stub}`}>
                {category.name}
              </a>
            </li>
          {/each}
        </ul>
      {:else}
        <div class="notification">No categories found.</div>
      {/if}
    </div>

    {#if user && user.isAdmin}
      <div class="content">
        <h2 class="subtitle">
          Draft Providers
          <span class="tag is-dark">Admin</span>
        </h2>
        {#if draftResources.length}
          <ul class="content">
            {#each draftResources as draftResource}
              <li>
                <a href={`/provider/resource/draft/${draftResource._id}`}>
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

    {#if draftsForUser.length}
      <div class="content">
        <h2 class="subtitle">Your Drafts</h2>
        <ul class="content">
          {#each draftsForUser as draft}
            <li>
              <a href={`/provider/resource/draft/${draft._id}`}>{draft.name}</a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    {#if uncategorizedResources.length && user && user.isAdmin}
      <div class="content">
        <h2 class="subtitle">
          Uncategorized Providers
          <span class="tag is-dark">Admin</span>
        </h2>
        <ul class="content">
          {#each uncategorizedResources as resource}
            <li>
              <a href={`/provider/resource/${resource.resourceId}`}>
                {resource.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</section>
