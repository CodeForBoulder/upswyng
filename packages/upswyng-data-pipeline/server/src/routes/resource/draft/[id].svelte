<script context="module">
  export async function preload({ params, query }) {
    const resourceResponse = await this.fetch(
      `/api/resource/draft/${params.id}`
    );
    const resourceData = await resourceResponse.json();

    if (resourceResponse.status !== 200) {
      this.error(resourceResponse.status, resourceData.message);
    } else {
      // see if we have an existing resource corresponding to this draft
      const existingResourceResponse = await this.fetch(
        `/api/resource/${resourceData.draftResource.id}`
      );
      if (existingResourceResponse.status === 404) {
        return {
          draftResource: resourceData.draftResource,
          existingResource: null
        };
      }
      const existingResourceData = await existingResourceResponse.json();
      if (existingResourceResponse.status !== 200) {
        this.error(
          existingResourceResponse.status,
          existingResourceData.message
        );
      } else {
        return {
          draftResource: resourceData.draftResource,
          existingResource: existingResourceData.resource
        };
      }
    }
  }

  function deleteDraft(id) {
    isDeleting = true;

    fetch(`/api/resource/draft/delete/${id}`, { method: "POST" })
      .then(_res => {
        window.location.href = "/resource";
      })
      .catch(e => (deleteError = e))
      .finally(() => (isDeleting = false));
  }
</script>

<script>
  import ResourceDisplay from "../../../components/ResourceDisplay.svelte";

  export let draftResource;
  export let existingResource; // resource in the directory which this draft would update; null for new resources

  let isDeleting  = false; // Whether we've issued a call to the server to delete the draft resource
  let deleteError = null; // error? Poupulated with the error from a detete attempt, if there has been one
</script>

<svelte:head>
  <title>Upswyng: {draftResource.name} [draft]</title>
</svelte:head>

{#if existingResource}
  <p>Updating Resource</p>
{:else}
  <p>New Resource</p>
{/if}

<ResourceDisplay resource={draftResource} />

<div>
  <button
    type="button"
    preventDefault
    disabled={isDeleting}
    on:click={() => deleteDraft(draftResource._id)}>
    Delete Draft
  </button>
  <button
    type="button"
    preventDefault
    disabled={isDeleting}
    on:click={() => console.log('Approve Update')}>
    Approve Update
  </button>
</div>
