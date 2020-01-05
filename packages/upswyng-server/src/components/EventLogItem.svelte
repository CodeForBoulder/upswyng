<script>
  import { onMount } from "svelte";
  import ResourceDiff from "./ResourceDiff.svelte";

  let timeAgo;

  export let eventLog; // TEventLog

  let isExpanded = false;

  function toggleExpanded() {
    isExpanded = !isExpanded;
  }

  onMount(async () => {
    const javascriptTimeAgoModule = await import("javascript-time-ago");
    const { default: en } = await import("javascript-time-ago/locale/en");
    const TimeAgo = javascriptTimeAgoModule.default;
    TimeAgo.addLocale(en);
    timeAgo = new TimeAgo("en-US");
  });
</script>

<style>
  .more-less-selector {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  .more-less-selector a {
    cursor: pointer;
    text-decoration: none;
  }

  .more-less-selector a span.icon {
    position: relative;
    top: 0.2em;
    left: 0.075em;
  }
</style>

<div class="timeline-item">
  {#if eventLog.detail.kind === 'draft_approved'}
    <div class="timeline-marker is-icon">
      <i class="fa fa-thumbs-up" />
    </div>
    <div class="timeline-content">
      <p class="heading">
        {#if timeAgo}{timeAgo.format(new Date(eventLog.createdAt))}{/if}
      </p>
      <p>
        <span class="has-text-weight-medium">
          {`${eventLog.actor.name ? eventLog.actor.name : eventLog.actor.email}`}
        </span>
        <span class="has-text-weight-semibold">approved a draft</span>
        to {`${eventLog.detail.newResource ? 'create' : 'update'}`}
        <strong>
          <a href={`/resource/${eventLog.detail.resourceId}`} rel="prefetch">
            {eventLog.detail.resourceName}
          </a>
        </strong>
      </p>

      {#if !eventLog.detail.newResource}
        {#if isExpanded}
          <header class="more-less-selector">
            <!-- svelte-ignore a11y-missing-attribute -->
            <a
              on:click|preventDefault={toggleExpanded}
              class="has-text-grey is-uppercase is-size-7 has-text-weight-bold">
              <span>Hide Changes</span>
              <!-- svelte-ignore a11y-missing-attribute -->
              <span class="icon is-small">
                <i class="fas fa-chevron-up" aria-hidden="true" />
              </span>
            </a>
          </header>
        {:else}
          <header class="more-less-selector">
            <!-- svelte-ignore a11y-missing-attribute -->
            <a
              on:click|preventDefault={toggleExpanded}
              class="has-text-grey is-uppercase is-size-7 has-text-weight-bold">
              <span>Show Changes</span>
              <!-- svelte-ignore a11y-missing-attribute -->
              <span class="icon is-small">
                <i class="fas fa-chevron-down" aria-hidden="true" />
              </span>
            </a>
          </header>
        {/if}
        {#if isExpanded}
          <ResourceDiff
            leftResource={eventLog.detail.diff.left}
            rightResource={eventLog.detail.diff.right} />
        {/if}
      {/if}
    </div>
  {:else if eventLog.detail.kind === 'draft_created'}
    <div class="timeline-marker is-icon">
      <i class="fas fa-asterisk" />
    </div>
    <div class="timeline-content">
      <p class="heading">
        {#if timeAgo}{timeAgo.format(new Date(eventLog.createdAt))}{/if}
      </p>
      <p>
        <span class="has-text-weight-medium">
          {`${eventLog.actor.name ? eventLog.actor.name : eventLog.actor.email}`}
        </span>
        <span class="has-text-weight-semibold">
          wrote a
          <a href={`/resource/draft/${eventLog.detail.draftId}`} rel="prefetch">
            draft
          </a>
        </span>
        to {`${eventLog.detail.newResource ? 'create' : 'update'}`}
        <strong>{eventLog.detail.resourceName}</strong>
      </p>
    </div>
  {:else if eventLog.detail.kind === 'draft_deleted'}
    <div class="timeline-marker is-icon">
      <i class="fa fa-trash-alt" />
    </div>
    <div class="timeline-content">
      <p class="heading">
        {#if timeAgo}{timeAgo.format(new Date(eventLog.createdAt))}{/if}
      </p>
      <p>
        <span class="has-text-weight-medium">
          {`${eventLog.actor.name ? eventLog.actor.name : eventLog.actor.email}`}
        </span>
        <span class="has-text-weight-semibold">deleted a draft</span>
        of
        <strong>
          <a href={`/resource/${eventLog.detail.resourceId}`} rel="prefetch">
            {eventLog.detail.resourceName}
          </a>
        </strong>
      </p>
    </div>
  {:else if eventLog.detail.kind === 'resource_issue_reopened'}
    <div class="timeline-marker is-icon">
      <i class="far fa-frown-open" />
    </div>
    <div class="timeline-content">
      <p class="heading">
        {#if timeAgo}{timeAgo.format(new Date(eventLog.createdAt))}{/if}
      </p>
      <p>
        <span class="has-text-weight-medium">
          {`${eventLog.actor.name ? eventLog.actor.name : eventLog.actor.email}`}
        </span>
        <span class="has-text-weight-semibold">reopened</span>
        a
        <a
          class="is-capitalized has-text-weight-bold"
          href={`/resource/issue/${eventLog.detail.resourceIssueId}`}
          rel="prefetch">
          {eventLog.detail.resourceIssueKind.replace(/_/g, ' ')} issue
        </a>
        for
        <strong>
          <a href={`/resource/${eventLog.detail.resourceId}`} rel="prefetch">
            {eventLog.detail.resourceName}
          </a>
        </strong>
      </p>
    </div>
  {:else if eventLog.detail.kind === 'resource_issue_resolved'}
    <div class="timeline-marker is-icon">
      <i class="fa fa-clipboard-check" />
    </div>
    <div class="timeline-content">
      <p class="heading">
        {#if timeAgo}{timeAgo.format(new Date(eventLog.createdAt))}{/if}
      </p>
      <p>
        <span class="has-text-weight-medium">
          {`${eventLog.actor.name ? eventLog.actor.name : eventLog.actor.email}`}
        </span>
        <span class="has-text-weight-semibold">resolved</span>
        a
        <a
          class="is-capitalized has-text-weight-bold"
          href={`/resource/issue/${eventLog.detail.resourceIssueId}`}
          rel="prefetch">
          {eventLog.detail.resourceIssueKind.replace(/_/g, ' ')} issue
        </a>
        for
        <strong>
          <a href={`/resource/${eventLog.detail.resourceId}`} rel="prefetch">
            {eventLog.detail.resourceName}
          </a>
        </strong>
      </p>
    </div>
  {:else}
    <div class="notification is-danger">
      Can not render Event Log item ({eventLog.kind})
    </div>
  {/if}
</div>
