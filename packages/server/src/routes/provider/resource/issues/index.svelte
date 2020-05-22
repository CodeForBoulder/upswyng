<script context="module">
  import { ResourceSchedule } from "@upswyng/common";

  export async function preload({ params, query }, { user }) {
    if (!user || !user.isAdmin) {
      this.error(401, "You must be an admin to access this page.");
    }

    const resourceIdToNameMap = new Map();
    let resourceIssuesResponse;
    try {
      resourceIssuesResponse = await this.fetch(`/api/resources/issues`, {
        method: "POST",
        body: JSON.stringify({
          limit: 20,
          offset: 0,
          includeResolved: false,
          minimumSeverity: "low",
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      this.error(500, e.message);
      return;
    }

    if (resourceIssuesResponse.status !== 200) {
      const { message } = await resourceIssuesResponse.json();
      this.error(resourceIssuesResponse.status, message || "Unknown Error");
    } else {
      const {
        resourceIssues,
        count,
        estimatedTotal,
      } = await resourceIssuesResponse.json();
      return await Promise.all(
        // dedupe keys to keep from making many network requests/database fetches
        Object.keys(
          resourceIssues
            .map(i => i.resourceId)
            .reduce((result, id) => ({ ...result, [id]: null }), {})
        ).map(async resourceId => {
          const resourceName = await this.fetch(`/api/resource/${resourceId}`)
            .then(response => {
              if (response.status !== 200) {
                throw new Error();
              }
              return response.json();
            })
            .then(({ resource }) => resource.name)
            .catch(e => {
              console.error(e.message);
              return "<not found>";
            });
          return [resourceId, resourceName];
        })
      ).then(idNamePairs => {
        idNamePairs.forEach(([resourceId, resourceName]) =>
          resourceIdToNameMap.set(resourceId, resourceName)
        );
        return {
          resourceIssues,
          count,
          estimatedTotal,
          resourceIdToNameMap,
        };
      });
    }
  }
</script>

<script>
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  import en from "javascript-time-ago/locale/en";
  import ResourceIssueNotification from "./../../../../components/ResourceIssueNotification.svelte";
  import TimeAgo from "javascript-time-ago";

  const { preloading } = stores();

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  export let resourceIssues; // TResourceIssue[]
  export let estimatedTotal; // number (estimated total number of issues)
  export let count; // number of issues that match the query (ignores limit)
  export let resourceIdToNameMap; // Map of resource id (string) to resource name

  let limit = 20; // change limit in `preload` function if changing this
  let paginationStep = 1; // the pagination step the user is on
  let totalPaginationSteps = 1;
  let minimumSeverity = "low"; // "low" | "medium" | "high"; needs to match `preload`
  let includeResolved = false;
  let isLoading = false;
  let errorMessage = "";
  let paginationStepsToShow = { left: [], middle: [], right: [] };

  $: offset = (paginationStep - 1) * limit;
  $: {
    totalPaginationSteps = Math.ceil(count / limit);
    paginationStep = Math.max(
      Math.min(paginationStep, totalPaginationSteps),
      1
    );
  }
  $: {
    if (totalPaginationSteps <= 5) {
      paginationStepsToShow = {
        left: [1, 2, 3, 4, 5].slice(0, totalPaginationSteps),
        middle: [],
        right: [],
      };
    } else {
      if (paginationStep <= 3) {
        paginationStepsToShow = {
          left: [1, 2, 3, 4].slice(0, paginationStep + 1),
          middle: [],
          right: [totalPaginationSteps],
        };
      } else if (paginationStep >= totalPaginationSteps - 2) {
        paginationStepsToShow = {
          left: [1],
          middle: [],
          right: [
            totalPaginationSteps - 3,
            totalPaginationSteps - 2,
            totalPaginationSteps - 1,
            totalPaginationSteps,
          ].slice(Math.min(paginationStep - totalPaginationSteps - 2)),
        };
      } else {
        paginationStepsToShow = {
          left: [1],
          middle: [paginationStep - 1, paginationStep, paginationStep + 1],
          right: [totalPaginationSteps],
        };
      }
    }
  }

  async function getResourceTitleForId(resourceId) /* Promise<string> */ {
    if (resourceIdToNameMap.has(resourceId)) {
      return resourceIdToNameMap.get(resourceId);
    }

    const resourceName = await fetch(`/api/resource/${resourceId}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error();
        }
        return response.json();
      })
      .then(({ resource }) => resource.name)
      .catch(_ => "<not found>");
    resourceIdToNameMap.set(resourceId, resourceName);
    return resourceName;
  }

  async function fetchIssues(limit, offset, includeResolved, minimumSeverity) {
    errorMessage = "";
    isLoading = true;
    let response;
    try {
      response = await fetch(`/api/resources/issues`, {
        method: "POST",
        body: JSON.stringify({
          limit,
          offset,
          includeResolved,
          minimumSeverity,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const {
        resourceIssues: newResourceIssues,
        count: newCount,
        message,
      } = await response.json();
      if (response.status !== 200) {
        throw new Error(message || "Error getting Resource Issues");
      }
      resourceIssues = newResourceIssues;
      count = newCount;
    } catch (e) {
      errorMessage = e.message;
    } finally {
      isLoading = false;
    }
  }

  $: {
    $preloading === false &&
      fetchIssues(limit, offset, includeResolved, minimumSeverity);
  }
</script>

<style>
  .spinner {
    animation-duration: 0.75s;
    animation-iteration-count: infinite;
    animation-name: spin;
    animation-timing-function: linear;
    display: inline-block;
    transform-origin: 50% 50%;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loading-count-container {
    align-items: center;
    display: flex;
    height: 1.5em;
    margin-top: -1em;
  }
</style>

<svelte:head>
  <title>UpSwyng: Service Provider Issues</title>
</svelte:head>

<section class="section">
  <div class="container">
    <h1 class="title">
      Service Provider Issues
      <span class="tag is-dark">Admin</span>
    </h1>
    {#if errorMessage}
      <div class="notification is-danger">
        <button
          class="delete"
          on:click|preventDefault={() => (errorMessage = '')} />
        {errorMessage}
      </div>
    {/if}
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <input
            bind:checked={includeResolved}
            id="show-resolved-issues"
            type="checkbox"
            name="show-resolved-issues"
            class="switch" />
          <label for="show-resolved-issues">
            <strong>Show Resolved Issues</strong>
          </label>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <label class="label">Minimum Severity</label>
        </div>
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <button
                class="button"
                class:is-primary={minimumSeverity === 'low'}
                on:click|preventDefault={() => (minimumSeverity = 'low')}>
                <span>Low</span>
              </button>
            </p>
            <p class="control">
              <button
                class="button"
                class:is-primary={minimumSeverity === 'medium'}
                on:click|preventDefault={() => (minimumSeverity = 'medium')}>
                <span>Medium</span>
              </button>
            </p>
            <p class="control">
              <button
                class="button"
                class:is-primary={minimumSeverity === 'high'}
                on:click|preventDefault={() => (minimumSeverity = 'high')}>
                <span>High</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="loading-count-container">
      {#if isLoading}
        <progress class="progress is-small is-primary" max="100" />
      {:else}
        <p class="is-size-6 is-italic has-text-grey has-text-weight-medium">
          Matched {count} of {estimatedTotal} issues
        </p>
      {/if}
    </div>

    <table class="table is-fullwidth is-striped">
      <!-- icon | resource name | type | created -->
      <thead>
        <tr>
          <th>
            <!-- severity icon-->
          </th>
          <th>Service Provider</th>
          <th>Type</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {#each resourceIssues as i (i._id)}
          <tr>
            <td>
              {#if i.resolved}
                <span class="icon has-text-success">
                  <i class="fas fa-check" />
                </span>
              {:else if i.severity === 'high'}
                <span class="icon has-text-danger">
                  <i class="fas fa-exclamation-triangle" />
                </span>
              {:else if i.severity === 'medium'}
                <span class="icon has-text-warning">
                  <i class="fas fa-exclamation-triangle" />
                </span>
              {:else}
                <span class="icon has-text-info">
                  <i class="fas fa-info-circle" />
                </span>
              {/if}
            </td>
            <td>
              {#if $preloading === false}
                {#await getResourceTitleForId(i.resourceId)}
                  <div class="is-loading has-text-grey">
                    <i class="fas fa-spinner spinner" />
                  </div>
                {:then title}
                  <a href={`/provider/resource/${i.resourceId}`}>{title}</a>
                {/await}
              {:else}
                <div class="is-loading has-text-grey">
                  <i class="fas fa-spinner spinner" />
                </div>
              {/if}
            </td>
            <td>
              <a href={`/provider/resource/issue/${i._id}`}>
                <span class="is-capitalized">{i.kind.replace(/_/g, ' ')}</span>
              </a>
            </td>
            <td>{timeAgo.format(new Date(i.createdAt))}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    {#if $preloading === false}
      <nav
        class="pagination is-rounded"
        role="navigation"
        aria-label="pagination">
        {#if totalPaginationSteps > 1}
          <!-- svelte-ignore a11y-missing-attribute -->
          <a
            class="pagination-previous"
            on:click|preventDefault={() => {
              paginationStep = Math.max(paginationStep - 1, 1);
            }}>
            Previous
          </a>
          <!-- svelte-ignore a11y-missing-attribute -->
          <a
            class="pagination-next"
            on:click|preventDefault={() => {
              paginationStep = Math.min(paginationStep + 1, totalPaginationSteps);
            }}>
            Next page
          </a>
        {/if}
        <ul class="pagination-list">
          {#each paginationStepsToShow.left as step}
            <li>
              <!-- svelte-ignore a11y-missing-attribute -->
              <a
                class="pagination-link is-current"
                class:is-current={step === paginationStep}
                aria-label={`${step === paginationStep ? 'Page' : 'Goto page '} ${step}`}
                aria-current="{`${step === paginationStep ? 'page' : ''}`}}"
                on:click|preventDefault={() => {
                  if (step !== paginationStep) {
                    paginationStep = step;
                  }
                }}>
                {step.toString()}
              </a>
            </li>
          {/each}
          {#if paginationStepsToShow.middle.length}
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
            {#each paginationStepsToShow.middle as step}
              <li>
                <!-- svelte-ignore a11y-missing-attribute -->
                <a
                  class="pagination-link is-current"
                  class:is-current={step === paginationStep}
                  aria-label={`${step === paginationStep ? 'Page' : 'Goto page '} ${step}`}
                  aria-current="{`${step === paginationStep ? 'page' : ''}`}}"
                  on:click|preventDefault={() => {
                    if (step !== paginationStep) {
                      paginationStep = step;
                    }
                  }}>
                  {step.toString()}
                </a>
              </li>
            {/each}
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
          {:else if paginationStepsToShow.right.length}
            <li>
              <span class="pagination-ellipsis">&hellip;</span>
            </li>
          {/if}
          {#each paginationStepsToShow.right as step}
            <li>
              <!-- svelte-ignore a11y-missing-attribute -->
              ,
              <a
                class="pagination-link is-current"
                class:is-current={step === paginationStep}
                aria-label={`${step === paginationStep ? 'Page' : 'Goto page '} ${step}`}
                aria-current="{`${step === paginationStep ? 'page' : ''}`}}"
                on:click|preventDefault={() => {
                  if (step !== paginationStep) {
                    paginationStep = step;
                  }
                }}>
                {step.toString()}
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    {/if}
  </div>
</section>
