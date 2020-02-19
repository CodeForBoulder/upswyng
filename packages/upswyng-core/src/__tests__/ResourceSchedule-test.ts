import RRule, { RRuleSet } from "rrule";

import ResourceSchedule, { getScheduleItemPeriod } from "../ResourceSchedule";
import Time from "../Time";

describe("ResourceSchedule", () => {
  it("serialzes a schedule", () => {
    const recurrenceRule = new RRule({
      freq: RRule.WEEKLY,
      interval: 5,
      byweekday: [RRule.MO, RRule.FR],
      dtstart: new Date(Date.UTC(2012, 1, 1, 10, 30)),
      until: new Date(Date.UTC(2012, 12, 31)),
    });
    const schedule = new ResourceSchedule([]);
    schedule.addItem({
      comment: "test comment",
      fromTime: Time.fromTTime(Time.options[4]),
      recurrenceRule,
      toTime: Time.fromTTime(Time.options[5]),
    });
    schedule.timezone = "America/Denver";
    schedule.alwaysOpen = true;
    const o = JSON.parse(JSON.stringify(schedule));
    expect(Array.isArray(o._items)).toEqual(true);
    expect(o._items[0].comment).toEqual("test comment");
    expect(o._items[0].recurrenceRule.toString()).toEqual(
      recurrenceRule.toString()
    );
    expect(o._items[0].fromTime).toEqual(Time.options[4].value);
    expect(o._items[0].toTime).toEqual(Time.options[5].value);
    expect(o.timezone).toEqual("America/Denver");
    expect(o.alwaysOpen).toEqual(true);
  });

  it("parses a serialized schedule", () => {
    const serializedResourceSchedule = JSON.parse(
      '{"alwaysOpen":true,"timezone":"Europe/Prague","_items":[{"recurrenceRule":"DTSTART:20120201T103000Z\\nRRULE:FREQ=WEEKLY;INTERVAL=5;BYDAY=MO,FR;UNTIL=20130131T000000Z","comment":"test comment","fromTime":"1200","toTime":"1400"}]}'
    );

    const r = ResourceSchedule.parse(serializedResourceSchedule);
    expect(r.getItems()[0].comment).toEqual("test comment");
    expect(r.getItems()[0].recurrenceRule.toString()).toEqual(
      "DTSTART:20120201T103000Z\nRRULE:FREQ=WEEKLY;INTERVAL=5;BYDAY=MO,FR;UNTIL=20130131T000000Z"
    );
    expect(r.getItems()[0].fromTime.label).toEqual("12:00 PM");
    expect(r.getItems()[0].toTime.value).toEqual("1400");
    expect(r.timezone).toEqual("Europe/Prague");
    expect(r.alwaysOpen).toEqual(true);
  });

  it("throws when it parses an invalid schedule", () => {
    const serializedSchedule = JSON.parse(
      JSON.stringify({
        _items: [{ badKey: "DTSTART" }],
      })
    );
    expect(() => {
      ResourceSchedule.parse(serializedSchedule);
    }).toThrow(/rule/);
  });

  it("produces a rule set", () => {
    const recurrenceRule = new RRule({
      freq: RRule.WEEKLY,
      interval: 5,
      byweekday: [RRule.MO, RRule.FR],
      dtstart: new Date(Date.UTC(2012, 1, 1, 10, 30)),
      until: new Date(Date.UTC(2012, 12, 31)),
    });
    const schedule = new ResourceSchedule();
    schedule.addItem({
      recurrenceRule,
      comment: "test comment",
      fromTime: Time.fromTTime(Time.options[5]),
      toTime: Time.fromTTime(Time.options[12]),
    });
    const ruleSet = schedule.toRuleSet();
    expect(ruleSet).toBeInstanceOf(RRuleSet);
  });

  it("removes an item from the schedule items by index", () => {
    const recurrenceRule = new RRule({
      freq: RRule.WEEKLY,
      interval: 5,
      byweekday: [RRule.MO, RRule.FR],
      dtstart: new Date(Date.UTC(2012, 1, 1, 10, 30)),
      until: new Date(Date.UTC(2012, 12, 31)),
    });

    const schedule = new ResourceSchedule([
      {
        comment: "item 0",
        fromTime: Time.fromTTime(Time.options[4]),
        recurrenceRule,
        toTime: Time.fromTTime(Time.options[5]),
      },
      {
        comment: "item 1",
        fromTime: Time.fromTTime(Time.options[4]),
        recurrenceRule,
        toTime: Time.fromTTime(Time.options[5]),
      },
      {
        comment: "item 2",
        fromTime: Time.fromTTime(Time.options[4]),
        recurrenceRule,
        toTime: Time.fromTTime(Time.options[5]),
      },
    ]);
    const removedItem = schedule.removeItemAtIndex(1);
    expect(removedItem.comment).toEqual("item 1");
    expect(schedule.getItems()).toHaveLength(2);
    expect(schedule.getItems()[0].comment).toEqual("item 0");
    expect(schedule.getItems()[1].comment).toEqual("item 2");
  });

  it("removes an item from the schedule items by by item", () => {
    const recurrenceRule = new RRule({
      freq: RRule.WEEKLY,
      interval: 5,
      byweekday: [RRule.MO, RRule.FR],
      dtstart: new Date(Date.UTC(2012, 1, 1, 10, 30)),
      until: new Date(Date.UTC(2012, 12, 31)),
    });

    const schedule = new ResourceSchedule([
      {
        comment: "item 0",
        fromTime: Time.fromTTime(Time.options[4]),
        recurrenceRule,
        toTime: Time.fromTTime(Time.options[5]),
      },
    ]);
    const removedItem = schedule.removeItem({
      comment: "item 0",
      fromTime: Time.fromTTime(Time.options[4]),
      recurrenceRule,
      toTime: Time.fromTTime(Time.options[5]),
    });
    expect(removedItem.comment).toEqual("item 0");
    expect(schedule.getItems()).toHaveLength(0);
  });

  it("throws when trying to remove a schedule item which does not exist", () => {
    const recurrenceRule = new RRule({
      freq: RRule.WEEKLY,
      interval: 5,
      byweekday: [RRule.MO, RRule.FR],
      dtstart: new Date(Date.UTC(2012, 1, 1, 10, 30)),
      until: new Date(Date.UTC(2012, 12, 31)),
    });

    const schedule = new ResourceSchedule([
      {
        comment: "item 0",
        fromTime: Time.fromTTime(Time.options[4]),
        recurrenceRule,
        toTime: Time.fromTTime(Time.options[5]),
      },
    ]);
    expect(() =>
      schedule.removeItem({
        comment: "item 0",
        fromTime: Time.fromTTime(Time.options[3]), // different from time
        recurrenceRule,
        toTime: Time.fromTTime(Time.options[5]),
      })
    ).toThrow(/Error removing schedule item/);
  });

  describe("getNextOpenItem()", () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayMs = 86400000;
    // create mock dates of tomorrow and two days after tomorrow
    const mockDates = [
      new Date(Date.now() + dayMs),
      new Date(Date.now() + dayMs * 3),
    ];
    const rawScheduleItems = mockDates.map(date => {
      const day = days[date.getDay()];
      return {
        recurrenceRule: RRule.fromText(`every week on ${day}`),
        comment: "",
        fromTime: Time.fromTTime(Time.options[4]),
        toTime: Time.fromTTime(Time.options[5]),
      };
    });

    const schedule = new ResourceSchedule(rawScheduleItems);
    const scheduleItems = schedule.getItems();

    it.each([
      [
        "returns tomorrows schedule item when checking against now",
        new Date(),
        getScheduleItemPeriod(scheduleItems[0]),
      ],
      [
        "returns the schedule item two days from tomorrow when checking against the day after tomorrow",
        new Date(mockDates[0].getTime() + dayMs),
        getScheduleItemPeriod(scheduleItems[1]),
      ],
    ])("%s", (_, dt, expectedScheduleItemPeriod) => {
      const nextScheduleItem = schedule.getNextScheduleItemPeriod(dt);
      expect(nextScheduleItem).toEqual(expectedScheduleItemPeriod);
    });
  });
});
