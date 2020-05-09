<script>
  import { onMount } from "svelte";

  export let options = {}; // see https://github.com/Wikiki/bulma-calendar/blob/master/src/js/defaultOptions.js
  export let value; // string | null; "DD/MM/YYYY" unless changed in `options.dateFormat`

  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  function createId() {
    return Math.random()
      .toString(36)
      .substring(2, 15);
  }

  const id = `calendar-${createId()}`;

  onMount(async () => {
    const bulmaCalendar = await import("bulma-calendar");
    options.type = "date";
    if (value) {
      options.startDate = new Date(value);
    }
    const calendars = bulmaCalendar.default.attach(`#${id}`, options);
    if (calendars.length !== 1) {
      throw new Error(
        `While setting up a Date Picker, found ${calendars.length} calendars with ID ${id} but expected 1`
      );
    }
    calendars[0].on("clear", () => {
      value = null;
    });
    calendars[0].on("select", ({ data: calendar }) => {
      value = calendar.value();
    });
  });
</script>

<input type="date" {id} />
