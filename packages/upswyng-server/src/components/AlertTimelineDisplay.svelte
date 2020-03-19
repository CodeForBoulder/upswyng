<script>
  import { onMount, createEventDispatcher } from "svelte";
  import alertsToChartEntries from "../utility/alertsToChartEntries.ts";
  import roundRect from "../utility/roundRect.ts";

  let w; // canvas width
  let h; // canvas height

  const barHeight = 1;
  const yPixelHeightPerRow = 20; // not actually working out to a pixel height, but bigger is more

  export let alerts = []; // TAlertFull[]
  export let selectedAlertId = null; // string? (bson ObjectId)
  export let minDate = new Date();
  export let maxDate = new Date();

  let chart; // chart.js chart instance; assigned during `onMount`
  let entries = [];
  let minY;
  let maxY;
  $: {
    entries = alertsToChartEntries(
      alerts,
      selectedAlertId,
      barHeight,
      /* spacing = */ 0.5
    );
    if (chart && entries) {
      chart.data.datasets[0].data = entries;
      chart.update();
    }
  }

  $: {
    if (chart) {
      chart.options.scales.xAxes[0].ticks.min = minDate.getTime();
      chart.options.scales.xAxes[0].ticks.max = maxDate.getTime();
      chart.update();
    }
  }

  $: [minY, maxY] = entries.length
    ? entries.reduce(
        (result, alert) => {
          const minY = Math.min(result[0], alert.y);
          const maxY = Math.max(result[1], alert.y);
          return [minY, maxY];
        },
        [Infinity, -Infinity]
      )
    : [0, 0];
  let pixelHeight = 0;
  $: pixelHeight =
    (maxY - minY) * yPixelHeightPerRow + 20 /* for axis labels */;
  $: h = pixelHeight;

  // let timeSpan = 0; // ms
  // $: {
  //   if (entries.length) {
  //     let entriesStart = new Date("2100-01-01");
  //     let entriesEnd = new Date("1900-01-01");
  //     entries.forEach(entry => {
  //       if (entry.x.from < entriesStart) {
  //         entriesStart = entry.x.from;
  //       }
  //       if (entry.x.to > entriesEnd) {
  //         entriesEnd = entry.x.to;
  //       }
  //     });
  //     timeSpan = entriesEnd.getTime() - entriesStart.getTime();
  //   } else {
  //     timeSpan = 0;
  //   }
  // }

  let clickDispatcher = createEventDispatcher();

  let canvas;

  onMount(async () => {
    const { default: Chart } = await import("chart.js");
    await import("chartjs-plugin-gantt");

    /* Modify the gantt plugin to have rounded corners */
    const Utils = {
      _parseInterval: function(value) {
        if (typeof value === "number") return value;
        if (typeof value === "string") {
          const parsed = value
            .trim()
            .toLowerCase()
            .split(/\s*(\d+)\s*/);
          let cur = "ms";
          const obj = {};
          for (let i = parsed.length - 1; i > 0; i--) {
            const num = parseFloat(parsed[i]);
            if (isFinite(num)) obj[cur] = num;
            else cur = parsed[i];
          }
          value = obj;
        }
        const coefs = {
          ms: 1,
          s: 1000,
          m: 1000 * 60,
          h: 1000 * 60 * 60,
          d: 1000 * 60 * 60 * 24,
        };
        let res = 0;
        for (let key in value) {
          if (coefs[key]) res += value[key] * coefs[key];
        }
        return res;
      },

      isRange: function(value) {
        return (
          typeof value.from !== "undefined" && typeof value.to !== "undefined"
        );
      },

      getValue: function(rawValue, scale) {
        if (typeof rawValue === "string") return +rawValue;

        // Null and undefined values first
        if (typeof rawValue === "undefined" || rawValue === null) return NaN;
        // isNaN(object) returns true, so make sure NaN is checking for a number; Discard Infinite values
        if (typeof rawValue === "number" && !isFinite(rawValue)) {
          return NaN;
        }
        // If it is in fact an object, dive in one more level
        if (rawValue) {
          const nested = scale.isHorizontal() ? rawValue.x : rawValue.y;
          if (nested !== undefined) return this.getValue(nested, scale);
        }

        // Value is good, return it
        return rawValue;
      },

      _incMilliseconds: function(date, addend) {
        const res = new Date(date);
        res.setMilliseconds(res.getMilliseconds() + addend);
        return res;
      },

      extendValue: function(value, defSize) {
        if (this.isRange(value)) return value;
        if (!isFinite(value)) return NaN;

        const delta = defSize / 2;
        if (value instanceof Date) {
          return {
            from: this._incMilliseconds(value, -delta),
            to: this._incMilliseconds(value, delta),
          };
        }
        return {
          from: value - delta,
          to: value + delta,
        };
      },

      isTimeScale: function(scale) {
        return scale.isTime || scale.type === "time";
      },

      convertSize: function(scale, size) {
        return this.isTimeScale(scale) ? this._parseInterval(size) : size;
      },

      normalize: function(value) {
        if (value.from > value.to) {
          const tmp = value.from;
          value.from = value.to;
          value.to = tmp;
        }
        return value;
      },

      getMiddle: function(value) {
        return (value.from + value.to) / 2;
      },
    };

    const Rect = Chart.Element.extend({
      inRange: function(mouseX, mouseY) {
        const rect = this._view.rect;
        return (
          mouseX >= rect.x.from &&
          mouseX <= rect.x.to &&
          mouseY >= rect.y.from &&
          mouseY <= rect.y.to
        );
      },

      getCenterPoint: function() {
        const vm = this._view;
        return {
          x: vm.x,
          y: vm.y,
        };
      },

      getArea: function() {
        const rect = this._view.rect;
        return rect.x.size * rect.y.size;
      },

      draw: function() {
        const vm = this._view;
        const ctx = this._chart.ctx;

        const alert = this._chart.config.data.datasets[this._datasetIndex].data[
          this._index
        ].alert;

        ctx.save();
        ctx.lineWidth = vm.borderWidth;
        ctx.strokeStyle = vm.borderColor;
        ctx.fillStyle = vm.backgroundColor;

        let hatchColor = null;

        if (!alert.isApproved) {
          hatchColor = "#F3BD20DD";
        }

        if (alert.isCancelled) {
          hatchColor = "#DD0000DD";
        }

        const rect = vm.rect;
        roundRect(
          ctx,
          rect.x.from,
          rect.y.from,
          rect.x.size,
          rect.y.size,
          "full",
          true,
          true,
          hatchColor
        );

        ctx.restore();
      },
    });

    const defaults = Chart.defaults;

    defaults.gantt = {
      height: 5,
      width: 5,
      scales: {
        xAxes: [
          {
            id: "x-axis-1",
            type: "linear-gantt",
            position: "bottom",
          },
        ],
        yAxes: [
          {
            id: "y-axis-1",
            type: "linear-gantt",
            position: "left",
          },
        ],
      },
      tooltips: {
        callbacks: {
          title: function() {
            return "";
          },
          label: function(item) {
            return "(" + item.xLabel + ", " + item.yLabel + ")";
          },
        },
      },
    };

    defaults.global.elements.gantt = {
      borderWidth: 1,
      borderColor: defaults.global.defaultColor,
      backgroundColor: defaults.global.defaultColor,
    };

    function GanttController(Chart) {
      Chart.controllers.gantt = Chart.DatasetController.extend({
        dataElementType: Rect,

        _prepareData: function(data, dataset) {
          return {
            x: Utils.extendValue(data.x, dataset._width),
            y: Utils.extendValue(data.y, dataset._height),
          };
        },

        _calcBounds: function(scale, scaleValue) {
          const from = scale.getPixelForValue(scaleValue.from);
          const to = scale.getPixelForValue(scaleValue.to);
          const res = {
            from: from,
            to: to,
          };
          Utils.normalize(res);
          res.size = res.to - res.from;
          return res;
        },

        update: function(reset) {
          const meta = this.getMeta();
          const dataset = this.getDataset();
          const xScale = this.getScaleForId(meta.xAxisID);
          const yScale = this.getScaleForId(meta.yAxisID);
          dataset._width = Utils.convertSize(
            xScale,
            Chart.helpers.valueOrDefault(dataset.width, defaults.gantt.width)
          );
          dataset._height = Utils.convertSize(
            yScale,
            Chart.helpers.valueOrDefault(dataset.height, defaults.gantt.height)
          );

          const globalOptionGantt = defaults.global.elements.gantt;

          dataset._view = {
            borderWidth: dataset.borderWidth || globalOptionGantt.borderWidth,
            borderColor: dataset.borderColor || globalOptionGantt.borderColor,
            backgroundColor:
              dataset.backgroundColor || globalOptionGantt.backgroundColor,
          };

          const now = new Date();

          const data = meta.data || [];
          for (let i = 0; i < data.length; i++)
            this.updateElement(data[i], i, reset);
        },

        updateElement: function(point, index, reset) {
          const meta = this.getMeta();
          const dataset = this.getDataset();
          const datasetIndex = this.index;
          const xScale = this.getScaleForId(meta.xAxisID);
          const yScale = this.getScaleForId(meta.yAxisID);
          const vm = dataset._view;
          const value = dataset.data[index];

          // Utility
          point._xScale = xScale;
          point._yScale = yScale;
          point._datasetIndex = datasetIndex;
          point._index = index;

          const fullPoint = this._prepareData(value, dataset);

          point._model = {
            rect: {
              x: this._calcBounds(xScale, fullPoint.x),
              y: this._calcBounds(yScale, fullPoint.y),
            },
            borderWidth: value.borderWidth || vm.borderWidth,
            borderColor: value.borderColor || vm.borderColor,
            backgroundColor: value.backgroundColor || vm.backgroundColor,
          };
          point._model.x = Utils.getMiddle(point._model.rect.x);
          point._model.y = Utils.getMiddle(point._model.rect.y);
          point.pivot();
        },
      });
    }

    GanttController(Chart);

    //////////////////////////////

    const context = canvas.getContext("2d");
    chart = new Chart(context, {
      type: "gantt",
      plugins: [
        {
          id: "nowMarkerAnnotation",
          afterDraw: chart => {
            const ctx = chart.ctx;
            const now = new Date().getTime();
            const xAxis = chart.scales["x-axis"];
            const yAxis = chart.scales["y-axis"];
            const isNowInView = now >= xAxis.min && now <= xAxis.max;
            if (!isNowInView || !yAxis || !xAxis) {
              return;
            }
            const x =
              xAxis.left +
              xAxis.width * ((now - xAxis.min) / (xAxis.max - xAxis.min));
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, yAxis.top);
            ctx.lineTo(x, yAxis.bottom);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#0066ff66";
            ctx.stroke();
            ctx.restore();
          },
        },
      ],
      data: {
        datasets: [
          {
            label: "Alerts",
            data: entries,
            height: barHeight,
          },
        ],
      },
      options: {
        layout: {
          padding: {
            left: 0.25,
            right: 0.25,
            top: 0.25,
            bottom: 0.25,
          },
        },
        onClick: function(_e /* MouseEvent */, elements /* ChartElement[] */) {
          if (!elements.length) return;
          const { _datasetIndex: datasetIndex, _index: index } = elements[0];
          const alert =
            elements[0]._chart.config.data.datasets[datasetIndex].data[index]
              .alert;
          clickDispatcher("click", { id: alert._id });
        },
        tooltips: {
          custom: function(tooltip) {
            if (!tooltip) return;
            // disable displaying the color box;
            tooltip.displayColors = false;
          },
          callbacks: {
            title: function(tooltipItems, data) {
              const { datasetIndex, index } = tooltipItems[0];
              const alert = data.datasets[datasetIndex].data[index].alert;
              let title = alert.title || "";
              if (alert.isCancelled) {
                title += " (Cancelled)";
              }

              if (!alert.isCancelled && !alert.isApproved) {
                title += " (Needs Approval)";
              }
              return title.trim();
            },
            label: function(tooltipItem, data) {
              const { datasetIndex, index } = tooltipItem;
              const alert = data.datasets[datasetIndex].data[index].alert;
              return `${alert.start.toLocaleString(
                "en-US"
              )} - ${alert.end.toLocaleString("en-US")}`;
            },
            footer: function(tooltipItems, data) {
              const { datasetIndex, index } = tooltipItems[0];
              const alert = data.datasets[datasetIndex].data[index].alert;
              return alert.category && alert.category !== "None"
                ? alert.category
                : "";
            },
          },
        },
        legend: { display: false },
        scales: {
          xAxes: [
            {
              type: "time-gantt",
              position: "bottom",
              bounds: "ticks",
              ticks: {
                min: minDate.getTime(),
                max: maxDate.getTime(),
                source: "auto",
              },
              id: "x-axis",
              time: {
                displayFormats: {
                  hour: "ddd D, hA",
                  minute: "ddd D, h:mm a",
                },
              },
            },
          ],
          yAxes: [
            {
              id: "y-axis",
              type: "linear-gantt",
              display: false,
            },
          ],
        },
      },
    });
  });
</script>

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>

<canvas
  bind:this={canvas}
  bind:clientWidth={w}
  bind:clientHeight={h}
  width={w}
  height={h} />
