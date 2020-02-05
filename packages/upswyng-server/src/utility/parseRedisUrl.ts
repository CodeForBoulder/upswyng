export default function parseRedisUrl(
  x: string
): { port: number; host: string; username?: string; password?: string } {
  // see spec at: https://www.iana.org/assignments/uri-schemes/prov/redis

  // ex: redis://h:aehflaiesupasswordhfliasdf@sub.domain.com:12345
  const longPatternMatch = x.match(
    /rediss?:\/\/(?<username>\w*):(?<password>\w+)@(?<host>.*):(?<port>[0-9]+)/
  );
  if (longPatternMatch) {
    return {
      host: longPatternMatch.groups.host,
      password: longPatternMatch.groups.password,
      port: parseInt(longPatternMatch.groups.port, 10),
      username: longPatternMatch.groups.username,
    };
  }

  // ex: redis://10.3.2.1:2222
  const shortPatternMatch = x.match(/rediss?:\/\/(?<host>.+):(?<port>[0-9]+)/);
  if (shortPatternMatch) {
    return {
      host: shortPatternMatch.groups.host,
      port: parseInt(shortPatternMatch.groups.port, 10),
    };
  }

  throw new Error(`Could not parse redis url: ${x}`);
}
