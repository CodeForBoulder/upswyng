import { TLegacySchedule } from "@upswyng/upswyng-types";
import convertLegacyScheduleToResourceSchedule from "../convertLegacyScheduleToResourceSchedule";

// TODO (rhinodavid): Reenable once we get Travis fixed
xdescribe("convertLegacyScheduleToResourceSchedule", () => {
  it("converts an always open schedule", () => {
    const legacySchedule: TLegacySchedule[] = [
      {
        type: "Open 24/7",
      },
    ];
    const schedule = convertLegacyScheduleToResourceSchedule(legacySchedule);
    expect(schedule.alwaysOpen).toEqual(true);
  });

  it("converts a weekly schedule", () => {
    const legacySchedule: TLegacySchedule[] = [
      {
        type: "Weekly",
        fromstring: "8:00 AM",
        tostring: "12:00 PM",
        day: "Monday",
      },
      {
        type: "Weekly",
        fromstring: "8:00 AM",
        tostring: "12:00 PM",
        day: "Tuesday",
      },
      {
        type: "Weekly",
        fromstring: "2:00 PM",
        tostring: "5:00 PM",
        day: "Friday",
      },
    ];
    const schedule = convertLegacyScheduleToResourceSchedule(legacySchedule);
    expect(schedule.alwaysOpen).toEqual(false);
    const items = schedule.getItems();
    expect(items).toHaveLength(2);
    expect(items[0].fromTime.value).toEqual("0800");
    expect(items[0].toTime.value).toEqual("1200");
    expect(items[0].recurrenceRule.toText()).toEqual(
      "every week on Monday, Tuesday"
    );
    expect(items[1].fromTime.value).toEqual("1400");
    expect(items[1].toTime.value).toEqual("1700");
    expect(items[1].recurrenceRule.toText()).toEqual("every week on Friday");
  });

  it("throws when a period is set", () => {
    const legacySchedule: TLegacySchedule[] = [
      {
        type: "Weekly",
        fromstring: "8:00 AM",
        tostring: "12:00 PM",
        day: "Friday",
        period: "Last",
      },
    ];
    expect(() =>
      convertLegacyScheduleToResourceSchedule(legacySchedule)
    ).toThrow(/unparseable type/);
  });
});
