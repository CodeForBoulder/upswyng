interface SchedulePeriod {
  open: Date;
  close: Date;
}

export default function() {
  const cache = {} as Record<string, SchedulePeriod>;

  this.set = (resourceId: string, period: SchedulePeriod) => {
    cache[resourceId] = period;
  };

  this.get = (resourceId: string) => cache[resourceId] || null;
}
