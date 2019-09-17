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
  import ScheduleInput from "../../components/ScheduleInput.svelte";
  import CloseScheduleInput from "../../components/CloseScheduleInput.svelte";

  export let resource;

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
    closeSchedule: { value: resource.closeSchedule || [], validators: [] },
    phone: { value: resource.phone || "", validators: ["required", "min:10"] },
    schedule: { value: resource.schedule || ["min:1"] },
    website: { value: resource.website || "" }
  }));
</script>

<svelte:head>
  <title>Upswyng: {resource.name}</title>
</svelte:head>

<section>
  <p>{JSON.stringify(resource, null, 2)}</p>
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
    <input name="name" type="text" bind:value={resource.name} />
    <label for="name">Resource Name</label>
    {#if $resourceForm.name.errors.includes('required')}
      <p>The name is required</p>
    {/if}

    {#if $resourceForm.name.errors.includes('min')}
      <p>The name should be at least 6 characters</p>
    {/if}
  </p>
  <p>
    <textarea
      name="description"
      type="text"
      bind:value={resource.description} />
    <label for="description">Description</label>
  </p>
  <p>
    <input
      name="phone"
      autocomplete="tel"
      type="text"
      bind:value={resource.phone} />
    <label for="phone">Phone</label>
  </p>
  <fieldset>
    <p>
      <input
        name="address1"
        autocomplete="address-line1"
        type="text"
        bind:value={resource.address.address1} />
      <label for="address1">Address 1</label>
    </p>
    <p>
      <input
        name="address2"
        autocomplete="address-line2"
        type="text"
        bind:value={resource.address.address2} />
      <label for="address2">Address 2</label>
    </p>
    <p>
      <input
        name="city"
        autocomplete="address-level2"
        type="text"
        bind:value={resource.address.city} />
      <label for="city">City</label>
    </p>
    <p>
      <input
        name="state"
        autocomplete="address-level1"
        type="text"
        bind:value={resource.address.state} />
      <label for="state">State</label>
    </p>
    <p>
      <input
        name="zip"
        autocomplete="postal-code"
        type="text"
        bind:value={resource.address.zip} />
      <label for="zip">ZIP</label>
    </p>
  </fieldset>
  <p>
    <ScheduleInput bind:value={resource.schedule} />
  </p>
  <p>
    <CloseScheduleInput bind:value={resource.closeSchedule} />
  </p>
  <p>
    <input name="website" type="url" bind:value={resource.website} />
    <label for="website">Website</label>
  </p>
  <p>
    <button disabled={!$resourceForm.valid}>Login</button>
  </p>
</form>
