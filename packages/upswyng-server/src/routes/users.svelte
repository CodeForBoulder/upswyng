<script context="module">
  import { ResourceSchedule } from "@upswyng/upswyng-core";

  export async function preload({ params, query }, { user }) {
    if (!user || !user.isAdmin) {
      this.error(401, "You must be an admin to access this page.");
    }
    let usersResponse;
    try {
      usersResponse = await this.fetch(`/api/users`, {
        method: "POST",
        body: JSON.stringify({
          limit: 20,
          offset: 0,
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

    if (usersResponse.status !== 200) {
      const { message } = await usersResponse.json();
      this.error(usersResponse.status, message || "Unknown Error");
    } else {
      const { users, estimatedTotal } = await usersResponse.json();
      return { users, estimatedTotal };
    }
  }
</script>

<script>
  export let users; // TUser[]
  export let estimatedTotal; // number (estimated total number of users)

  let limit = 20; // change limit in `preload` function if changing this
  let paginationStep = 1; // the pagination step the user is on
  let totalPaginationSteps = 1;
  let isLoading = false;
  let errorMessage = "";
  let paginationStepsToShow = { left: [], middle: [], right: [] };

  $: offset = (paginationStep - 1) * limit;
  $: {
    totalPaginationSteps = Math.ceil(estimatedTotal / limit);
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

  async function fetchUsers(limit, offset) {
    errorMessage = "";
    isLoading = true;
    let response;
    try {
      response = await fetch(`/api/users`, {
        method: "POST",
        body: JSON.stringify({
          limit,
          offset,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { users: newUsers, message } = await response.json();
      if (response.status !== 200) {
        throw new Error(message || "Error getting Users");
      }
      users = newUsers;
    } catch (e) {
      errorMessage = e.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<style>
  .loading-count-container {
    align-items: center;
    display: flex;
    height: 1.5em;
    margin-top: -1em;
  }
</style>

<svelte:head>
  <title>Upswyng: Users</title>
</svelte:head>

<section class="section">
  <div class="container">
    <h1 class="title">
      Users
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

    <div class="loading-count-container">
      {#if isLoading}
        <progress class="progress is-small is-primary" max="100" />
      {/if}
    </div>

    <table class="table is-fullwidth is-striped">
      <!-- icon | resource name | type | created -->
      <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Providers</th>
          <th>
            <!-- admin/superadmin-->
          </th>
        </tr>
      </thead>
      <tbody>
        {#each users as user (user._id)}
          <tr>
            <td>{user.email}</td>
            <td>{user.name || ''}</td>
            <td>
              {#if user.providers.includes('facebook')}
                <span class="icon">
                  <i class="fab fa-lg fa-facebook-f" />
                </span>
              {/if}
              {#if user.providers.includes('google')}
                <span class="icon">
                  <i class="fab fa-lg fa-google" />
                </span>
              {/if}
            </td>
            <td>
              {#if user.isAdmin}
                <span class="tag is-dark">Admin</span>
              {/if}
              {#if user.isSuperAdmin}
                <span class="tag is-primary">Super Admin</span>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

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
  </div>
</section>
