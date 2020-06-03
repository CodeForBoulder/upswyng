<script context="module">
  export async function preload({ params, query }, { user }) {
    if (!user || !user.isAdmin) {
      this.error(401, "You must be an admin to access this page.");
    }
  }
</script>

<script>
  import { addFlashMessage } from "./../../../utility/flashMessage.ts";
  import { goto, stores } from "@sapper/app";
  import { onDestroy, onMount } from "svelte";
  import { ResourceSchedule } from "@upswyng/common";
  import { Time } from "@upswyng/common";
  import DatePicker from "./../../../components/DatePicker.svelte";
  import HsvPicker from "./../../../components/HsvPicker.svelte";
  import insane from "insane"; // html sanitizer
  import marked from "marked";
  import moment from "moment-timezone";
  import ResourceEditor from "./../../../components/ResourceEditor.svelte";
  import rgbHex from "rgb-hex";
  import TimePicker from "./../../../components/TimePicker.svelte";

  const { tz } = moment;
  const { session } = stores();

  const icons = {
    biohazard: "fas fa-biohazard",
    clinic: "fas fa-clinic-medical",
    comment: "fas fa-comment",
    exclamationCircle: "fas fa-exclamation-circle",
    exclamationTriangle: "fas fa-exclamation-triangle",
    fire: "fas fa-fire-alt",
    meteor: "fas fa-meteor",
    pills: "fas fa-pills",
    snowflake: "fas fa-snowflake",
    sun: "fas fa-sun",
    syringe: "fas fa-syringe",
    tent: "fas fa-campground",
    thermometer: "fas fa-thermometer-three-quarters",
    tooth: "fas fa-tooth",
  };

  const alertTypes = {
    Weather: {
      icon: icons.snowflake,
      color: "#76d6ff", // sky blue
    },
  };

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

  function formatDateToTime(d) {
    let result = `${d.getHours()}:${d.getMinutes()}`;
    if (result.charAt(1) === ":") {
      result = "0" + result;
    }
    return result;
  }

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  let nowDate = new Date();
  let now = formatDateToDay(new Date());
  $: now = formatDateToDay(new Date());
  let intervalHandle;
  let timezoneGuess = "";
  let isSubmitting = false;
  let errorMessage = "";

  onMount(() => {
    timezoneGuess = tz.guess();
    intervalHandle = setInterval(() => {
      nowDate = new Date();
    }, 60000);
  });

  onDestroy(() => {
    if (intervalHandle) {
      clearInterval(intervalHandle);
    }
  });

  let isSaving = false;
  let saveError = null; // Error | null

  let alertTitle = "";
  let alertColor = alertTypes.Weather.color;
  let alertIcon = alertTypes.Weather.icon;
  let alertStartNow = true; // true if the alert should start as soon as its made
  let alertStartDay = now; // string | null; MM/DD/YYYY
  let alertStartTime = formatDateToTime(new Date()); // string | null; HH:MM (24 hour time)
  let alertEndDay = null; // string | null; MM/DD/YYYY
  let alertEndTime = null; // string | null; HH:MM (24 hour time)
  let alertType = "Weather"; // keys of `alertTypes` or Custom
  let alertDetailRaw = "";
  let hasAttemptedSubmit = false;
  let alertDetailFormatted = "";
  let tempColor = alertColor;
  let tempIcon = alertIcon;
  $: alertDetailFormatted = insane(marked(alertDetailRaw), {
    ...insane.defaults,
    allowedAttributes: {
      ...insane.defaults.allowedAttributes,
      iframe: [],
    },
  });

  let alertStart = new Date();
  let alertEnd;

  $: {
    if (alertStartNow) {
      alertStart = nowDate;
    } else if (alertStartDay && alertStartTime) {
      const d = new Date(`${alertStartDay} ${alertStartTime}`);
      if (isValidDate(d)) {
        alertStart = d;
      } else {
        alertStart = null;
      }
    } else {
      alertStart = null;
    }
  }

  $: {
    if (alertEndDay && alertEndTime) {
      const d = new Date(`${alertEndDay} ${alertEndTime}`);
      if (isValidDate(d)) {
        alertEnd = d;
      } else {
        alertEnd = null;
      }
    }
  }

  let isIconSelectorOpen = false;
  let isColorSelectorOpen = false;
  let isSubmitDialogOpen = false;
  let isFormValid = false;
  $: {
    isFormValid = validateForm(alertTitle, alertStart, alertEnd);
  }

  function validateForm(alertTitle, alertStart, alertEnd) /* : boolean */ {
    if (!alertTitle.length) return false;
    if (!alertStart || !alertEnd) return false;
    if (alertStart.getTime() > alertEnd.getTime()) return false;
    return true;
  }

  function attemptSubmit() {
    hasAttemptedSubmit = true;

    if (isFormValid) {
      isSubmitDialogOpen = true;
    }
  }

  function publishAlert() {
    if (!isFormValid) {
      throw new Error("Attempted to publish an invalid alert");
    }

    isSubmitting = true;

    fetch(`/api/alert`, {
      method: "POST",
      body: JSON.stringify({
        title: alertTitle,
        category: alertType === "Custom" ? null : alertType,
        color: alertColor,
        detail: alertDetailRaw.length ? alertDetailRaw : null,
        end: alertEnd,
        icon: alertIcon,
        isApproved: true,
        isCancelled: false,
        start: alertStart,
        title: alertTitle,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async res => {
        const { alert, message } = await res.json();
        if (res.status >= 400) {
          if (message) {
            errorMessage = message;
          } else {
            errorMessage = "There was an error creating the alert";
          }
          return;
        }
        addFlashMessage(
          session,
          "success",
          `Alert "${alertTitle}" was successful created`
        );
        goto(`/provider/alert?id=${alert._id}`);
      })
      .catch(e => (errorMessage = e))
      .finally(() => {
        isSubmitting = false;
        isSubmitDialogOpen = false;
      });
  }
</script>

<style>
  .icon-choices {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 0.5em;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .color-picker-container,
  .icon-choices-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :global(.alert-detail-preview ul) {
    list-style-type: disc;
    list-style-position: inside;
  }

  :global(.alert-detail-preview ol) {
    list-style-type: decimal;
    list-style-position: inside;
  }
  :global(.alert-detail-preview ul ul),
  :global(.alert-detail-preview ol ul) {
    list-style-type: circle;
    list-style-position: inside;
    margin-left: 15px;
  }
  :global(.alert-detail-preview ol ol),
  :global(.alert-detail-preview ul ol) {
    list-style-type: lower-latin;
    list-style-position: inside;
    margin-left: 15px;
  }
  :global(.alert-detail-preview h1) {
    display: block;
    font-size: 2em;
    margin-top: 0.67em;
    margin-bottom: 0.67em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }
  :global(.alert-detail-preview h2) {
    display: block;
    font-size: 1.5em;
    margin-top: 0.83em;
    margin-bottom: 0.83em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }
  :global(.alert-detail-preview h3) {
    display: block;
    font-size: 1.17em;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }
  :global(.alert-detail-preview h4) {
    display: block;
    margin-top: 1.33em;
    margin-bottom: 1.33em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }
  :global(.alert-detail-preview h5) {
    display: block;
    font-size: 0.83em;
    margin-top: 1.67em;
    margin-bottom: 1.67em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }
  :global(.alert-detail-preview h6) {
    display: block;
    font-size: 0.67em;
    margin-top: 2.33em;
    margin-bottom: 2.33em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
  }

  .upswyng-icon {
    height: 1.5em;
  }

  .app-mock {
    mask-image: linear-gradient(
      0deg,
      transparent 0%,
      transparent 5%,
      rgba(255, 255, 255, 1) 25%,
      rgba(255, 255, 255, 1) 100%
    );
  }
</style>

<svelte:head>
  <title>UpSwyng: Create an Alert</title>
</svelte:head>

<section class="section">
  <div class="container">
    <h1 class="title">
      Create an Alert
      <span class="tag is-dark">Admin</span>
    </h1>
    {#if errorMessage}
      <div class="notification is-danger">{errorMessage}</div>
    {/if}
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Alert Title"
          bind:value={alertTitle} />
      </div>
      {#if !alertTitle.length && hasAttemptedSubmit}
        <p class="help is-danger">Please enter a title</p>
      {/if}
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Type</label>
          <div class="control" class:has-icons-left={alertType !== 'Custom'}>
            <div class="select">
              <select
                bind:value={alertType}
                on:change|preventDefault={({ target: { value } }) => {
                  if (value !== 'Custom') {
                    alertColor = alertTypes[value].color;
                    alertIcon = alertTypes[value].icon;
                  }
                }}>
                {#each Object.keys(alertTypes) as type}
                  <option value={type}>{type}</option>
                {/each}
                <option value={'Custom'}>Custom</option>
              </select>
            </div>
            {#if alertType !== 'Custom'}
              {#each Object.keys(alertTypes) as type}
                {#if type === alertType}
                  <div class="icon is-left">
                    <i
                      class={alertTypes[type].icon}
                      style={`color:${alertTypes[type].color}`} />
                  </div>
                {/if}
              {/each}
            {/if}
          </div>
        </div>
      </div>

      {#if alertType === 'Custom'}
        <div class="column">
          <div class="field">
            <label class="label">Icon + Color</label>
            <div class="buttons">
              <!-- nasty workaround to make the selected icon actually render -->
              {#each Object.values(icons) as icon}
                {#if alertIcon === icon}
                  <button
                    class="button is-medium"
                    on:click={() => {
                      tempIcon = alertIcon;
                      isIconSelectorOpen = true;
                    }}>
                    <span class="icon is-medium">
                      <i class={`${alertIcon} fa-lg`} />
                    </span>
                  </button>
                {/if}
              {/each}
              <button
                class="button is-medium"
                on:click={() => {
                  isColorSelectorOpen = true;
                }}>
                <span
                  class="icon is-medium"
                  style={`background-color: ${alertColor}`} />
              </button>
            </div>
          </div>
        </div>
      {/if}
    </div>
    <div class="field">
      <label class="label">Schedule</label>
      <div class="control">
        <input
          name="alert-start-now"
          id="alert-start-now"
          type="checkbox"
          class="switch is-success"
          bind:checked={alertStartNow} />
        <label class="label" for="alert-start-now">
          Start alert immediately
        </label>
      </div>
    </div>
    <div class="columns">
      {#if !alertStartNow}
        <div class="column">
          <div class="field">
            <label class="label">Start Date</label>
            <div class="control">
              <DatePicker
                options={{ color: 'success', minDate: now, showClearButton: false, showHeader: false }}
                bind:value={alertStartDay} />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <div class="label">Start Time</div>
            <TimePicker
              bind:value={alertStartTime}
              iconColorClass="has-text-success" />
          </div>
        </div>
      {/if}
    </div>
    <div class="columns">
      <div class="column is-half">
        <div class="field">
          <label class="label">End Date</label>
          <div class="control">
            <DatePicker
              options={{ color: 'danger', minDate: now, showClearButton: false, showHeader: false }}
              bind:value={alertEndDay} />
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="field">
          <div class="label">End Time</div>
          <TimePicker
            bind:value={alertEndTime}
            iconColorClass="has-text-danger" />
        </div>
      </div>
    </div>
    <div class="content">
      {#if alertStart && alertEnd && alertStart.getTime() > alertEnd.getTime()}
        <p class="help is-danger">The alert end is before the start</p>
      {:else if alertStart && alertEnd}
        <p class="help is-success">
          Alert runs for
          <strong class="has-text-success">
            {Time.prettyPrintDuration(Math.round((alertEnd.getTime() - alertStart.getTime()) / (1000 * 60)), false)}
          </strong>
        </p>
      {:else if hasAttemptedSubmit && (!alertStart || !alertEnd)}
        <p class="help is-danger">Select a start and end time for the alert</p>
      {/if}
    </div>
    <div class="field">
      <label class="label">Detail</label>
      <p class="help">
        Formatting with Markdown is supported.
        <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank">
          View cheatsheet.
        </a>
      </p>
      <div class="control">
        <textarea class="textarea" bind:value={alertDetailRaw} />
      </div>
    </div>
    {#if alertDetailRaw.replace('\n', '') !== alertDetailFormatted
        .replace('<p>', '')
        .replace('</p>', '')
        .replace('\n', '')}
      <div class="field">
        <label class="label">Preview</label>
        <div class="notification alert-detail-preview">
          {@html alertDetailFormatted}
        </div>
      </div>
    {/if}
    <div class="buttons is-right content">
      <button
        type="button"
        class="button is-success"
        disabled={hasAttemptedSubmit && !isFormValid}
        preventDefault
        on:click={attemptSubmit}>
        <span class="icon">
          <i class="fas fa-plus is-small" />
        </span>
        <span>Create Alert</span>
      </button>
    </div>
  </div>

  <!-- Icon selector modal -->
  <div class="modal icon-selector-modal" class:is-active={isIconSelectorOpen}>
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Choose Alert Icon</p>
        <button
          class="delete"
          aria-label="close"
          on:click={() => (isIconSelectorOpen = false)} />
      </header>
      <section class="modal-card-body">
        <div class="icon-choiced-container">
          <div class="icon-choices">
            {#each Object.values(icons) as icon}
              <div class="icon-container">
                <button
                  class="button is-large"
                  class:has-background-info={tempIcon === icon}
                  on:click={() => (tempIcon = icon)}>
                  <span class="icon is-large">
                    <i class={`${icon} fa-2x`} />
                  </span>
                </button>
              </div>
            {/each}
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-success"
          on:click={() => {
            alertIcon = tempIcon;
            isIconSelectorOpen = false;
          }}>
          Save changes
        </button>
      </footer>
    </div>
  </div>

  <!-- Color selector modal -->
  <div class="modal icon-selector-modal" class:is-active={isColorSelectorOpen}>
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Choose Alert Color</p>
        <button
          class="delete"
          aria-label="close"
          on:click={() => (isColorSelectorOpen = false)} />
      </header>
      <section class="modal-card-body">
        <div class="color-picker-container">
          <HsvPicker
            on:colorChange={({ detail: { r, g, b } }) => {
              tempColor = `#${rgbHex(r, g, b)}`;
            }}
            startColor={tempColor} />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-success"
          on:click={() => {
            alertColor = tempColor;
            isColorSelectorOpen = false;
          }}>
          Save changes
        </button>
      </footer>
    </div>
  </div>

  <!-- Submit confirm modal -->
  {#if isSubmitDialogOpen}
    <div class="modal submit-confirm-modal is-active">
      <div class="modal-background" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Ready to publish?</p>
          <button
            class="delete"
            aria-label="close"
            on:click={() => (isSubmitDialogOpen = false)} />
        </header>
        <section class="modal-card-body">
          <div class="content">
            <h1 class="is-size-5 has-text-weight-bold">Banner</h1>
            <p class="has-color-grey-darker content">
              This is not an exact preview of what will be shown to the user,
              but you can use it to get some idea of how the alert banner will
              look. The actual appearance will depend on the device of the user.
            </p>
            <article class="message">
              <div
                class="message-header"
                style={`background-color:${alertColor}`}>
                <div class="level is-mobile">
                  <div class="level-left">
                    <p class="icon is-medium has-text-white">
                      <i class={`${alertIcon} fa-lg`} />
                    </p>
                  </div>
                  <div class="level-left">
                    <p class="has-text-white">{alertTitle}</p>
                  </div>
                </div>
              </div>
              <div class="message-body has-background-grey-dark app-mock">
                <div class="level is-mobile">
                  <div class="level-left">
                    <p class="icon is-medium has-text-white">
                      <i class={`fas fa-bars fa-lg`} />
                    </p>
                  </div>
                  <div class="level-right">
                    <img
                      alt="UpSwyng icon mock"
                      src="/static/upswyng_arrow.svg"
                      class="upswyng-icon" />
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div class="content">
            <h1 class="is-size-5 has-text-weight-bold">Detail</h1>
            <p class="has-color-grey-darker content">
              {#if alertDetailFormatted.length}
                When the user clicks the banner, they will navigate to a detail
                page and be shown the following content:
              {:else}
                You didn't provide any detail for this alert, so nothing will
                happen if the user clicks the alert banner.
              {/if}
            </p>
            {#if alertDetailFormatted.length}
              <div class="box">
                <h1 class="is-size-5 has-text-weight-bold">{alertTitle}</h1>
                {@html alertDetailFormatted}
              </div>
            {/if}
          </div>
          {#if alertStart && alertEnd}
            <div class="content">
              <h1 class="is-size-5 has-text-weight-bold">Schedule</h1>
              <p class="has-text-weight-medium has-color-grey-darker content">
                This alert will start being shown
                {#if alertStartNow}
                  <strong>immediately</strong>
                {:else}
                  at
                  <strong>{alertStart.toLocaleString('en')}</strong>
                {/if}
                and will run for {Time.prettyPrintDuration(Math.round((alertEnd.getTime() - alertStart.getTime()) / (1000 * 60)), false)},
                ending at
                <strong>{alertEnd.toLocaleString('end')}.</strong>
                <span class="is-size-6 has-text-grey has-text-weight-bold">
                  (Timezone: {timezoneGuess})
                </span>
              </p>
            </div>
          {/if}
        </section>
        <footer class="modal-card-foot">
          <button class="button" on:click={() => (isSubmitDialogOpen = false)}>
            Cancel
          </button>
          <button
            class="button is-success"
            class:is-loading={isSubmitting}
            type="submit"
            on:click={publishAlert}>
            <span class="icon">
              <i class="fas fa-rocket is-small" />
            </span>
            <span>Publish</span>
          </button>
        </footer>
      </div>
    </div>
  {/if}
</section>
