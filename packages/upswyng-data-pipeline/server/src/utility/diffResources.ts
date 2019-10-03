import { TResource } from "../../../src/types";
import { deepEqual } from "fast-equals";

/**
 * Takes two resources and removes the fields that are the same on each.
 */
export default function diffResources(
    left: TResource,
    right: TResource
  ): { left: Partial<TResource>; right: Partial<TResource> } {
    const leftResult: Partial<TResource> = {};
    const rightResult: Partial<TResource> = {};
    const fieldsToCompare: (keyof TResource)[] = [
      "address",
      "closeSchedule",
      "deleted",
      "description",
      "kudos",
      "latitude",
      "legacyId",
      "longitude",
      "name",
      "phone",
      "schedule",
      "services",
      "subcategories",
      "website"
    ];
    fieldsToCompare.forEach(fieldName => {
      if (!deepEqual(left[fieldName], right[fieldName])) {
        (leftResult[fieldName] as any) = left[fieldName];
        (rightResult[fieldName] as any) = right[fieldName];
      }
    });
  
    return { left: leftResult, right: rightResult };
  }
  