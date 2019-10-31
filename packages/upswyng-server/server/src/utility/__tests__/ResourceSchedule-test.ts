import ResourceSchedule from "../ResourceSchedule";
import RRule, { RRuleSet } from "rrule";

describe("ResourceSchedule", () => {
  it("serialzes a ResourceSchedule", () => {
    const rule = new RRule({
      freq: RRule.WEEKLY,
      interval: 5,
      byweekday: [RRule.MO, RRule.FR],
      dtstart: new Date(Date.UTC(2012, 1, 1, 10, 30)),
      until: new Date(Date.UTC(2012, 12, 31))
    });
    const schedule = new ResourceSchedule();
    schedule.rules.push({
      rule,
      comment: "test comment"
    });
    const o = JSON.parse(schedule.serialize());
    expect(Array.isArray(o)).toEqual(true);
    expect(o[0].comment).toEqual("test comment");
    expect(o[0].rule.toString()).toEqual(rule.toString());
  });

  it("parses a serialized schedule", () => {
    const serializedResourceSchedule =
      '[{"rule":"DTSTART:20120201T103000Z\\nRRULE:FREQ=WEEKLY;INTERVAL=5;BYDAY=MO,FR;UNTIL=20130131T000000Z","comment":"test comment"}]';

    const r = ResourceSchedule.parse(serializedResourceSchedule);
    expect(r.rules[0].comment).toEqual("test comment");
    expect(r.rules[0].rule.toString()).toEqual(
      "DTSTART:20120201T103000Z\nRRULE:FREQ=WEEKLY;INTERVAL=5;BYDAY=MO,FR;UNTIL=20130131T000000Z"
    );
  });

  it("throws when it parses an invalid schedule", () => {
    const serializedSchedule = JSON.stringify([{ badKey: "DTSTART" }]);
    expect(() => {
      const _x = ResourceSchedule.parse(serializedSchedule);
    }).toThrow(/rule/);
  });

  it("produces a rule set", () => {
    const rule = new RRule({
      freq: RRule.WEEKLY,
      interval: 5,
      byweekday: [RRule.MO, RRule.FR],
      dtstart: new Date(Date.UTC(2012, 1, 1, 10, 30)),
      until: new Date(Date.UTC(2012, 12, 31))
    });
    const schedule = new ResourceSchedule();
    schedule.rules.push({
      rule,
      comment: "test comment"
    });
    const ruleSet = schedule.toRuleSet();
    expect(ruleSet).toBeInstanceOf(RRuleSet);
  });
});
