<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`api/resource/${params.id}`);
    const data = await res.json();
    if (res.status === 200) {
      return { resource: data.resource };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { form as svelteForm } from "svelte-forms";
  import CloseScheduleInput from "../../components/CloseScheduleInput.svelte";
  import ScheduleInput from "../../components/ScheduleInput.svelte";
  import ServicesInput from "../../components/ServicesInput.svelte";

  export let resource;

  function extractErrors(form) {
    return Object.entries(form).reduce((result, [k, v]) => {
      if (typeof v === "object" && Object.keys(v).includes("errors")) {
        result = { ...result, [k]: v.errors };
      }
      return result;
    }, {});
  }

  const resourceForm = svelteForm(() => ({
    name: { value: resource.name, validators: ["required", "min:6"] },
    // address
    address1: {
      value: resource.address.address1 || "",
      validators: ["required"]
    },
    address2: { value: resource.address.address2 || "" },
    city: { value: resource.address.city, validators: ["required"] },
    state: { value: resource.address.state, validators: ["required"] },
    zip: { value: resource.address.zip, validators: ["required"] },
    //
    latitude: {
      value: resource.latitude || 40.01,
      validators: ["between:-90:90"]
    },
    longitude: {
      value: resource.longitude || -105.27,
      validators: ["between:-180:180"]
    },
    closeSchedule: { value: resource.closeSchedule || [], validators: [] },
    phone: { value: resource.phone || "", validators: ["required", "min:10"] },
    schedule: { value: resource.schedule || ["min:1"] },
    services: { value: resource.services || [], validators: [] },
    website: { value: resource.website || "", validators: ["required", "url"] }
  }));
</script>

<svelte:head>
  <title>Upswyng: {resource.name}</title>
</svelte:head>

<section>
  <p>{JSON.stringify($resourceForm, null, 2)}</p>
</section>

<h1>{resource.name}</h1>
<div class="content">
  <p>ID: {resource.id}</p>
  <p>Legacy ID: {resource.legacyId}</p>
  <p>Kudos: {resource.kudos}</p>
  <p>Created At: {resource.createdAt}</p>
  <p>Last Modified At: {resource.lastModifiedAt}</p>
</div>

<div class="content" />

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
  </p>
  <p>
    <label for="phone">Phone</label>
    <input
      name="phone"
      autocomplete="tel"
      type="text"
      bind:value={resource.phone} />
  </p>
  <fieldset>
    <p>
      <label for="address1">Address 1</label>
      <input
        name="address1"
        autocomplete="address-line1"
        type="text"
        bind:value={resource.address.address1} />
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
    </p>
    <p>
      <label for="state">State</label>
      <input
        name="state"
        autocomplete="address-level1"
        type="text"
        bind:value={resource.address.state} />
    </p>
    <p>
      <label for="zip">ZIP</label>
      <input
        name="zip"
        autocomplete="postal-code"
        type="text"
        bind:value={resource.address.zip} />
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

    <label for="longitude">Longitude</label>
    <input name="longitude" type="longitude" bind:value={resource.longitude} />
  </p>
  <p>
    <label for="website">Website</label>
    <input name="website" type="url" bind:value={resource.website} />
  </p>
  <p>
    <span>{JSON.stringify(extractErrors($resourceForm), null, 2)}</span>
    <button disabled={!$resourceForm.valid}>Login</button>
  </p>
</form>
