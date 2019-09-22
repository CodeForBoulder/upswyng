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
  import { form as svelteForm } from "svelte-forms";
  import CloseScheduleInput from "../../components/CloseScheduleInput.svelte";
  import ScheduleInput from "../../components/ScheduleInput.svelte";
  import ServicesInput from "../../components/ServicesInput.svelte";
  import SubcategoryInput from "../../components/SubcategoryInput.svelte";

  export let resource;
  export let subcategories; // TSubcategory[], all subcategories in the app

  let isSaving = false;
  let saveError /* Error? */ = null;

  function extractErrors(form) {
    return Object.entries(form).reduce((result, [k, v]) => {
      if (typeof v === "object" && Object.keys(v).includes("errors")) {
        result = { ...result, [k]: v.errors };
      }
      return result;
    }, {});
  }

  function handleSaveClick(resource) {
    const options = {
      method: "POST",
      body: JSON.stringify({ draftResource: resource }),
      headers: {
        "Content-Type": "application/json"
      }
    };

    isSaving = true;

    fetch("/api/resource", options)
      .then(res => res.json())
      .then(res => {
        if (res.draftResource) {
          window.location.href = "/resources";
        } else {
          saveError = new Error("There was an error creating the resource");
        }
      })
      .catch(e => (saveError = e))
      .finally(() => (isSaving = false));
  }

  const resourceForm = svelteForm(() => ({
    // address
    address1: {
      value: resource.address.address1 || "",
      validators: ["required"]
    },
    address2: { value: resource.address.address2 || "", validators: [] },
    city: { value: resource.address.city, validators: ["required"] },
    state: { value: resource.address.state, validators: ["required"] },
    zip: { value: resource.address.zip, validators: ["required"] },
    //
    closeSchedule: { value: resource.closeSchedule || [], validators: [] },
    description: { value: resource.description || "", validators: ["min:12"] },
    latitude: {
      value: resource.latitude || 40.01,
      validators: ["between:-90:90"]
    },
    longitude: {
      value: resource.longitude || -105.27,
      validators: ["between:-180:180"]
    },
    name: { value: resource.name, validators: ["required", "min:6"] },
    phone: { value: resource.phone || "", validators: ["required", "min:10"] },
    schedule: { value: resource.schedule || [] },
    services: { value: resource.services || [], validators: [] },
    website: { value: resource.website || "", validators: ["url"] }
  }));
</script>

<svelte:head>
  <title>Upswyng: {resource.name}</title>
</svelte:head>

<h1>{resource.name}</h1>
{#each resource.subcategories as subcategory}
  <section>
    <a href={`/category/${subcategory.parentCategory.stub}`}>
      {subcategory.parentCategory.name}
    </a>
    >
    <a href={`/subcategory/${subcategory.stub}`}>{subcategory.name}</a>
    > {resource.name}
  </section>
{/each}
<div class="content">
  <p>ID: {resource.id}</p>
  <p>Legacy ID: {resource.legacyId}</p>
  <p>Kudos: {resource.kudos}</p>
  <p>Created At: {resource.createdAt}</p>
  <p>Last Modified At: {resource.lastModifiedAt}</p>
  <form>
    <p>
      <label for="name">Resource Name</label>
      <input name="name" type="text" bind:value={resource.name} />
      {#if $resourceForm.name.errors.includes('required')}
        <p>The name is required</p>
      {/if}

      {#if $resourceForm.name.errors.includes('min')}
        <p>The name should be at least 6 characters</p>
      {/if}
    </p>
    <p>
      <label for="description">Description</label>
      <textarea
        name="description"
        type="text"
        bind:value={resource.description} />
      {#if $resourceForm.description.errors.includes('min')}
        <p>The description should be at least 12 characters</p>
      {/if}
    </p>
    <p>
      <label for="phone">Phone</label>
      <input
        name="phone"
        autocomplete="tel"
        type="text"
        bind:value={resource.phone} />
      {#if $resourceForm.phone.errors.includes('min')}
        <p>The phone number should be at least 10 characters</p>
      {/if}
    </p>
    <fieldset>
      <p>
        <label for="address1">Address 1</label>
        <input
          name="address1"
          autocomplete="address-line1"
          type="text"
          bind:value={resource.address.address1} />
        {#if $resourceForm.address1.errors.includes('required')}
          <p>An address is required.</p>
        {/if}
      </p>
      <p>
        <label for="address2">Address 2</label>
        <input
          name="address2"
          autocomplete="address-line2"
          type="text"
          bind:value={resource.address.address2} />
      </p>
      <p>
        <label for="city">City</label>
        <input
          name="city"
          autocomplete="address-level2"
          type="text"
          bind:value={resource.address.city} />
        {#if $resourceForm.city.errors.includes('required')}
          <p>A city is required.</p>
        {/if}
      </p>
      <p>
        <label for="state">State</label>
        <input
          name="state"
          autocomplete="address-level1"
          type="text"
          bind:value={resource.address.state} />
        {#if $resourceForm.state.errors.includes('required')}
          <p>A state is required.</p>
        {/if}
      </p>
      <p>
        <label for="zip">ZIP</label>
        <input
          name="zip"
          autocomplete="postal-code"
          type="text"
          bind:value={resource.address.zip} />
        {#if $resourceForm.zip.errors.includes('required')}
          <p>A ZIP is required.</p>
        {/if}
      </p>
    </fieldset>
    <p>
      <ScheduleInput bind:value={resource.schedule} />
    </p>
    <p>
      <CloseScheduleInput bind:value={resource.closeSchedule} />
    </p>
    <p>
      <ServicesInput bind:value={resource.services} />
    </p>
    <p>
      <label for="latitude">Latitude</label>
      <input name="latitude" type="latitude" bind:value={resource.latitude} />
      {#if $resourceForm.latitude.errors.length}
        <p>Invalid Latitude.</p>
      {/if}
      <label for="longitude">Longitude</label>
      <input
        name="longitude"
        type="longitude"
        bind:value={resource.longitude} />
      {#if $resourceForm.longitude.errors.length}
        <p>Invalid Longitude.</p>
      {/if}
    </p>
    <p>
      <label for="website">Website</label>
      <input name="website" type="url" bind:value={resource.website} />
      {#if $resourceForm.website.errors.includes('url')}
        <p>Enter a valid URL.</p>
      {/if}
    </p>
    <p>
      <SubcategoryInput bind:value={resource.subcategories} {subcategories} />
    </p>
    <p>
      <button
        type="button"
        preventDefault
        on:click={() => handleSaveClick(resource)}
        disabled={!$resourceForm.valid}>
        Save Draft
      </button>
    </p>
    <p>
      {#if isSaving}Saving...{/if}
      {#if saveError}{saveError.message}{/if}
    </p>
  </form>
</div>
