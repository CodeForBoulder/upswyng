<script context="module">
  export async function preload({}, { user }) {
    if (!user || !user.isAdmin) {
      this.error(401, "You must be an admin to access this page.");
    }
  }

  /**
   * Converts a Javascript Date to a MM/DD/YYYY string
   * https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
   */
  function formatDateToDay(d) {
    const dtf = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(
      d
    );
    return `${mo}/${da}/${ye}`;
  }
</script>

<script>
  import Alert from "./../../../components/Alert.svelte";
  import AlertTimeline from "./../../../components/AlertTimeline.svelte";
  import { onMount } from "svelte";
  import { stores, goto } from "@sapper/app";
  import { readFlashMessages } from "./../../../utility/flashMessage.ts";

  const { session, preloading, page } = stores();
  const flashMessages = readFlashMessages(session);

  let id = $page.query.id || null; // string (ObjectID) or `null`

  const MS_IN_DAY = 1000 * 60 * 60 * 24;
  let mounted = false;
  const now = new Date();
  let startDay = formatDateToDay(new Date(now.getTime() - 2 * MS_IN_DAY)); // string | null; MM/DD/YYYY
  let endDay = formatDateToDay(new Date(now.getTime() + 5 * MS_IN_DAY));
  let start; // Date
  let end; // Date

  let isProcessingCancel = false;
  let cancelError = "";

  let isProcessingApprove = false;
  let approveError = "";

  onMount(() => (mounted = true));

  let alerts = null; // TAlertFull[] | null, the alerts for the selected time frame
  let isLoadingAlerts = false;
  let loadingAlertsError = "";
  let selectedAlertPromise; // promise which resolves to the selected alert (TAlertFull)

  $: {
    if (id && alerts) {
      // pull the alert with the selected ID out of our list of alerts
      const filteredAlerts = alerts.filter(a => a._id === id);
      if (filteredAlerts.length) {
        selectedAlertPromise = Promise.resolve(filteredAlerts[0]);
      } else {
        selectedAlertPromise = fetchAlert(id);
      }
    } else if (id) {
      selectedAlertPromise = fetchAlert(id);
    }
  }

  $: {
    const start = new Date(startDay);
    start.setHours(0);
    start.setMinutes(0);

    const end = new Date(endDay);
    end.setHours(23);
    end.setMinutes(59);

    !$preloading &&
      fetchAlerts(start, end)
        .then(a => (alerts = a))
        .catch(e => (loadingAlertsError = e.message));
  }

  async function fetchAlert(id) /*: Promise<TAlertFull> */ {
    let response = await fetch(`/api/alert/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { alert, message } = await response.json();
    if (response.status !== 200) {
      throw new Error(message || `Error getting alert with ID ${id}`);
    }
    return alert;
  }

  async function fetchAlerts(start, end) /*: Promise<TAlertFull[]> */ {
    let response = await fetch(`/api/alert/search`, {
      method: "POST",
      body: JSON.stringify({
        includeCancelled: true,
        includeUnapproved: true,
        start,
        end,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { alerts, message } = await response.json();
    if (response.status !== 200) {
      throw new Error(message || "Error getting alerts");
    }
    return alerts;
  }

  function handleAlertClick(alertId) {
    if (alertId === id) return;
    cancelError = "";
    id = alertId;
    history &&
      history.pushState(`Upswyng: Alert`, {}, `/provider/alert?id=${alertId}`);
  }

  async function approveAlert(
    alert
  ) /* Promise<TAlertFull> the updated alert post-approve*/ {
    if (alert.isApproveled) {
      throw new Error("Attempted to approve alert that was already approved");
    }
    const response = await fetch(`/api/alert`, {
      method: "POST",
      body: JSON.stringify({
        ...alert,
        isApproved: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { alert: updatedAlert, message } = await response.json();
    if (response.status !== 200) {
      throw new Error(message || "Error approving alert");
    }
    return updatedAlert;
  }

  async function cancelAlert(
    alert
  ) /* Promise<TAlertFull> the updated alert post-cancel*/ {
    if (alert.isCancelled) {
      throw new Error("Attempted to cancel alert that was already cancelled");
    }
    const response = await fetch(`/api/alert`, {
      method: "POST",
      body: JSON.stringify({
        ...alert,
        isCancelled: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { alert: updatedAlert, message } = await response.json();
    if (response.status !== 200) {
      throw new Error(message || "Error cancelling alert");
    }
    return updatedAlert;
  }
</script>

<svelte:head>
  <title>UpSwyng: Alerts</title>
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
      <a href="/provider/alert/create" class="button is-large">
        <span class="icon is-large">
          <i class="fas fa-plus" />
        </span>
        <span>Schedule an Alert</span>
      </a>
    </div>

    {#if mounted && !$preloading && Array.isArray(alerts)}
      <AlertTimeline
        {alerts}
        bind:startDay
        bind:endDay
        selectedAlertId={id}
        bind:errorMessage={loadingAlertsError}
        on:click={({ detail: { id } }) => handleAlertClick(id)} />
    {/if}
    {#if cancelError}
      <div class="notification is-danger">{cancelError}</div>
    {/if}
    {#if approveError}
      <div class="notification is-danger">{approveError}</div>
    {/if}
    {#if selectedAlertPromise}
      {#await selectedAlertPromise}
        <progress class="progress is-small is-primary" max="100" />
      {:then selectedAlert}
        <Alert
          alert={selectedAlert}
          {isProcessingCancel}
          {isProcessingApprove}
          on:approveAlert={async ({ detail: { alert } }) => {
            isProcessingApprove = true;
            approveError = '';
            try {
              const updatedAlert = await approveAlert(alert);
              alerts = alerts.map(a => {
                if (a._id === updatedAlert._id) {
                  return updatedAlert;
                }
                return a;
              });
              const selectedAlert = await selectedAlertPromise;
              if (selectedAlert._id === updatedAlert._id) {
                selectedAlertPromise = Promise.resolve(updatedAlert);
              }
            } catch (e) {
              approveError = e.message;
            } finally {
              isProcessingApprove = false;
            }
          }}
          on:cancelAlert={async ({ detail: { alert } }) => {
            isProcessingCancel = true;
            cancelError = '';
            try {
              const updatedAlert = await cancelAlert(alert);
              alerts = alerts.map(a => {
                if (a._id === updatedAlert._id) {
                  return updatedAlert;
                }
                return a;
              });
              const selectedAlert = await selectedAlertPromise;
              if (selectedAlert._id === updatedAlert._id) {
                selectedAlertPromise = Promise.resolve(updatedAlert);
              }
            } catch (e) {
              cancelError = e.message;
            } finally {
              isProcessingCancel = false;
            }
          }} />
      {:catch error}
        <div class="notification is-danger">{error.message}</div>
      {/await}
    {/if}
  </div>
</section>
