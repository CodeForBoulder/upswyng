import { ObjectId } from "bson";
import { TResource } from "../../../src/types";
import canonical from "canonical-instance";
import Resource from "./Resource";
import Subcategory from "./Subcategory";
import Transaction from "mongoose-transactions";

export async function addResourceToSubcategory(
  resourceId: ObjectId /* Resource ObjectId */,
  subcategoryId: ObjectId /* Subcategory ObjectId */
) {
  const resource = await Resource.findById(resourceId);
  if (!resource)
    throw new Error(`Could not find Resource with ID ${resourceId}`);

  const subcategory = await Subcategory.findById(subcategoryId);
  if (!subcategory)
    throw new Error(`Could not find Subcategory with ID ${subcategoryId}`);

  const transaction = new Transaction();
  let runUpdate = false;
  if (
    !resource.subcategories
      .map((s: ObjectId) => s.toHexString())
      .includes(subcategoryId.toHexString())
  ) {
    runUpdate = true;
    transaction.update(Resource, resourceId, {
      subcategories: [...resource.subcategories, subcategoryId]
    });
  }
  if (
    !subcategory.resources
      .map(s => s.toHexString())
      .includes(resourceId.toHexString())
  ) {
    runUpdate = true;
    transaction.update(Resource, resourceId, {
      resources: [...subcategory.resources, resourceId]
    });
  }
  if (runUpdate) {
    try {
      return await transaction.run();
    } catch (error) {
      console.error(error);
      const rollbackObj = await transaction.rollback().catch(console.error);
      transaction.clean();
      return rollbackObj;
    }
  }
}

export async function removeResourceFromSubcategory(
  resourceId: ObjectId /* Resource ObjectId */,
  subcategoryId: ObjectId /* Subcategory ObjectId */
) {
  const resource = await Resource.findById(resourceId);
  if (!resource)
    throw new Error(`Could not find Resource with ID ${resourceId}`);

  const subcategory = await Subcategory.findById(subcategoryId);
  if (!subcategory)
    throw new Error(`Could not find Subcategory with ID ${subcategoryId}`);

  const transaction = new Transaction();
  let runUpdate = false;
  if (
    resource.subcategories
      .map((s: ObjectId) => s.toHexString())
      .includes(subcategoryId.toHexString())
  ) {
    runUpdate = true;
    transaction.update(Resource, resourceId, {
      subcategories: resource.subcategories.filter(
        s => s.toHexString() !== subcategoryId.toHexString()
      )
    });
  }
  if (
    subcategory.resources
      .map(s => s.toHexString())
      .includes(resourceId.toHexString())
  ) {
    runUpdate = true;
    transaction.update(Resource, resourceId, {
      resources: subcategory.resources.filter(
        r => r.toHexString() !== resourceId.toHexString()
      )
    });
  }
  if (runUpdate) {
    try {
      return await transaction.run();
    } catch (error) {
      console.error(error);
      const rollbackObj = await transaction.rollback().catch(console.error);
      transaction.clean();
      return rollbackObj;
    }
  }
}

/**
 * Takes two resources and removes the fields that are the same on each.
 */
export function diffResources(
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
    if (canonical(left[fieldName]) !== canonical(right[fieldName])) {
      (leftResult[fieldName] as any) = left[fieldName];
      (rightResult[fieldName] as any) = right[fieldName];
    }
  });

  return { left: leftResult, right: rightResult };
}
