<script>
  import { onMount } from "svelte";

  export let alerts = [
    {
      isApproved: true,
      isCancelled: false,
      _id: "5e6b14ecc871430e0e2a4a39",
      createdBy: {
        _id: "5dad0670def1867ad32953ba",
        providers: ["google", "slack"],
        isAdmin: true,
        isSuperAdmin: true,
        email: "dawalsh@gmail.com",
        name: "David",
      },
      lastModifiedBy: {
        _id: "5dad0670def1867ad32953ba",
        providers: ["google", "slack"],
        isAdmin: true,
        isSuperAdmin: true,
        email: "dawalsh@gmail.com",
        name: "David",
      },
      category: "Weather",
      color: "#ff2222",
      icon: "fas fa-fire",
      title: "Test Title 1",
      start: "2020-03-11T00:00:00.000Z",
      end: "2020-03-13T00:00:00.000Z",
      createdAt: "2020-03-13T05:06:52.603Z",
      lastModifiedAt: "2020-03-13T05:06:52.603Z",
      __v: 0,
    },
    {
      isApproved: true,
      isCancelled: true,
      _id: "5e6b15188e7f970e2d62fcb4",
      createdBy: {
        _id: "5dad0670def1867ad32953ba",
        providers: ["google", "slack"],
        isAdmin: true,
        isSuperAdmin: true,
        email: "dawalsh@gmail.com",
        name: "David",
      },
      lastModifiedBy: {
        _id: "5dad0670def1867ad32953ba",
        providers: ["google", "slack"],
        isAdmin: true,
        isSuperAdmin: true,
        email: "dawalsh@gmail.com",
        name: "David",
      },
      category: "Weather",
      color: "#ff2222",
      icon: "fas fa-fire",
      title: "Test Title 1",
      start: "2020-03-14T00:00:00.000Z",
      end: "2020-03-15T00:00:00.000Z",
      createdAt: "2020-03-13T05:07:36.111Z",
      lastModifiedAt: "2020-03-13T05:07:36.111Z",
      __v: 0,
    },
  ];

  const;

  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  function createId() {
    return Math.random()
      .toString(36)
      .substring(2, 15);
  }

  function incHour(date, delta) {
    if (delta === undefined) delta = 1;
    date.setHours(date.getHours() + delta);
    return new Date(date);
  }

  const id = `gantt-${createId()}`;

  onMount(async () => {
    const Chart = await import("chart.js");
    await import("chartjs-plugin-gantt");

    const context = document.getElementById(id);

    const curDate = new Date("2020-03-02");

    const chart = new Chart.default(context, {
      type: "gantt",
      data: {
        datasets: [
          {
            label: "Time gantt",
            data: [
              {
                x: { from: incHour(curDate, 0), to: incHour(curDate, 3) },
                y: 0,
              },
              {
                x: { from: incHour(curDate, 332), to: incHour(curDate, 336) },
                y: 0,
              },
            ],
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "time-gantt",
              position: "bottom",
              bounds: "data",
              ticks: { source: "auto" },
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
      },
    });
  });
</script>

<canvas {id} width="400" height="200" />
