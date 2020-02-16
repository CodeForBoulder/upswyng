export interface TSchedulePeriod {
  open: Date;
  close: Date;
}

export default function() {
  const cache = {} as Record<string, TSchedulePeriod>;

  const set = (resourceId: string, period: TSchedulePeriod) => {
    cache[resourceId] = period;
  };
  const get = (resourceId: string) => cache[resourceId] || null;

  return {
    set,
    get,
  };
}
