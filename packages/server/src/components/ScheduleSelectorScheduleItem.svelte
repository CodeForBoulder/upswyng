<script>
  import { createEventDispatcher } from "svelte";

  export let item; // TScheduleItem
  export let showDeleteAction = false;

  let isAttemptingDelete = false;

  const dispatch = createEventDispatcher();
</script>

<style>
  li {
    margin-bottom: 0.75em;
  }

  .comment {
    margin-left: 4em;
  }

  .schedule-header {
    align-items: center;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
  }

  .schedule-header button {
    margin-right: 1em;
  }
</style>

<li>
  <header class="schedule-header">
    <div class="has-text-weight-medium is-size-6">
      {item.recurrenceRule
        .toText()
        .charAt(0)
        .toUpperCase() + item.recurrenceRule.toText().slice(1)} from {item.fromTime.label}
      to {item.toTime.label}
    </div>
    <div>
      {#if showDeleteAction}
        <button
          aria-label="delete"
          class="button is-danger is-small"
          class:is-outlined={!isAttemptingDelete}
          on:click|preventDefault={() => {
            if (!isAttemptingDelete) {
              isAttemptingDelete = true;
            } else {
              dispatch('delete', item);
            }
          }}>
          <span class="icon">
            <i class="fas fa-trash" aria-hidden="true" />
          </span>
          {#if isAttemptingDelete}
            <span>Confirm Delete</span>
          {/if}
        </button>
      {/if}
    </div>
  </header>
  <div class="comment is-size-6 has-text-grey">
    {#if item.comment}{item.comment}{/if}
  </div>
</li>
