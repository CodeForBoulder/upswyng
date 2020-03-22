import { TAlertFull } from "@upswyng/upswyng-types";

export interface TAlertChartEntry {
  alert: TAlertFull;
  borderWidth?: number;
  backgroundColor?: string; // ex: "rgba(0, 0, 255, 0.1)"
  borderColor?: string; // ex: "rgba(0, 0, 255, 0.1)"
  x: { from: Date; to: Date };
  y: number;
}

function isAlertActive(alert: TAlertFull, now: Date = new Date()) {
  return (
    alert.start <= now &&
    alert.end >= now &&
    alert.isApproved &&
    !alert.isCancelled
  );
}

/**
 * Converts the supplied `TAlertFull`s to the format needed for the alert timeline
 * to display
 */
export default function alertsToCharEntries(
  alerts: TAlertFull[],
  selectedAlertId: string | null = null,
  barHeight: number = 1,
  spacing: number = 0.25 // spacing between rows of bars
): TAlertChartEntry[] {
  // sanitize alerts to ensure the dates have been converted
  alerts.forEach(alert => {
    if (typeof alert.start === "string") {
      alert.start = new Date(alert.start);
    }
    if (typeof alert.end === "string") {
      alert.end = new Date(alert.end);
    }
    if (!alert.category) {
      alert.category = "None";
    }
  });

  alerts.forEach(alert => {
    if (typeof alert.start === "string") {
      alert.start = new Date(alert.start);
    }
    if (typeof alert.end === "string") {
      alert.end = new Date(alert.end);
    }
    if (!alert.category) {
      alert.category = "None";
    }
  });
  alerts.sort(a => a.start.getTime());
  const rows: TAlertFull[][] = [];
  alerts.forEach(alert => {
    let canFitInRowIndex = -1; // no row to fit in
    rows.forEach((row, i) => {
      if (row.length) {
        const lastAlertInRow = row[row.length - 1];
        if (lastAlertInRow.end.getTime() < alert.start.getTime()) {
          canFitInRowIndex = i;
          return;
        }
      }
    });
    if (canFitInRowIndex < 0) {
      rows.push([alert]);
    } else {
      rows[canFitInRowIndex].push(alert);
    }
  });
  const result: TAlertChartEntry[] = [];
  rows.forEach((row, i) =>
    row.forEach(alert => {
      const a: TAlertChartEntry = {
        alert,
        x: { from: alert.start, to: alert.end },
        y: -1 * (i * (barHeight + spacing)),
        backgroundColor: isAlertActive(alert)
          ? `${alert.color}F9`
          : `${alert.color}E9`, // alerts that arent active are less opaque
      };
      if (alert.isCancelled) {
        a.backgroundColor = "#00000022";
      }
      if (alert._id === selectedAlertId) {
        a.borderColor = "#000477DD";
        a.borderWidth = 3;
      }
      result.push(a);
    })
  );
  return result;
}
