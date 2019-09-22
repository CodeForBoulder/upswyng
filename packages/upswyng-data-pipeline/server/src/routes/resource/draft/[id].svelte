<script context="module">
  export async function preload({ params, query }) {
    const resourceResponse = await this.fetch(
      `/api/resource/draft/${params.id}`
    );
    const resourceData = await resourceResponse.json();

    if (resourceResponse.status !== 200) {
      this.error(resourceResponse.status, resourceData.message);
    } else {
      return { draftResource: resourceData.draftResource };
    }
  }
</script>

<script>
  import { form as svelteForm } from "svelte-forms";
  import CloseScheduleInput from "../../../components/CloseScheduleInput.svelte";
  import devalue from "devalue";
  import ScheduleInput from "../../../components/ScheduleInput.svelte";
  import ServicesInput from "../../../components/ServicesInput.svelte";
  import SubcategoryInput from "../../../components/SubcategoryInput.svelte";

  export let draftResource;
</script>

<svelte:head>
  <title>Upswyng: {draftResource.name} [draft]</title>
</svelte:head>

<div><p>{devalue(draftResource)}</p></div>
