export default class Cache<T> {
  private cache = {} as Record<string, T>;
  setValue = (key: string, value: T) => {
    this.cache[key] = value;
  };
  getValue = (key: string) => this.cache[key] || null;
  setExpiration = (key: string, createdDate: Date, lifespan: number) => {
    this.cache[key]["createdDate"] = createdDate;
    this.cache[key]["lifespan"] = lifespan;
  };
  isExpired = (key: string, now: Date): boolean =>
    this.cache[key]["createdDate"].getTime() + this.cache[key]["lifespan"] <
    now.getTime();
}
