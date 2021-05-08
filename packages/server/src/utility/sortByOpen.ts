import { TCategory, TSubcategory } from "@upswyng/types";
import { ResourceSchedule } from "@upswyng/common";

const isCategory = (
  category: TCategory | TSubcategory
): category is TCategory =>
  (category as TSubcategory).parentCategory === undefined;

const sortSubcategoryResourcesByOpen = (subcategory: TSubcategory) => {
  subcategory.resources.sort((resourceA, resourceB) => {
    const A = ResourceSchedule.parse(resourceA.schedule).isOpen();
    const B = ResourceSchedule.parse(resourceB.schedule).isOpen();
    if (A && !B) return -1;
    if (B && !A) return 1;
    return 0;
  });
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
