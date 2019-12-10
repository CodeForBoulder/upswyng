<script>
  import { format } from "json-string-formatter";
  export let resourceIssue; // TResourceIssue
</script>

<div class="box">
  <article class="media">
    <div class="media-left">
      <div class="is-48x48">
        {#if resourceIssue.severity === 'low'}
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
        <p class="is-capitalized">
          <strong>{resourceIssue.kind.replace(/_/g, ' ')}</strong>
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
      </div>
      <nav class="level is-mobile">
        <div class="level-right">
          <div class="level-item" />
        </div>
      </nav>
    </div>
  </article>
</div>
