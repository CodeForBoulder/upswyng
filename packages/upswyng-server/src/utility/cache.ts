export default class Cache<T> {
  private cache = {} as Record<string, T>;
  setValue = (key: string, value: T) => {
    this.cache[key] = value;
  };
  getValue = (key: string) => this.cache[key] || null;
}
