import { RRule, RRuleSet, rrulestr } from "rrule";

interface TUpRRule {
  rule: RRule;
  comment: string;
}

/**
 * Represents the reoccuring schedule of a resource (ex: Mon, Wed, Fri from 8am - 10pm)
 * Based on the iCalendar standard (https://icalendar.org/iCalendar-RFC-5545)
 * Wraps the rrule library (https://github.com/jakubroztocil/rrule) in order to add
 * comments for schedule rules (ex: Mon 8am-12pm for residents, 1pm-4pm for non-residents)
 */
export default class ResourceSchedule {
  rules: TUpRRule[] = [];

  /**
   * Parse a serialized ResourceSchedule into a ResouceSchedule instance
   * @param s The serialized ResourceSchedule
   */
  static parse(s: string): ResourceSchedule {
    let x;
    try {
      x = JSON.parse(s);
    } catch (e) {
      throw new Error(
        `Error parsing serialized resource schedule JSON:\n${e.message}\nSerialized ResourceSchedule:\t${s}`
      );
    }
    if (!Array.isArray(x)) {
      throw new Error(
        `Error parsing serialized resource schedule:\n${s}\n\nParsed JSON is not an array.`
      );
    }
    if (
      !x.every(r => {
        if (!r.rule) {
          return false;
        }
        if (typeof r.rule !== "string") {
          return false;
        }
        if (r.comment && typeof r.comment !== "string") {
          return false;
        }
        return true;
      })
    ) {
      throw new Error(
        `Error parsing serialized resource schedule:\n${s}\n\nEvery object in the serialized schedule must have a \`rule\` and \`comment\` field.`
      );
    }
    const result = new ResourceSchedule();
    x.forEach(r => {
      result.rules.push({
        rule: RRule.fromString(r.rule),
        comment: r.comment || ""
      });
    });
    return result;
  }

  /**
   * Serialize this schedule to a string to store in a database
   */
  serialize(): string {
    return JSON.stringify(
      this.rules.map(r => ({ rule: r.rule.toString(), comment: r.comment }))
    );
  }

  /**
   * Transform the schedule into an RRuleSet
   */
  toRuleSet(): RRuleSet {
    const result = new RRuleSet();
    this.rules.forEach(r => result.rrule(r.rule));
    return result;
  }
}
