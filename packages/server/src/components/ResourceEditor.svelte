<script>
  import { createEventDispatcher } from "svelte";
  import { form as svelteForm } from "svelte-forms";
  import { ResourceSchedule } from "@upswyng/common";
  import ScheduleSelector from "./ScheduleSelector.svelte";
  import ServicesInput from "./ServicesInput.svelte";
  import SubcategoryInput from "./SubcategoryInput.svelte";
  import LocationInput from "./LocationInput.svelte";

  export let errorText = ""; // an error message to show, for instance, if the save operation has failed
  export let isSaving = false;
  export let resource; // TResource | TNewResource
  export let saveButtonLabel = "Save Draft";
  export let subcategories; // TSubcategory[], all subcategories in the app

  let saveError /* Error? */ = null;

  function formatDate(d /* Date */) /* string */ {
    return d.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

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
      validators: ["required"],
    },
    address2: { value: resource.address.address2 || "", validators: [] },
    city: { value: resource.address.city || "", validators: ["required"] },
    state: { value: resource.address.state || "", validators: ["required"] },
    zip: { value: resource.address.zip || "", validators: ["required"] },
    //
    deleted: { value: resource.deleted || false, validators: [] },
    description: { value: resource.description || "", validators: ["min:12"] },
    name: { value: resource.name || "", validators: ["required", "min:3"] },
    phone: { value: resource.phone || "", validators: ["required", "min:3"] }, // ex: 911
    schedule: {
      value: resource.schedule,
      validators: ["required"],
    },
    services: { value: resource.services || [], validators: [] },
    streetViewImage: {
      value: resource.streetViewImage || "",
      validators: ["url"],
    },
    website: { value: resource.website || "", validators: ["url"] },
  }));
</script>

<div class="content">
  <div class="box" class:has-ribbon={resource.deleted}>
    {#if resource.deleted}
      <div class="ribbon is-danger">Trashed</div>
    {/if}
    {#if resource.resourceId}
      <p>
        <span class="label">Service Provider ID</span>
        <span class="is-family-code">{resource.resourceId}</span>
      </p>
    {/if}
    {#if resource._id}
      <p>
        <span class="label">
          Record ID (
          <span class="is-family-code">_id</span>
          )
        </span>
        <span class="is-family-code">{resource._id}</span>
      </p>
    {/if}
    {#if resource.legacyId}
      <p>
        <span class="label">Legacy ID</span>
        <span class="is-family-code">{resource.legacyId}</span>
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
        {formatDate(new Date(resource.createdAt))}
      </p>
    {/if}
    {#if resource.lastModifiedAt}
      <p>
        <span class="label">Last Modified At</span>
        {formatDate(new Date(resource.lastModifiedAt))}
      </p>
    {/if}
  </div>
  <form>
    <div class="field">
      <label class="label" for="name">Service Provider Name</label>
      <div class="control has-icons-right">
        <input
          class="input"
          class:is-danger={$resourceForm.name.errors.length}
          type="text"
          placeholder="Service Provider Name"
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
        <p class="help is-danger">The name should be at least 3 characters</p>
      {/if}
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
          class:is-danger={$resourceForm.phone.errors.length}
          autocomplete="tel"
          type="text"
          placeholder="Phone input"
          bind:value={resource.phone} />
        <span class="icon is-small is-left">
          <i class="fas fa-phone" />
        </span>
        {#if $resourceForm.phone.errors.length}
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle" />
          </span>
        {/if}
      </div>
      {#if $resourceForm.phone.errors.length}
        <p class="help is-danger">A phone number is required</p>
      {/if}
    </div>

    <div class="field">
      <label class="label">Address</label>
      <LocationInput
        resourceForm={resourceForm} 
        bind:resource={resource} />


    <div class="field">
      <label class="label" for="streetViewImage">Street View Image URL</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          class:is-danger={$resourceForm.streetViewImage.errors.length}
          type="text"
          placeholder="Street View Image URL"
          bind:value={resource.streetViewImage} />
        <span class="icon is-small is-left">
          <i class="fas fa-wifi" />
        </span>
        {#if $resourceForm.streetViewImage.errors.length}
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle" />
          </span>
        {/if}
      </div>
      {#if $resourceForm.streetViewImage.errors.includes('url')}
        <p class="help is-danger">Please enter a valid image URL.</p>
      {/if}
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

    <div class="field">
      <label class="label" for="services">Services</label>
      <div class="control">
        <ServicesInput bind:value={resource.services} />
      </div>
    </div>

    <ScheduleSelector bind:value={resource.schedule} />

    <SubcategoryInput bind:value={resource.subcategories} {subcategories} />
    <div class="field">
      <div class="control">
        <input
          id="trash"
          type="checkbox"
          name="trash"
          class="switch is-danger"
          bind:checked={resource.deleted} />
        <label class="label" for="trash">Trash Service Provider</label>
      </div>
      <p class="has-text-weight-light">
        Trashed service providers won't show up anywhere in the app, but will
        remain available in the admin control and can be restored later.
      </p>
    </div>
    <div class="buttons is-right">
      <button
        type="button"
        class="button is-success"
        class:is-loading={isSaving}
        preventDefault
        on:click={() => dispatchSaveResource('dispatchSaveResource', resource)}
        disabled={!$resourceForm.valid}>
        <span class="icon">
          <i class="fas fa-check is-small" />
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
