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
  import ResourceBreadcrumbs from "../../components/ResourceBreadcrumbs.svelte";
  import ResourceDisplay from "../../components/ResourceDisplay.svelte";
  import ResourceEditor from "../../components/ResourceEditor.svelte";
  import ResourceIssueNotification from "../../components/ResourceIssueNotification.svelte";

  const { session } = stores();

  export let resource; // TResource
  export let subcategories; // TSubcategory[], all subcategories in the app
  export let isLoggedIn; // boolean
  export let isAdmin; // boolean

  let issues /* TResourceIssue[] | null */ = null;
  let unresolvedIssues = null;
  let isLoadingIssues = false;
  let isSaving = false;
  let saveError = null; // Error | null

  let selectedTabView = "edit";
  let focusedTabView = "edit";
  let tabs = [];
  let editTab;
  let issuesTab;
  let logsTab;

  function handleTabClick(view) {
    focusedTabView = view;
    selectedTabView = view;
  }

  function handleTabKeydown(e) {
    const focusedTabIndex = tabs.findIndex(tab => focusedTabView === tab.view);
    let focusTabIndex;

    switch (event.key) {
      case "ArrowLeft": {
        focusTabIndex =
          focusedTabIndex === 0 ? tabs.length - 1 : focusedTabIndex - 1;
        break;
      }
      case "ArrowRight": {
        focusTabIndex =
          focusedTabIndex === tabs.length - 1 ? 0 : focusedTabIndex + 1;
      }
    }

    focusedTabView = tabs[focusTabIndex].view;
    tabs[focusTabIndex].element.focus();
  }

  function scrollToIssues() {
    animateScroll.scrollTo({
      element: "#issues-tab-button",
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
          unresolvedIssues = issues.filter(i => !i.resolved);
        }
      })
      .finally(() => {
        isLoadingIssues = false;
        issues = issues;
      });
  }

  onMount(() => {
    tabs = [
      {
        view: "edit",
        element: editTab,
      },
      {
        view: "issues",
        element: issuesTab,
      },
      {
        view: "logs",
        element: logsTab,
      },
    ];
    resource.resourceId && isAdmin && loadIssues();
  });
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
              Issues have been reported for this resource.
            </span>
          </div>
          <div>
            <button
              class="button"
              on:click|preventDefault={() => {
                selectedTabView = 'issues';
                scrollToIssues();
              }}>
              <span>View</span>
              <span class="icon">
                <i class="fas fa-arrow-circle-down" />
              </span>
            </button>
          </div>
        </div>
      {/if}
      <h1 class="title">{resource.name}</h1>
      <ResourceBreadcrumbs {resource} />
      <div class="buttons has-addons" role="tablist">
        <button
          aria-selected={selectedTabView === 'edit'}
          aria-controls="editor-tab"
          bind:this={editTab}
          class={`button is-medium ${selectedTabView === 'edit' ? 'is-primary' : ''}`}
          id="editor-tab-button"
          on:click|preventDefault={() => handleTabClick('edit')}
          on:keydown={handleTabKeydown}
          role="tab"
          tabindex={selectedTabView === 'edit' ? 0 : -1}>
          <span class="icon is-small">
            <span class="fas fa-edit" aria-hidden="true" />
          </span>
          <span>Edit Provider Info</span>
        </button>
        {#if isLoggedIn && isAdmin}
          <button
            aria-selected={selectedTabView === 'issues'}
            aria-controls="issues-tab"
            bind:this={issuesTab}
            class={`button is-medium ${selectedTabView === 'issues' ? 'is-primary' : ''}`}
            id="issues-tab-button"
            on:click|preventDefault={() => handleTabClick('issues')}
            on:keydown={handleTabKeydown}
            role="tab"
            tabindex={selectedTabView === 'issues' ? 0 : -1}>
            <span class="icon is-small">
              <span class="fas fa-exclamation-triangle" aria-hidden="true" />
            </span>
            <span
              class={`has-badge-rounded has-badge-${unresolvedIssues && unresolvedIssues.length ? 'danger' : 'success'}`}
              data-badge={unresolvedIssues && unresolvedIssues.length}>
              Reported Issues
            </span>
          </button>
          <button
            aria-selected={selectedTabView === 'logs'}
            aria-controls="logs-tab"
            bind:this={logsTab}
            class={`button is-medium ${selectedTabView === 'logs' ? 'is-primary' : ''}`}
            on:click|preventDefault={() => handleTabClick('logs')}
            on:keydown={handleTabKeydown}
            role="tab"
            tabindex={selectedTabView === 'logs' ? 0 : -1}>
            <span class="icon is-small">
              <span class="fas fa-history" aria-hidden="true" />
            </span>
            <span>Event Logs</span>
          </button>
        {/if}
      </div>
      {#if selectedTabView === 'edit'}
        <div id="editor-tab" tabindex="0" aria-labelledby="editor-tab-button">
          <ResourceEditor
            {resource}
            {subcategories}
            {isSaving}
            errorText={saveError ? saveError.message : ''}
            on:clearErrorText={() => (saveError = null)}
            on:dispatchSaveResource={e => handleSaveClick(e.detail)} />
        </div>
      {/if}
      {#if selectedTabView === 'issues' && isAdmin && issues && issues.length}
        <div id="issues-tab" tabindex="0" aria-labelledby="issues-heading">
          <h1 id="issues-heading" class="title">
            Issues
            <span class="tag is-dark">Admin</span>
          </h1>
          {#each issues as issue (issue._id)}
            <ResourceIssueNotification resourceIssue={issue} />
          {/each}
        </div>
      {/if}
    {:else}
      <ResourceDisplay {resource} />
      <div class="notification">Log in to make changes to this resource</div>
    {/if}

    {#if selectedTabView === 'logs' && isAdmin}
      <div id="logs-tab" tabindex="0" aria-labelledby="logs-heading">
        <h1 class="title" id="logs-heading">
          Event Logs
          <span class="tag is-dark">Admin</span>
        </h1>
        <EventLogs resourceId={resource.resourceId} />
      </div>
    {/if}

  </div>
</section>
