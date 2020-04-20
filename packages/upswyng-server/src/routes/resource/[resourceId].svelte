<script context="module">
  import { ResourceSchedule } from "@upswyng/upswyng-core";

  export async function preload({ params, query }, { user }) {
    const resourceResponse = await this.fetch(
      `/api/resource/${params.resourceId}`
    );
    const { resource, message } = await resourceResponse.json();
    if (resourceResponse.status !== 200) {
      this.error(resourceResponse.status, message);
      return;
    }
    resource.schedule = ResourceSchedule.parse(resource.schedule);

    const subcategoryResponse = await this.fetch(`/api/subcategories`);
    const { subcategories } = await subcategoryResponse.json();

    if (subcategoryResponse.status !== 200) {
      this.error(subcategoryResponse.status, subcategories.message);
    } else {
      return {
        resource,
        subcategories,
        isLoggedIn: !!user,
        isAdmin: !!user.isAdmin,
      };
    }
  }
</script>

<script>
  import { addFlashMessage } from "../../utility/flashMessage.ts";
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  import * as animateScroll from "svelte-scrollto";
  import EventLogs from "../../components/EventLogs.svelte";
  import ResourceDisplay from "../../components/ResourceDisplay.svelte";
  import ResourceEditor from "../../components/ResourceEditor.svelte";
  import ResourceIssueNotification from "../../components/ResourceIssueNotification.svelte";

  const { session } = stores();

  export let resource; // TResource
  export let subcategories; // TSubcategory[], all subcategories in the app
  export let isLoggedIn; // boolean
  export let isAdmin; // boolean

  let issues /* TResourceIssue[] | null */ = null;
  let isLoadingIssues = false;
  let isSaving = false;
  let saveError = null; // Error | null

  function scrollToIssues() {
    animateScroll.scrollTo({
      element: "#issues",
      duration: 1000,
    });
  }

  function handleSaveClick(resource) {
    saveError = null;
    isSaving = true;

    const options = {
      method: "POST",
      body: JSON.stringify({ draftResource: resource }),
      headers: {
        "Content-Type": "application/json",
      },
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
          addFlashMessage(
            session,
            "success",
            res.draftResource.name
              ? `A draft update of ${res.draftResource.name} was created`
              : "A draft update was created"
          );
          goto("/resource");
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

  function loadIssues() {
    isLoadingIssues = true;
    fetch(`/api/resource/issues/${resource.resourceId}?include_resolved=true`)
      .then(async response => {
        const { resourceIssues } = await response.json();
        if (response.status !== 200 || !resourceIssues) {
          // TODO (rhinodavid): surface this somehow
          console.error(response.status);
        } else {
          issues = resourceIssues;
        }
      })
      .finally(() => {
        isLoadingIssues = false;
        issues = issues;
      });
  }

  onMount(() => resource.resourceId && isAdmin && loadIssues());
</script>

<style>
  .found-issues {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .notification-text {
    flex: 1;
  }
</style>

<svelte:head>
  <title>Upswyng: {resource.name}</title>
</svelte:head>
<section class="section">
  <div class="container">
    {#if isLoggedIn}
      {#if isLoadingIssues}
        <div class="notification">
          <div class="content">
            <span class="has-text-weight-medium">
              Checking for issues with {resource.name}
            </span>
          </div>
          <progress class="progress is-small" max="100" />
        </div>
      {:else if issues && issues.some(i => !i.resolved)}
        <div class="notification is-warning found-issues">
          <div class="notification-text">
            <span class="has-text-weight-medium">
              Found issues with Resource
            </span>
          </div>
          <div>
            <button
              class="button"
              on:click|preventDefault={() => scrollToIssues()}>
              <span>View</span>
              <span class="icon">
                <i class="fas fa-arrow-circle-down" />
              </span>
            </button>
          </div>
        </div>
      {/if}

      <h1 class="title">
        {#if resource.name}{resource.name}{:else}Create A Resource{/if}
      </h1>
      <ResourceEditor
        {resource}
        {subcategories}
        {isSaving}
        errorText={saveError ? saveError.message : ''}
        on:clearErrorText={() => (saveError = null)}
        on:dispatchSaveResource={e => handleSaveClick(e.detail)} />
      {#if isAdmin && issues && issues.length}
        <h1 id="issues" class="title">
          Issues
          <span class="tag is-dark">Admin</span>
        </h1>
        {#each issues as issue (issue._id)}
          <ResourceIssueNotification resourceIssue={issue} />
        {/each}
      {/if}
    {:else}
      <ResourceDisplay {resource} />
      <div class="notification">Log in to make changes to this resource</div>
    {/if}

    {#if isAdmin}
      <h1 class="title">
        Event Logs
        <span class="tag is-dark">Admin</span>
      </h1>
      <EventLogs resourceId={resource.resourceId} />
    {/if}

  </div>
</section>
