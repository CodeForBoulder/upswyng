<script>
  import { format } from "json-string-formatter";
  export let resourceIssue; // TResourceIssue

  let isResolvingIssue = false;
  let resolveError = "";

  function changeIssue(resolved) {
    resolveError = "";
    isResolvingIssue = true;

    fetch(
      `/api/resource/issues/${resolved ? "resolve" : "unresolve"}/${
        resourceIssue._id
      }`,
      {
        method: "POST",
      }
    )
      .then(async res => {
        if (res.status >= 400) {
          const { message } = await res.json();
          throw new Error(
            message ||
              `There was an error ${
                resolved ? "resolving" : "reopening"
              } the issue (${res.status}).`
          );
        }
        resourceIssue.resolved = resolved;
      })
      .catch(e => (resolveError = e.message))
      .finally(() => (isResolvingIssue = false));
  }

  function resolveIssue() {
    changeIssue(true);
  }

  function reopenIssue() {
    changeIssue(false);
  }
</script>

<div class="box">
  <article class="media">
    <div class="media-left">
      <div class="is-48x48">
        {#if resourceIssue.resolved}
          <span class="icon has-text-success">
            <i class="fas fa-2x fa-check" />
          </span>
        {:else if resourceIssue.severity === 'low'}
          <span class="icon has-text-info">
            <i class="fas fa-2x fa-info-circle" />
          </span>
        {:else if resourceIssue.severity === 'medium'}
          <span class="icon has-text-warning">
            <i class="fas fa-2x fa-exclamation-triangle" />
          </span>
        {:else}
          <span class="icon has-text-danger">
            <i class="fas fa-2x fa-exclamation-triangle" />
          </span>
        {/if}
      </div>
    </div>
    <div class="media-content">
      <div class="content">
        <p
          class="is-capitalized is-size-5"
          class:has-text-success={resourceIssue.resolved}>
          <strong>{resourceIssue.kind.replace(/_/g, ' ')}</strong>
          {#if resourceIssue.resolved}
            <span>(resolved)</span>
          {/if}
        </p>
      </div>
      <div class="content">
        {#if resourceIssue.kind === 'legacy_schedule_parsing_error'}
          <article class="message">
            <div class="message-body">
              This Resource was imported from Strappd, but we could not
              automatically convert its schedule into the UpSwyng format.
              Manually modify the schedule to match the legacy data, and then
              resolve the issue.
            </div>
          </article>
          {#if resourceIssue.detail.legacySchedule !== '""'}
            <p class="has-size-7 has-text-weight-bold">Legacy Schedule</p>
            <p class="is-family-code">
              {format(resourceIssue.detail.legacySchedule)}
            </p>
          {/if}
          {#if resourceIssue.detail.legacyClosesSchedule !== '""'}
            <p class="has-size-7 has-text-weight-bold">Legacy Close Schedule</p>
            <p class="is-family-code">
              {format(resourceIssue.detail.legacyClosesSchedule)}
            </p>
          {/if}
        {/if}
        {#if resolveError}
          <div class="notification is-danger">{resolveError}</div>
        {/if}
      </div>
      <nav class="level is-mobile">
        <div class="level-left" />
        <div class="level-right">
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                {#if !resourceIssue.resolved}
                  <button
                    class="button"
                    class:is-loading={isResolvingIssue}
                    on:click|preventDefault={() => resolveIssue()}>
                    Resolve Issue
                  </button>
                {:else}
                  <button
                    class="button"
                    class:is-loading={isResolvingIssue}
                    on:click|preventDefault={() => reopenIssue()}>
                    Reopen Issue
                  </button>
                {/if}
              </p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </article>
</div>
