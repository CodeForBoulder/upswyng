<script context="module">
  import { ResourceSchedule } from "@upswyng/common";

  export async function preload({ params, query }, { user }) {
    if (!user || !user.isAdmin) {
      this.error(401, "You must be an admin to access this page.");
    }

    const resourceResponse = await this.fetch(
      `/api/resource/draft/${params._id}`
    );

    const resourceData = await resourceResponse.json();

    if (resourceResponse.status !== 200) {
      this.error(resourceResponse.status, resourceData.message);
    } else {
      // see if we have an existing resource corresponding to this draft
      const existingResourceResponse = await this.fetch(
        `/api/resource/${resourceData.draftResource.resourceId}`
      );
      if (existingResourceResponse.status === 404) {
        return {
          draftResource: {
            ...resourceData.draftResource,
            schedule: ResourceSchedule.parse(
              resourceData.draftResource.schedule
            ),
          },
          existingResource: null,
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
          draftResource: {
            ...resourceData.draftResource,
            schedule: ResourceSchedule.parse(
              resourceData.draftResource.schedule
            ),
          },
          existingResource: {
            ...existingResourceData.resource,
            schedule: ResourceSchedule.parse(
              existingResourceData.resource.schedule
            ),
          },
        };
      }
    }
  }
</script>

<script>
  import { addFlashMessage } from "./../../../../utility/flashMessage.ts";
  import { goto, stores } from "@sapper/app";
  import ResourceDiff from "./../../../../components/ResourceDiff.svelte";
  import ResourceDisplay from "./../../../../components/ResourceDisplay.svelte";

  const { session } = stores();

  export let draftResource;
  export let existingResource; // resource in the directory which this draft would update; null for new resources

  let isDeleting = false; // Whether we've issued a call to the server to delete the draft resource
  let deleteError = null; // error? Poupulated with the error from a detete attempt, if there has been one

  let isApproving = false; // Whether we've issued a call to the server to approve the draft resource
  let approveError = null; // error? Poupulated with the error from an approve attempt, if there has been one

  function deleteDraft(_id) {
    isDeleting = true;

    fetch(`/api/resource/draft/delete/${_id}`, { method: "POST" })
      .then(_res => {
        if (_res.status >= 400) {
          throw new Error(_res);
        }
        addFlashMessage(
          session,
          "success",
          draftResource.name
            ? `The draft of ${draftResource.name} was deleted`
            : "The draft resource was deleted"
        );
        goto("/resource");
      })
      .catch(e => (deleteError = e))
      .finally(() => (isDeleting = false));
  }

  async function approveUpdate(_id) {
    isApproving = true;

    fetch(`/api/resource/draft/approve/${_id}`, { method: "POST" })
      .then(async res => {
        if (res.status >= 400) {
          const { message } = await res.json();
          if (message) {
            throw new Error(message);
          }
          throw new Error(res);
        }
        addFlashMessage(
          session,
          "success",
          `The draft of ${draftResource.name} was approved`
        );
        goto("/provider/resource");
      })
      .catch(e => (approveError = e))
      .finally(() => (isApproving = false));
  }
</script>

<svelte:head>
  <title>UpSwyng: {draftResource.name} [draft]</title>
</svelte:head>

<section class="section">
  <div class="container">
    {#if existingResource}
      <h1 class="title">
        Update Service Provider: {existingResource.name}
        <span class="tag is-dark">Admin</span>
      </h1>
      <p class="subtitle">
        Service Provider ID:
        <a href={`/provider/resource/${existingResource.resourceId}`}>
          {existingResource.resourceId}
        </a>
      </p>
      <ResourceDiff
        leftResource={existingResource}
        rightResource={draftResource} />
    {:else}
      <h1 class="title">
        Create New Service Provider
        <span class="tag is-dark">Admin</span>
      </h1>
      <ResourceDisplay resource={draftResource} />
    {/if}

    <div class="buttons">
      <button
        class="button is-danger is-outlined"
        class:is-loading={isDeleting}
        type="button"
        preventDefault
        disabled={isApproving}
        on:click={() => deleteDraft(draftResource._id)}>
        <span class="icon is-small">
          <i class="fas fa-times" />
        </span>
        <span>Delete Draft</span>
      </button>
      <button
        class="button is-success"
        class:is-loading={isApproving}
        type="button"
        preventDefault
        disabled={isDeleting}
        on:click={() => approveUpdate(draftResource._id)}>
        <span class="icon is-small">
          <i class="fas fa-check" />
        </span>
        <span>Approve Update</span>
      </button>
    </div>
    <div>
      {#if approveError}
        <p class="notification is-danger">
          There was an error approving the service provider: {approveError.message}
        </p>
      {/if}
      {#if deleteError}
        <p class="notification is-danger">
          There was an error deleting the service provider: {deleteError.message}
        </p>
      {/if}
    </div>
  </div>
</section>
