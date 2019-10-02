<script context="module">
  export async function preload({ params, query }) {
    const resourceResponse = await this.fetch(`/api/resource/${params.id}`);
    const { resource } = await resourceResponse.json();

    const subcategoryResponse = await this.fetch(`/api/subcategories`);
    const { subcategories } = await subcategoryResponse.json();

    if (resourceResponse.status !== 200) {
      this.error(resourceResponse.status, resourceData.message);
    } else if (subcategoryResponse.status !== 200) {
      this.error(subcategoryResponse.status, subcategoryData.message);
    } else {
      return { resource, subcategories };
    }
  }
</script>

<script>
  import ResourceEditor from "../../components/ResourceEditor.svelte";
  export let resource; // TResource
  export let subcategories; // TSubcategory[], all subcategories in the app

  let isSaving = false;
  let saveError = null; // Error | null

  function handleSaveClick(resource) {
    saveError = null;
    isSaving = true;

    const options = {
      method: "POST",
      body: JSON.stringify({ draftResource: resource }),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch("/api/resource", options)
      .then(async res => {
        if (res.status >= 400) {
          const { message } = await res.json();
          throw new Error(
            message || "There was an error creating the draft resource."
          );
        }
        return await res.json();
      })
      .then(res => {
        if (res.draftResource) {
          window.location.href = "/resource";
        } else {
          console.error(res);
          saveError = new Error(
            "There was an error creating the draft resource."
          );
        }
      })
      .catch(e => (saveError = e))
      .finally(() => (isSaving = false));
  }
</script>

<svelte:head>
  <title>Upswyng: {resource.name}</title>
</svelte:head>

<ResourceEditor
  {resource}
  {subcategories}
  errorText={saveError ? saveError.message : ''}
  on:dispatchSaveResource={e => handleSaveClick(e.detail)} />
