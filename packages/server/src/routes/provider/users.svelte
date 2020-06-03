<script context="module">
  import { ResourceSchedule } from "@upswyng/common";

  function usersToActions(users) {
    return users.reduce((result, user) => {
      result[user._id] = {
        isRunningAction: false,
        isDropdownExpanded: false,
      };
      return result;
    }, {});
  }
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
      const { estimatedTotal, users } = await usersResponse.json();
      return {
        actions: usersToActions(users),
        estimatedTotal,
        currentUser: user,
        users,
      };
    }
  }
</script>

<script>
  export let actions = {}; // Record<string (user _id), { isRunningAction: boolean, isDropdownExpanded: boolean}>
  export let currentUser; // TUser; the logged in user viewing the page
  export let estimatedTotal; // number (estimated total number of users)
  export let users; // TUser[]

  let errorMessage = "";
  let isLoading = false;
  let isSuperAdmin = !!currentUser.isSuperAdmin; // boolean (is the logged in user viewing the page a super admin)
  let limit = 20; // change limit in `preload` function if changing this
  let paginationStep = 1; // the pagination step the user is on
  let paginationStepsToShow = { left: [], middle: [], right: [] };
  let totalPaginationSteps = 1;

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

  function setUserToRunningAction(userId) {
    actions = {
      ...actions,
      [userId]: { ...actions[userId], isRunningAction: true },
    };
  }

  function setUserToNotRunningAction(userId) {
    actions = {
      ...actions,
      [userId]: { ...actions[userId], isRunningAction: false },
    };
  }

  function makeToggleDropdownForUserFunction(userId) {
    return () => {
      const allClosedActions = Object.entries(actions).reduce(
        (result, [k, v]) => {
          result[k] = { ...v, isDropdownExpanded: false };
          return result;
        },
        {}
      );
      actions = {
        ...allClosedActions,
        [userId]: {
          ...allClosedActions[userId],
          isDropdownExpanded: !actions[userId]["isDropdownExpanded"],
        },
      };
    };
  }

  async function makeAdmin(userId) {
    await modifyUser(
      userId,
      JSON.stringify({
        isAdmin: true,
        isSuperAdmin: false,
      }),
      "Error adding admin to user"
    );
  }

  async function removeAdmin(userId) {
    await modifyUser(
      userId,
      JSON.stringify({
        isAdmin: false,
        isSuperAdmin: false,
      }),
      "Error removing admin from user"
    );
  }

  async function removeSuperAdmin(userId) {
    await modifyUser(
      userId,
      JSON.stringify({
        isAdmin: true,
        isSuperAdmin: false,
      }),
      "Error removing super admin from user"
    );
  }

  async function makeSuperAdmin(userId) {
    await modifyUser(
      userId,
      JSON.stringify({
        isAdmin: true,
        isSuperAdmin: true,
      }),
      "Error adding super admin to user"
    );
  }

  async function modifyUser(userId, body, errorMessage) {
    setUserToRunningAction(userId);
    actions = {
      ...actions,
      [userId]: { ...actions[userId], isDropdownExpanded: false },
    };
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { user, message } = await response.json();
      if (response.status !== 200) {
        throw new Error(message || errorMessage);
      }
      // swap the `user` in `users` for the updated user
      const i = users.findIndex(u => u._id === user._id);
      if (i < 0) {
        throw new Error(`Could not find user`);
      }
      users.splice(i, 1, user);
      users = users;
    } catch (e) {
      errorMessage = e.message;
    } finally {
      setUserToNotRunningAction(userId);
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
      actions = { ...actions, ...usersToActions(newUsers) };
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

  .user-explaination p:not(:last-child) {
    margin-bottom: 1.25em;
  }
</style>

<svelte:head>
  <title>UpSwyng: Users</title>
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

    <div class="user-explaination is-size-6 box">
      <p>
        Users who have
        <span class="tag is-dark">Admin</span>
        permissions can approve changes to service providers and create alerts.
      </p>
      <p>
        Users who have
        <span class="tag is-primary">Super Admin</span>
        permissions can manage other users by modifying their permissions.
      </p>
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
          <th>
            <!-- actions -->
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
              {#if user.providers.includes('slack')}
                <span class="icon">
                  <i class="fab fa-lg fa-slack" />
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
            <td>
              {#if isSuperAdmin && currentUser._id !== user._id}
                <div
                  class="dropdown is-right"
                  class:is-active={actions[user._id]['isDropdownExpanded']}>
                  <div class="dropdown-trigger">
                    <button
                      class="button"
                      class:is-loading={actions[user._id]['isRunningAction']}
                      aria-haspopup="true"
                      aria-controls="dropdown-menu"
                      on:click={makeToggleDropdownForUserFunction(user._id)}>
                      <span class="icon is-small">
                        <i class="fas fa-angle-down" aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      {#if user.isAdmin}
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <a
                          class="dropdown-item"
                          on:click|preventDefault={async () => removeAdmin(user._id)}>
                          Remove Admin
                        </a>
                      {/if}
                      {#if !user.isAdmin}
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <a
                          class="dropdown-item"
                          on:click|preventDefault={async () => makeAdmin(user._id)}>
                          Make Admin
                        </a>
                      {/if}
                      {#if !user.isSuperAdmin}
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <a
                          class="dropdown-item"
                          on:click|preventDefault={async () => makeSuperAdmin(user._id)}>
                          Make Super Admin
                        </a>
                      {/if}
                      {#if user.isSuperAdmin}
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <a
                          class="dropdown-item"
                          on:click|preventDefault={async () => removeSuperAdmin(user._id)}>
                          Remove Super Admin
                        </a>
                      {/if}
                    </div>
                  </div>
                </div>
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
