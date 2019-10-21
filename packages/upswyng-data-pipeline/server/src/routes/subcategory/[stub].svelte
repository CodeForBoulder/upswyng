<script context="module">
  export async function preload({ params, query }, { user }) {
    const res = await this.fetch(`api/subcategory/${params.stub}`);
    const data = await res.json();
    if (res.status === 200) {
      return { subcategory: data.subcategory, user };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import ResourceSearch from "../../components/ResourceSearch.svelte";

  export let subcategory;
  export let user = null;

  let errorMessage = "";
  let successMessage = "";
  let isSaving = false;

  async function addResourceToSubcategory(resourceId /* string */) {
    isSaving = true;
    errorMessage = "";
    successMessage = "";

    const options = {
      method: "POST",
      body: JSON.stringify({
        subcategoryId: subcategory._id,
        resourceId: resourceId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch("/api/subcategory/add-resource", options)
      .then(async res => {
        if (res.status >= 400) {
          const { message } = await res.json();
          errorMessage = message;
        } else {
          successMessage = `Resource added to ${subcategory.name}`;
          // reload the subcategories
          const res = await fetch(`api/subcategory/${subcategory.stub}`);
          const { subcategory: updatedSubcategory } = await res.json();
          if (res.status === 200) {
            subcategory = updatedSubcategory;
          } else {
            this.error(res.status, data.message);
          }
        }
      })
      .catch(e => (errorMessage = e))
      .finally(() => (isSaving = false));
  }
</script>

<svelte:head>
  <title>Upswyng: {subcategory.name}</title>
</svelte:head>

<section class="section">
  <div class="container">
    <h1 class="title">{subcategory.name}</h1>
    {#if subcategory.resources.length}
      <ul class="content">
        {#each subcategory.resources as resource}
          <li>
            <a href={`resource/${resource.id}`}>{resource.name}</a>
          </li>
        {/each}
      </ul>
    {:else}
      <div class="notification">
        There are no resources for this subcategory.
      </div>
    {/if}
    {#if user && user.isAdmin}
      <div class="content">
        <h2 class="subtitle">Add resources to {subcategory.name}</h2>
        {#if errorMessage}
          <div class="notification is-danger">{errorMessage}</div>
        {/if}
        {#if successMessage}
          <div class="notification is-success">
            <button class="delete" on:click={() => (successMessage = '')} />
            {successMessage}
          </div>
        {/if}
        <ResourceSearch
          action="addToSubcategory"
          on:resourceClick={async ({ detail: id }) => {
            await addResourceToSubcategory(id);
          }} />
      </div>
    {/if}
  </div>
</section>
