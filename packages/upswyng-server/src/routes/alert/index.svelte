<script>
  import { stores } from "@sapper/app";
  import { readFlashMessages } from "../../utility/flashMessage.ts";

  const { session } = stores();
  const flashMessages = readFlashMessages(session);
</script>

<svelte:head>
  <title>Upswyng: Alerts</title>
</svelte:head>

<section class="section">
  {#each flashMessages as flashMessage}
    <div
      class="notification"
      class:is-success={flashMessage.type === 'success'}
      class:is-danger={flashMessage.type === 'error'}>
      {flashMessage.message}
    </div>
  {/each}
  <div class="container">
    <h1 class="title">
      Alerts
      <span class="tag is-dark">Admin</span>
    </h1>
  </div>
</section>
