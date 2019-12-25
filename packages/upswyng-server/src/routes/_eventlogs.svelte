<script context="module">
  export async function preload({ params, query }, { user }) {
    if (!user || !user.isAdmin) {
      this.error(401, "You must be an admin to access this page.");
    }
  }
</script>

<script>
  // import EventLogItem from "../components/EventLogItem.svelte";

  let limit = 20;
  let offset = 0;
  let offsetStep = 5;
  let errorMessage = "";
  let eventLogs = [];
  let isLoading = false;

  async function fetchEventLogs(limit, offset) {
    errorMessage = "";
    isLoading = true;
    let response;
    try {
      response = await fetch(`/api/eventlogs`, {
        method: "POST",
        body: JSON.stringify({
          limit,
          offset,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const {
        eventLogs: newEventLogs,
        count: newCount,
        message,
      } = await response.json();
      if (response.status !== 200) {
        throw new Error(message || "Error getting Resource Issues");
      }
      console.log(newEventLogs);
      eventLogs = newEventLogs;
      count = newCount;
    } catch (e) {
      errorMessage = e.message;
    } finally {
      isLoading = false;
    }
  }

  fetchEventLogs(limit, offset);
</script>

<svelte:head>
  <title>UpSwyng: Event Logs</title>
</svelte:head>

<section class="section">
  <div class="container">
    <h1 class="title">Event Logs</h1>
    <div class="timeline">
      {#each eventLogs as eventLog}
        <!-- <EventLogItem {eventLog} /> -->
        <p>fuxx</p>
      {/each}
    </div>
  </div>
</section>
