import parseRedisUrl from "../parseRedisUrl";

describe("parseRedisUrl", () => {
  it("parses a short url", () => {
    // see spec at: https://www.iana.org/assignments/uri-schemes/prov/redis

    const { port, host } = parseRedisUrl("redis://10.3.2.1:2222");
    expect(port).toEqual(2222);
    expect(host).toEqual("10.3.2.1");
  });

  it("parses a long url", () => {
    const { port, host, username, password } = parseRedisUrl(
      "rediss://h:aehflaiesupasswordhfliasdf@sub.domain.com:12345"
    );
    expect(port).toEqual(12345);
    expect(host).toEqual("sub.domain.com");
    expect(password).toEqual("aehflaiesupasswordhfliasdf");
    expect(username).toEqual("h");
  });

  it("parses a url without a username", () => {
    const { port, host, password } = parseRedisUrl(
      "rediss://:aehflaiesupasswordhfliasdf@sub.domain.com:12345"
    );
    expect(port).toEqual(12345);
    expect(host).toEqual("sub.domain.com");
    expect(password).toEqual("aehflaiesupasswordhfliasdf");
  });

  it("throws when given a bad URL", () => {
    expect(() =>
      parseRedisUrl("http://:aehflaiesupasswordhfliasdf@sub.domain.com:12345")
    ).toThrow();
  });
});
