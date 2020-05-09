import numWords from "num-words";

interface TTime {
  isNextDay?: boolean;
  label: string;
  value: string;
}

/**
 * Represents a time a resource opens or closes. Uses a 15 minute step and includes the option
 * of a time on the following day.
 */
export default class Time {
  isNextDay?: boolean;
  label: string;
  value: string;

  constructor(value: string, label: string, isNextDay?: boolean) {
    const t = Time.options.find(o => o.value === value);
    if (!t || t.label !== label || t.isNextDay != isNextDay) {
      throw new Error(
        `Error creating Time instance: the provided time does not match a valid option\nProvided value: ${value}, label: ${label}, isNextDay: ${isNextDay}`
      );
    }
    this.value = value;
    this.label = label;
    this.isNextDay = isNextDay;
  }

  /**
   * Used with `JSON.stringify` to serialize this time to send over the wire or
   * to store in a database. See:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON_behavior
   * for more information.
   *
   * ex:
   * const time = Time.fromLabel("12:15 PM");
   * const serializedTime = JSON.stringify(time); // '"1215"'
   */
  toJSON() {
    return this.value;
  }

  /**
   * Parse a serialized Time into a Time instance
   * @param s The serialized Time
   */
  static parse(s: string): Time {
    return Time.fromValue(JSON.parse(s));
  }

  static fromLabel(label: string): Time {
    const v = Time.options.find(o => o.label === label);
    if (!v) {
      throw new Error(`Error creating Time: Could not find label ${label}`);
    }
    return new Time(v.value, v.label, v.isNextDay);
  }

  static fromValue(value: string): Time {
    const v = Time.options.find(o => o.value === value);
    if (!v) {
      throw new Error(`Error creating Time: Could not find value ${value}`);
    }
    return new Time(v.value, v.label, v.isNextDay);
  }

  static fromTTime(ttime: TTime): Time {
    return new Time(ttime.value, ttime.label, ttime.isNextDay);
  }

  /**
   * The possible time values.
   */
  static options: TTime[] = (() => {
    const result = [];
    result.push(
      { value: 0, label: "12:00 AM" },
      { value: 15, label: "12:15 AM" },
      { value: 30, label: "12:30 AM" },
      { value: 45, label: "12:45 AM" }
    );
    for (let i = 1; i <= 11; i++) {
      result.push(
        { value: i * 100, label: `${i}:00 AM` },
        { value: i * 100 + 15, label: `${i}:15 AM` },
        { value: i * 100 + 30, label: `${i}:30 AM` },
        { value: i * 100 + 45, label: `${i}:45 AM` }
      );
    }
    result.push(
      { value: 1200, label: "12:00 PM" },
      { value: 1215, label: "12:15 PM" },
      { value: 1230, label: "12:30 PM" },
      { value: 1245, label: "12:45 PM" }
    );
    for (let i = 1; i <= 11; i++) {
      result.push(
        { value: 1200 + i * 100, label: `${i}:00 PM` },
        { value: 1200 + i * 100 + 15, label: `${i}:15 PM` },
        { value: 1200 + i * 100 + 30, label: `${i}:30 PM` },
        { value: 1200 + i * 100 + 45, label: `${i}:45 PM` }
      );
    }
    result.push(
      { value: 2400, label: "12:00 AM (next day)", isNextDay: true },
      { value: 2415, label: "12:15 AM (next day)", isNextDay: true },
      { value: 2430, label: "12:30 AM (next day)", isNextDay: true },
      { value: 2445, label: "12:45 AM (next day)", isNextDay: true }
    );
    for (let i = 1; i <= 8; i++) {
      result.push(
        {
          value: 2400 + i * 100,
          label: `${i}:00 AM (next day)`,
          isNextDay: true,
        },
        {
          value: 2400 + i * 100 + 15,
          label: `${i}:15 AM (next day)`,
          isNextDay: true,
        },
        {
          value: 2400 + i * 100 + 30,
          label: `${i}:30 AM (next day)`,
          isNextDay: true,
        },
        {
          value: 2400 + i * 100 + 45,
          label: `${i}:45 AM (next day)`,
          isNextDay: true,
        }
      );
    }
    return result.map(o => ({
      ...o,
      value: o.value.toString().padStart(4, "0"),
    }));
  })();

  /**
   * Utility to find the duration between a 'from' time and a 'to' time.
   * @returns {number} The duration in minutes
   */
  static duration(from: Time, to: Time): number {
    const f = parseInt(from.value, 10);
    const t = parseInt(to.value, 10);
    if (isNaN(f)) {
      throw new Error(`Error calculating duration: The 'from' time is invalid`);
    }
    if (isNaN(t)) {
      throw new Error(`Error calculating duration: The 'to' time is invalid`);
    }
    if (f > t) {
      throw new Error(
        `Error calculating duration: The 'from' time (${from.label}) is after the 'to' time (${to.label})`
      );
    }
    const fromHours = Math.floor(f / 100);
    const fromMinutes = Math.floor(f - fromHours * 100);
    const toHours = Math.floor(t / 100);
    const toMinutes = Math.floor(t - toHours * 100);

    return toHours * 60 + toMinutes - (fromHours * 60 + fromMinutes);
  }

  /**
   * Prints a duration in minutes nicely.
   * @param {number} duration The duration in minutes
   * @param {boolean} capitalizeFirstLetter
   * @returns {string} A pretty version of the duraton. ex: Time.prettyPrintDuration(255); // "Four hours and fifteen minutes"
   */
  static prettyPrintDuration(
    duration: number,
    capitalizeFirstLetter: boolean = true
  ): string {
    if (duration <= 0) {
      throw new Error(
        `Error pretty printing duration: The duration must be more than zero; got ${duration}`
      );
    }
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration) % 60;
    let result = "";
    if (hours) {
      if (capitalizeFirstLetter) {
        result +=
          numWords(hours)[0].toUpperCase() + numWords(hours).slice(1) + " ";
      } else {
        result += numWords(hours) + " ";
      }
      result += hours === 1 ? "hour" : "hours";
      if (minutes) {
        result += " and ";
      }
    }
    if (minutes) {
      if (hours) {
        result += numWords(minutes);
      } else {
        if (capitalizeFirstLetter) {
          result +=
            numWords(minutes)[0].toUpperCase() + numWords(minutes).slice(1);
        } else {
          result += numWords(minutes);
        }
      }
      result += minutes === 1 ? " minute" : " minutes";
    }
    return result;
  }
}
