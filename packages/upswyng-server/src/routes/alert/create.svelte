<script context="module">
  export async function preload({ params, query }, { user }) {
    if (!user || !user.isAdmin) {
      this.error(401, "You must be an admin to access this page.");
    }
  }
</script>

<script>
  import { addFlashMessage } from "../../utility/flashMessage.ts";
  import { goto, stores } from "@sapper/app";
  import { ResourceSchedule } from "@upswyng/upswyng-core";
  import ResourceEditor from "../../components/ResourceEditor.svelte";

  const { session } = stores();

  let isSaving = false;
  let saveError = null; // Error | null

  let alertColor = "#ff0000";
  let alertIcon = "fas fa-exclamation-triangle";

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

  //   function handleSaveClick(resource) {
  //     saveError = null;
  //     isSaving = true;

  //     const options = {
  //       method: "POST",
  //       body: JSON.stringify({ draftResource: resource }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     fetch("/api/resource", options)
  //       .then(async res => {
  //         if (res.status >= 400) {
  //           const { message } = await res.json();
  //           throw new Error(
  //             message || "There was an error creating the draft resource."
  //           );
  //         }
  //         return await res.json();
  //       })
  //       .then(res => {
  //         if (res.draftResource) {
  //           addFlashMessage(
  //             session,
  //             "success",
  //             res.draftResource.name
  //               ? `A draft of ${res.draftResource.name} was created`
  //               : "A new draft was created"
  //           );
  //           goto("/resource");
  //         } else {
  //           console.error(res);
  //           saveError = new Error(
  //             "There was an error creating the draft resource."
  //           );
  //         }
  //       })
  //       .catch(e => (saveError = e))
  //       .finally(() => (isSaving = false));
  //   }
</script>

<svelte:head>
  <title>Upswyng: Create an Alert</title>
</svelte:head>

<section class="section">
  <div class="container">
    <h1 class="title">
      Create an Alert
      <span class="tag is-dark">Admin</span>
    </h1>
    <div class="container">
      <div>
        <input
          class="input"
          type="color"
          name="alertcolor"
          bind:value={alertColor} />
      </div>
      <div>
        <input
          type="text"
          id="iconPicker"
          data-action="iconPicker"
          value="fas fa-rocket" />
      </div>
      <p>{alertColor}</p>
    </div>
  </div>
</section>
