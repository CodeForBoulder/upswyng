<script>
  import { createEventDispatcher } from "svelte";
  import { form as svelteForm } from "svelte-forms";
  import CloseScheduleInput from "./CloseScheduleInput.svelte";
  import ScheduleInput from "./ScheduleInput.svelte";
  import ServicesInput from "./ServicesInput.svelte";
  import SubcategoryInput from "./SubcategoryInput.svelte";

  export let resource; // TResource | TNewResource
  export let subcategories; // TSubcategory[], all subcategories in the app
  export let saveButtonLabel = "Save Draft";
  export let disableSave = false; // disables the save button
  export let isSaving = false;
  export let errorText = ""; // an error message to show, for instance, if the save operation has failed

  let saveError /* Error? */ = null;

  function extractErrors(form) {
    return Object.entries(form).reduce((result, [k, v]) => {
      if (typeof v === "object" && Object.keys(v).includes("errors")) {
        result = { ...result, [k]: v.errors };
      }
      return result;
    }, {});
  }

  const dispatchSaveResource /* ("saveResource", resource: TResource) => void */ = createEventDispatcher();
  // note: these could just use the same created dispatcher but some day I would like to type them
  const dispatchClearErrorText /* ("clearErrorText") => void */ = createEventDispatcher();

  const resourceForm = svelteForm(() => ({
    // address
    address1: {
      value: resource.address.address1 || "",
      validators: ["required"]
    },
    address2: { value: resource.address.address2 || "", validators: [] },
    city: { value: resource.address.city || "", validators: ["required"] },
    state: { value: resource.address.state || "", validators: ["required"] },
    zip: { value: resource.address.zip || "", validators: ["required"] },
    //
    deleted: { value: resource.deleted || false, validators: [] },
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
    name: { value: resource.name || "", validators: ["required", "min:6"] },
    phone: { value: resource.phone || "", validators: ["required", "min:3"] }, // ex: 911
    schedule: { value: resource.schedule || [] },
    services: { value: resource.services || [], validators: [] },
    website: { value: resource.website || "", validators: ["url"] }
  }));
</script>

<h1 class="title">
  {#if resource.name}{resource.name}{:else}Create A Resource{/if}
</h1>
{#each resource.subcategories || [] as subcategory}
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
  <div class:box={resource.deleted} class:has-ribbon={resource.deleted}>
    {#if resource.deleted}
      <div class="ribbon is-danger">Trashed</div>
    {/if}
    {#if resource.id}
      <p>
        <span class="label">ID</span>
        {resource.id}
      </p>
    {/if}
    {#if resource.legacyId}
      <p>
        <span class="label">Legacy ID</span>
        {resource.legacyId}
      </p>
    {/if}
    {#if resource.kudos}
      <p>
        <span class="label">Kudos</span>
        {resource.kudos}
      </p>
    {/if}
    {#if resource.createdAt}
      <p>
        <span class="label">Created At</span>
        {resource.createdAt}
      </p>
    {/if}
    {#if resource.lastModifiedAt}
      <p>
        <span class="label">Last Modified At</span>
        {resource.lastModifiedAt.toLocaleString('en-US')}
      </p>
    {/if}
  </div>
  <form>
    <div class="field">
      <label class="label" for="name">Resource Name</label>
      <div class="control has-icons-right">
        <input
          class="input"
          class:is-danger={$resourceForm.name.errors.length}
          type="text"
          placeholder="Resource Name"
          bind:value={resource.name} />
        {#if $resourceForm.name.errors.length}
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle" />
          </span>
        {/if}
      </div>
      {#if $resourceForm.name.errors.includes('required')}
        <p class="help is-danger">The name is required</p>
      {/if}

      {#if $resourceForm.name.errors.includes('min')}
        <p class="help is-danger">The name should be at least 6 characters</p>
      {/if}
    </div>

    <div class="field">
      <div class="control">
        <input
          id="trash"
          type="checkbox"
          name="trash"
          class="switch is-danger"
          bind:checked={resource.deleted} />
        <label class="label" for="trash">Trash Resource</label>
      </div>
      <p class="has-text-weight-light">
        Trashed resources won't show up anywhere in the app, but will remain
        available in the admin control and can be restored later.
      </p>
    </div>

    <div class="field">
      <label class="label" for="description">Description</label>
      <div class="control">
        <textarea
          name="description"
          class="textarea"
          class:is-danger={$resourceForm.description.errors.length}
          bind:value={resource.description}
          placeholder="Description" />
      </div>
      {#if $resourceForm.description.errors.includes('min')}
        <p class="help is-danger">
          The description should be at least 12 characters
        </p>
      {/if}
    </div>

    <div class="field">
      <label class="label" for="phone">Phone</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          class:is-danger={$resourceForm.phone.errors.includes('min')}
          autocomplete="tel"
          type="text"
          placeholder="Phone input"
          bind:value={resource.phone} />
        <span class="icon is-small is-left">
          <i class="fas fa-phone" />
        </span>
        {#if $resourceForm.phone.errors}
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle" />
          </span>
        {/if}
      </div>
      {#if $resourceForm.phone.errors}
        <p class="help is-danger">A phone number is required</p>
      {/if}
    </div>

    <div class="field">
      <label class="label">Address</label>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label" for="address1">Address 1</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-right">
              <input
                class="input"
                class:is-danger={$resourceForm.address1.errors.length}
                autocomplete="address-line1"
                type="text"
                placeholder="Address 1"
                bind:value={resource.address.address1} />
              {#if $resourceForm.address1.errors.length}
                <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle" />
                </span>
              {/if}
            </div>
            {#if $resourceForm.address1.errors.includes('required')}
              <p class="help is-danger">An address is required</p>
            {/if}
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label" for="address2">Address 2</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                class="input"
                autocomplete="address-line1"
                type="text"
                placeholder="Address 2"
                bind:value={resource.address.address2} />
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label" for="city">City</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-right">
              <input
                class="input"
                class:is-danger={$resourceForm.city.errors.length}
                autocomplete="address-line1"
                type="text"
                placeholder="City"
                bind:value={resource.address.city} />
              {#if $resourceForm.city.errors.length}
                <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle" />
                </span>
              {/if}
            </div>
            {#if $resourceForm.city.errors.includes('required')}
              <p class="help is-danger">An address is required</p>
            {/if}
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label" for="state">State</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-right">
              <input
                class="input"
                class:is-danger={$resourceForm.state.errors.length}
                autocomplete="address-line1"
                type="text"
                placeholder="State"
                bind:value={resource.address.state} />
              {#if $resourceForm.state.errors.length}
                <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle" />
                </span>
              {/if}
            </div>
            {#if $resourceForm.state.errors.includes('required')}
              <p class="help is-danger">A state is required</p>
            {/if}
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label" for="zip">ZIP</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-right">
              <input
                class="input"
                class:is-danger={$resourceForm.zip.errors.length}
                autocomplete="address-line1"
                type="text"
                placeholder="Address 1"
                bind:value={resource.address.zip} />
              {#if $resourceForm.zip.errors.length}
                <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle" />
                </span>
              {/if}
            </div>
            {#if $resourceForm.zip.errors.includes('required')}
              <p class="help is-danger">A ZIP code is required</p>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label" for="services">Services</label>
      <div class="control">
        <ServicesInput bind:value={resource.services} />
      </div>
    </div>

    <div class="field">
      <label class="label" for="website">Website</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          class:is-danger={$resourceForm.website.errors.length}
          autocomplete="tel"
          type="text"
          placeholder="Website"
          bind:value={resource.website} />
        <span class="icon is-small is-left">
          <i class="fas fa-wifi" />
        </span>
        {#if $resourceForm.website.errors.length}
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle" />
          </span>
        {/if}
      </div>
      {#if $resourceForm.website.errors.includes('url')}
        <p class="help is-danger">Please enter a valid web address</p>
      {/if}
    </div>

    <p>
      <ScheduleInput bind:value={resource.schedule} />
    </p>
    <p>
      <CloseScheduleInput bind:value={resource.closeSchedule} />
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
      <SubcategoryInput bind:value={resource.subcategories} {subcategories} />
    </p>
    <div class="buttons is-right">
      <button
        type="button"
        class="button is-success"
        class:is-loading={isSaving}
        preventDefault
        on:click={() => dispatchSaveResource('dispatchSaveResource', resource)}
        disabled={!$resourceForm.valid}>
        <span class="icon is-small">
          <i class="fas fa-check" />
        </span>
        <span>{saveButtonLabel}</span>
      </button>
    </div>
    {#if errorText}
      <div class="content">
        <div class="notification is-danger">
          <button
            class="delete"
            on:click={() => dispatchClearErrorText('clearErrorText')} />
          {errorText}
        </div>
      </div>
    {/if}
  </form>
</div>
