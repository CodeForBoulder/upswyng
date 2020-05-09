<script context="module">
  export async function preload({ params, query }, { user }) {
    if (!user || !user.isAdmin) {
      this.error(401, "You must be an admin to access this page.");
    }
  }
</script>

<script>
  import EventLogs from "./../../components/EventLogs.svelte";
</script>

<svelte:head>
  <title>UpSwyng: Event Logs</title>
</svelte:head>

<section class="section">
  <div class="container">
    <h1 class="title">
      Event Logs
      <span class="tag is-dark">Admin</span>
    </h1>
    <EventLogs />
  </div>
</section>
