import Subcategory from "./Subcategory";
import Resource, {
  resourceToSchema,
  schemaToResource,
  TResourceFields,
  DraftResource
} from "./Resource";
import { ObjectId } from "bson";
import { TResource, TSubcategory, TNewResource } from "../../../src/types";
import { deepEqual } from "fast-equals";

export async function createDraftResource(
  resource: TResource | TNewResource
): Promise<TResource> {
  if (resource.hasOwnProperty("id")) {
    // This resource exists already; make sure the draft isn't the same
    const existingResource = await Resource.findOne({
      id: (resource as TResource).id
    }).populate("subcategories");
    if (!existingResource) {
      throw new Error(
        `This draft has an \`id\`, ${(resource as TResource).id.toHexString()} and is therefore supposed to update an existing resource; however, a resource with the draft's \`id\` doesn't exist`
      );
    }
    const updateObject = diffResources(
      schemaToResource(existingResource as TResourceFields & {
        subcategories: TSubcategory[];
      }),
      resource as TResource
    );
    console.log(JSON.stringify(updateObject, null, 2));
    if (
      !Object.keys(updateObject.left).length &&
      !Object.keys(updateObject.right).length
    ) {
      throw new Error("The new resource is the same as the existing resource");
    }
  }

  let { _id: newResourceId } = await new DraftResource(
    resourceToSchema(resource)
  ).save();

  const newDraft = await DraftResource.getByRecordId(newResourceId);
  if (!newDraft) {
    throw new Error("Could not find the new draft just created.");
  }
  return newDraft;
}
/**
 * Takes the Record ID (_id) of a draft and either creates a new Resource, or updates a Resource
 * if there already exists a Record with the same ID (id) as the draft.
 */
export async function createOrUpdateResourceFromDraft(
  draftResource: TResource | TNewResource
): Promise<TResource> {
  if (draftResource.hasOwnProperty("id")) {
    const existingResource = await Resource.findOne({
      id: (draftResource as TResource).id
    }).populate("subcategories");
    if (!existingResource) {
      throw new Error(`This draft has an \`id\`, ${(draftResource as TResource).id.toHexString()}
      } and is therefore supposed to update an existing resource; however, a resource with the draft's \`id\` doesn't exist`);
    }
    const updateObject = diffResources(
      schemaToResource(existingResource as TResourceFields & {
        subcategories: TSubcategory[];
      }),
      draftResource as TResource
    );
    // go over each subcategory the old resource was in.. if it's not in the new resource, remove it
    updateObject.left.subcategories &&
      updateObject.right.subcategories &&
      updateObject.left.subcategories.forEach(async subcategory => {
        if (
          !updateObject.right.subcategories
            .map(s => s._id.toHexString())
            .includes(subcategory._id.toHexString())
        ) {
          await removeResourceFromSubcategory(
            existingResource._id,
            subcategory._id
          );
        }
      });
    // go over each subcategory the new resource is in.. if its not in the old resource, then add it
    updateObject.left.subcategories &&
      updateObject.right.subcategories &&
      updateObject.right.subcategories.forEach(async subcategory => {
        if (
          !updateObject.left.subcategories
            .map(s => s._id.toHexString())
            .includes(subcategory._id.toHexString())
        ) {
          await addResourceToSubcategory(existingResource._id, subcategory._id);
        }
      });

    delete updateObject.right.subcategories;
    existingResource.set({
      ...resourceToSchema(updateObject.right),
      lastModifiedAt: new Date()
    });
    await existingResource.save();
    return await Resource.findOne({
      id: (draftResource as TResource).id
    })
      .populate("subcategories")
      .then(schemaToResource);
  } else {
    const subcategories = draftResource.subcategories;
    const newResource = await new Resource({
      ...resourceToSchema(draftResource),
      subcategories: []
    }).save();
    await Promise.all(
      subcategories.map(s => addResourceToSubcategory(newResource._id, s._id))
    );
    return await this.findOne({ _id: newResource._id })
      .populate("subcategories")
      .then(schemaToResource);
  }
}

export async function getSubcategoryByStub(
  stub: string
): Promise<TSubcategory | null> {
  const subcategory = await Subcategory.findOne({ stub })
    .populate("resources")
    .populate("parentCategory");
  if (!subcategory) {
    return Promise.resolve(null);
  }
  try {
    return subcategory.toObject();
  } catch (e) {
    throw new Error(e);
  }
}

export async function addResourceToSubcategory(
  resourceId: ObjectId /* Resource ObjectId */,
  subcategoryId: ObjectId /* Subcategory ObjectId */
) {
  let resource;
  let subcategory;
  try {
    resource = await Resource.findById(resourceId);
  } catch (e) {
    console.error("Error w resource:\t", e.message);
    throw e;
  }
  if (!resource)
    throw new Error(`Could not find Resource with ID ${resourceId}`);
  try {
    subcategory = await Subcategory.findById(subcategoryId);
  } catch (e) {
    console.error("Error w resource:\t", e.message);
    throw e;
  }
  if (!subcategory)
    throw new Error(`Could not find Subcategory with ID ${subcategoryId}`);

  if (
    !resource.subcategories
      .map((s: ObjectId) => s.toHexString())
      .includes(subcategoryId.toHexString())
  ) {
    try {
      resource.subcategories = [...resource.subcategories, subcategoryId];
      await resource.save();
    } catch (e) {
      console.error("Error updating Resource:\n", e.message);
      throw e;
    }
  }
  if (
    !subcategory.resources
      .map(s => s.toHexString())
      .includes(resourceId.toHexString())
  ) {
    try {
      subcategory.resources = [...subcategory.resources, resourceId];
      await subcategory.save();
    } catch (e) {
      console.error("Error updating Subcategory:\n", e.message);
      throw e;
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

  if (
    resource.subcategories
      .map((s: ObjectId) => s.toHexString())
      .includes(subcategoryId.toHexString())
  ) {
    resource.subcategories = resource.subcategories.filter(
      s => s.toHexString() !== subcategoryId.toHexString()
    );
    await resource.save();
  }
  if (
    subcategory.resources
      .map(s => s.toHexString())
      .includes(resourceId.toHexString())
  ) {
    subcategory.resources = subcategory.resources.filter(
      r => r.toHexString() !== resourceId.toHexString()
    );
    await subcategory.save();
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
    if (!deepEqual(left[fieldName], right[fieldName])) {
      (leftResult[fieldName] as any) = left[fieldName];
      (rightResult[fieldName] as any) = right[fieldName];
    }
  });

  return { left: leftResult, right: rightResult };
}
