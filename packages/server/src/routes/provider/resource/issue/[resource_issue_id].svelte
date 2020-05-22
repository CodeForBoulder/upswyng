<script context="module">
  import { ResourceSchedule } from "@upswyng/common";

  export async function preload({ params, query }, { user }) {
    if (!user || !user.isAdmin) {
      this.error(401, "You must be an admin to access this page.");
    }

    let resource;

    const response = await this.fetch(
      `/api/resource/issue/${params.resource_issue_id}`,
      { credentials: "same-origin" }
    );

    if (response.status !== 200) {
      const { message } = await response.json();
      this.error(response.status, message);
    } else {
      let resourceIssue;
      try {
        const d = await response.json();
        resourceIssue = d.resourceIssue;
        const resourceId = resourceIssue.resourceId;

        const resourceResponse = await this.fetch(
          `/api/resource/${resourceId}`,
          { credentials: "same-origin" }
        );

        if (resourceResponse.status === 200) {
          const data = await resourceResponse.json();
          resource = data.resource;
        }
      } catch (e) {
        console.error(
          `Error fetching Resource for Resource Issue ${params.resource_issue_id}`
        );
      }

      return { resource, resourceIssue };
    }
  }
</script>

<script>
  import { goto, stores } from "@sapper/app";
  import ResourceDiff from "./../../../../components/ResourceDiff.svelte";
  import ResourceDisplay from "./../../../../components/ResourceDisplay.svelte";
  import ResourceIssueNotification from "./../../../../components/ResourceIssueNotification.svelte";

  const { session } = stores();

  export let resource; // TResource?
  export let resourceIssue; // TResourceIssue
</script>

<svelte:head>
  <title>
    UpSwyng: Resource Issue{`${resource ? ` for ${resource.name}` : ''}}`}
  </title>
</svelte:head>

<section class="section">
  {#if resource}
    <h1 class="title">
      {resource.name}
      <span class="tag is-dark">Admin</span>
    </h1>
    <p class="content has-text-weight-semibold">
      <a href={`/provider/resource/${resource.resourceId}`} rel="prefetch">
        {resource.resourceId}
      </a>
    </p>
  {:else}
    <div class="notification is-warning">
      <p>No Service Provider found for Issue</p>
    </div>
  {/if}
  <ResourceIssueNotification {resourceIssue} />
</section>
