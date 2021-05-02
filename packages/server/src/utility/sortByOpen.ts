import { TCategory, TSubcategory } from "@upswyng/types";
import { ResourceSchedule } from "@upswyng/common";

const isCategory = (
  category: TCategory | TSubcategory
): category is TCategory =>
  (category as TSubcategory).parentCategory === undefined;

const sortSubcategoryResourcesByOpen = (subcategory: TSubcategory) => {
  const now = new Date();
  subcategory.resources = subcategory.resources.sort(
    (resourceA, _resourceB) => {
      const scheduleA = ResourceSchedule.parse(resourceA.schedule);
      const nextScheduleItemPeriod = scheduleA.getNextScheduleItemPeriod(now);
      if (
        nextScheduleItemPeriod.open.getTime() < now.getTime() &&
        now.getTime() < nextScheduleItemPeriod.close.getTime()
      ) {
        return -1;
      }
      return 0;
    }
  );
  return subcategory;
};

export default function sortByOpen<T extends TCategory | TSubcategory>(
  category: T
): T {
  if (isCategory(category)) {
    category.subcategories = category.subcategories.map(
      sortSubcategoryResourcesByOpen
    );
    return category;
  }
  return sortSubcategoryResourcesByOpen(category as TSubcategory) as T;
}
