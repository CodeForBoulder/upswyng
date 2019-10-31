<script>
  import Select from "svelte-select";

  export let value = []; // TSchedule[]

  let newScheduleEntry = {}; // TSchedule

  const createRemoveScheduleEntry = index => () => {
    value.splice(index, 1);
    value = value; // need this nonsense so the svelte component updates
  };

  const daySelectOptions = [
    { value: null, label: "None" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" }
  ];

  const schedulePeriodOptions = [
    { value: null, label: "None" },
    { value: "Last", label: "Last" },
    { value: "First", label: "First" },
    { value: "Second", label: "Second" },
    { value: "Third", label: "Third" },
    { value: "Fourth", label: "Fourth" },
    { value: "Fifth", label: "Fifth" }
  ];

  const scheduleTypeOptions = [
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Open 24/7", label: "Open 24/7" },
    { value: "Date Range", label: "Date Range" },
    { value: "Permanently Closed", label: "Permanently Closed" }
  ];

  const fieldRequiredMasks = {
    Weekly: {
      day: true,
      date: false,
      period: false,
      from: true,
      to: true,
      scheduleType: true
    },
    Monthly: {
      day: true,
      date: false,
      period: true,
      from: true,
      to: true,
      scheduleType: true
    },
    "Open 24/7": {
      day: false,
      date: false,
      period: false,
      from: false,
      to: false,
      scheduleType: true
    },
    "Date Range": {
      day: false,
      date: false,
      period: false,
      from: true,
      to: true,
      scheduleType: true
    },
    "Permanently Closed": {
      day: false,
      date: false,
      period: false,
      from: false,
      to: false,
      scheduleType: true
    }
  };

  let fieldRequiredMask = fieldRequiredMasks.Weekly;

  function validateForm(day, date, period, to, from) /*: boolean */ {
    return Boolean(
      (!fieldRequiredMask.day || day.value) &&
        (!fieldRequiredMask.date || date) &&
        (!fieldRequiredMask.period || period.value) &&
        (!fieldRequiredMask.to || to) &&
        (!fieldRequiredMask.from || from)
    );
  }
  let formValid = false;
  $: formValid = validateForm(day, date, period, to, from);

  function addScheduleItem() {
    value = [
      ...value,
      { day: day.value, date, period: period.value, from, to, scheduleType: scheduleType.value }
    ];
    resetFieldDefaults();
  }

  function updateScheduleType(t) {
    resetFieldDefaults();
    switch (t.value) {
      case "Weekly":
      case "Monthly":
      case "Open 24/7":
      case "Date Range":
      case "Permanently Closed":
        type = t;
        fieldRequiredMask = fieldRequiredMasks[t.value];
        break;
      default:
        throw new Error(`Unexpected schedule type: ${t}`);
    }
    type = t;
  }

  function displayScheduleEntry(scheduleEntry /*: TSchedule */) /*: string */ {
    const { day, date, period, from, to, scheduleType } = scheduleEntry;
    switch (scheduleType) {
      case "Weekly":
        return `<span>${day} ${from} - ${to}<span>Weekly</span></span>`;
      case "Monthly":
        return `<span>${day} ${from} - ${to} ${period}<span>Monthly</span></span>`;
      case "Open 24/7":
        return `<span>Open 24/7</span>`;
      case "Date Range":
        return `<span>${date} ${from} - ${to}<span>Date Range</span></span>`;
      case "Permanently Closed":
        return `<span>Permanently Closed</span>`;
      default:
        throw new Error(`Unexpected schedule type: ${scheduleType}`);
    }
  }

  function resetFieldDefaults() {
    day = { value: null, label: "None" };
    date = "";
    period = { value: null, label: "None" };
    from = "";
    to = "";
  }
  let day, date, period, from, to;
  let scheduleType = { value: "Weekly", label: "Weekly" };
  resetFieldDefaults();
</script>

<h1>Closed Schedule</h1>
<ul>
  {#each value as scheduleEntry, index}
    <li>
      {@html displayScheduleEntry(scheduleEntry)}
      <button
        type="button"
        preventDefault
        on:click={createRemoveScheduleEntry(index)}>
        Remove
      </button>
    </li>
  {/each}
</ul>
<fieldset>
  <h2>Add Schedule Entry</h2>
  <p>
    <label for="schedule_type">Schedule Type</label>
    <Select
      bind:selectedValue={scheduleType}
      on:clear={() => (scheduleType = { value: null, label: 'None' })}
      on:select={t => updateScheduleType(t.detail)}
      items={scheduleTypeOptions} />
  </p>
  {#if fieldRequiredMask.day}
    <p>
      <label for="day">Day</label>
      <Select
        bind:selectedValue={day}
        on:clear={() => (day = { value: null, label: 'None' })}
        items={daySelectOptions} />
    </p>
  {/if}
  {#if fieldRequiredMask.date}
    <p>
      <label for="date">Date</label>
      <input
        name="date"
        type="text"
        placeholder="9/21/2021"
        bind:value={date} />
    </p>
  {/if}
  {#if fieldRequiredMask.period}
    <p>
      <label for="period">Period</label>
      <Select
        bind:selectedValue={period}
        on:clear={() => (period = { value: null, label: 'None' })}
        items={schedulePeriodOptions} />
    </p>
  {/if}
  {#if fieldRequiredMask.from}
    <p>
      <label for="from">From Time</label>
      <input name="from" placeholder="10:00 AM" type="text" bind:value={from} />
    </p>
  {/if}
  {#if fieldRequiredMask.to}
    <p>
      <label for="to">To Time</label>
      <input name="to" placeholder="12:00 PM" type="text" bind:value={to} />
    </p>
  {/if}
  <button
    disabled={!formValid}
    type="button"
    preventDefault
    on:click={addScheduleItem}>
    Add Item
  </button>
</fieldset>
