import Time from "../Time";

describe("Time", () => {
  it("serializes and parses", () => {
    const t = Time.fromLabel("12:15 PM");
    const serializedTime = JSON.stringify(t);
    expect(serializedTime).toEqual('"1215"');
    const parsedTime = Time.parse(serializedTime);
    expect(parsedTime.value).toEqual(t.value);
  });

  it("creates a time from a value", () => {
    expect(Time.fromValue(Time.options[15].value)).toEqual(Time.options[15]);
  });

  it("creates a time from a label", () => {
    expect(Time.fromLabel(Time.options[5].label)).toEqual(Time.options[5]);
  });

  it("computes durations", () => {
    expect(
      Time.duration(
        Time.fromTTime(Time.options[5]),
        Time.fromTTime(Time.options[8])
      )
    ).toEqual(45);
    expect(
      Time.duration(
        Time.fromTTime(Time.options[5]),
        Time.fromTTime(Time.options[5])
      )
    ).toEqual(0);
    expect(() =>
      Time.duration(
        Time.fromTTime(Time.options[9]),
        Time.fromTTime(Time.options[2])
      )
    ).toThrow();
  });

  it("pretty prints durations", () => {
    expect(Time.prettyPrintDuration(60)).toEqual("One hour");
    expect(Time.prettyPrintDuration(121)).toEqual("Two hours and one minute");
    expect(Time.prettyPrintDuration(195)).toEqual(
      "Three hours and fifteen minutes"
    );
    expect(Time.prettyPrintDuration(30)).toEqual("Thirty minutes");
  });
});
