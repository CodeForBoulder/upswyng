interface SchedulePeriod {
  open: Date;
  close: Date;
}

export default function() {
  const cache = {} as Record<string, SchedulePeriod>;

  this.setNextOpenClose = (resourceId: string, period: SchedulePeriod) => {
    cache[resourceId] = period;
  };

  this.getNextSchedulePeriod = (resourceId: string) =>
    cache[resourceId] || null;
}
