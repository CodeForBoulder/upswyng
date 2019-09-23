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
</script>

<script>
  import { form as svelteForm } from "svelte-forms";
  import CloseScheduleInput from "../../../components/CloseScheduleInput.svelte";
  import devalue from "devalue";
  import ResourceDisplay from "../../../components/ResourceDisplay.svelte";
  import ScheduleInput from "../../../components/ScheduleInput.svelte";
  import ServicesInput from "../../../components/ServicesInput.svelte";
  import SubcategoryInput from "../../../components/SubcategoryInput.svelte";

  export let draftResource;
  export let existingResource; // resource in the directory which this draft would update; null for new resources
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
