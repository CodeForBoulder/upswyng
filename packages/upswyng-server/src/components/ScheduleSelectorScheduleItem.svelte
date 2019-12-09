<script>
  import { createEventDispatcher } from "svelte";

  export let item; // TScheduleItem
  export let showDeleteAction = false;

  let isAttemptingDelete = false;

  const dispatch = createEventDispatcher();
</script>

<div class="card content">
  <header class="card-header">
    <div class="card-header-title">
      {item.recurrenceRule
        .toText()
        .charAt(0)
        .toUpperCase() + item.recurrenceRule.toText().slice(1)} from {item.fromTime.label}
      to {item.toTime.label}
    </div>
    {#if showDeleteAction}
      <div class="card-header-icon">
        <button
          aria-label="delete"
          class="button is-danger"
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
      </div>
    {/if}
  </header>
  <div class="card-content">
    {#if item.comment}
      {item.comment}
    {:else}
      <span class="is-italic has-text-grey is-size-6">&lt;No Comment&gt;</span>
    {/if}
  </div>
</div>
