<script>
  import AlertTimeline from "../../components/AlertTimeline.svelte";
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  import { readFlashMessages } from "../../utility/flashMessage.ts";

  const { session } = stores();
  const flashMessages = readFlashMessages(session);

  let mounted = false;

  onMount(() => (mounted = true));
</script>

<svelte:head>
  <title>Upswyng: Alerts</title>
</svelte:head>

<section class="section">
  <div class="container">
    <h1 class="title">
      Alerts
      <span class="tag is-dark">Admin</span>
    </h1>

    {#each flashMessages as flashMessage}
      <div
        class="notification"
        class:is-success={flashMessage.type === 'success'}
        class:is-danger={flashMessage.type === 'error'}>
        {flashMessage.message}
      </div>
    {/each}

    <div class="content">
      <a href="/alert/create" class="button is-large">
        <span class="icon is-large">
          <i class="fas fa-plus" />
        </span>
        <span>Schedule an Alert</span>
      </a>
    </div>

    {#if mounted}
      <AlertTimeline />
    {/if}
  </div>
</section>
