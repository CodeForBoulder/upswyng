export interface SchedulePeriod {
  open: Date;
  close: Date;
}

export default function() {
  const cache = {} as Record<string, SchedulePeriod>;

  const set = (resourceId: string, period: SchedulePeriod) => {
    cache[resourceId] = period;
  };
  const get = (resourceId: string) => cache[resourceId] || null;

  return {
    set,
    get,
  };
}
