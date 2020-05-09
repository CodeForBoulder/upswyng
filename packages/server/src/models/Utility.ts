import Resource, {
  DraftResource,
  TResourceDocument,
  resourceDocumentToResource,
  resourceToSchema,
} from "./Resource";
import Subcategory, { TSubcategoryDocument } from "./Subcategory";
import { TNewResource, TResource, TSubcategory } from "@upswyng/types";

import { ObjectId } from "bson";
import dr from "../utility/diffResources";

export const diffResources = dr;

export async function createDraftResource(
  resource: TResource | TNewResource
): Promise<TResource> {
  if (resource.hasOwnProperty("resourceId")) {
    // This resource exists already; make sure the draft isn't the same
    const existingResource = await Resource.findOne({
      resourceId: (resource as TResource).resourceId,
    }).populate("subcategories");
    if (!existingResource) {
      throw new Error(
        `This draft has an \`resourceId\`, ${JSON.stringify(
          resource
        )} and is therefore supposed to update an existing resource; however, a resource with the draft's \`resourceId\` doesn't exist`
      );
    }
    const updateObject = diffResources(
      await resourceDocumentToResource(
        existingResource as TResourceDocument & {
          subcategories: TSubcategory[];
        }
      ),
      resource as TResource
    );

    if (
      !Object.keys(updateObject.left).length &&
      !Object.keys(updateObject.right).length
    ) {
      throw new Error("The new resource is the same as the existing resource");
    }
  }
  const { _id: newResourceId } = await new DraftResource(
    resourceToSchema({
      ...resource,
      resourceId:
        (resource as TResource).resourceId || new ObjectId().toHexString(),
      createdAt: (resource as TResource).createdAt || new Date(),
      lastModifiedAt: new Date(),
      kudos: (resource as TResource).kudos || 0,
    })
  ).save();

  const newDraft = await DraftResource.getByRecordId(newResourceId);
  if (!newDraft) {
    throw new Error("Could not find the new draft just created.");
  }
  return resourceDocumentToResource(newDraft);
}

export async function addResourceToSubcategory(
  _id: ObjectId, // record id of the resource
  subcategoryId: ObjectId
) {
  let resource: TResourceDocument;
  let subcategory: TSubcategoryDocument;
  try {
    resource = await Resource.findById(_id).populate("subcategoires");
  } catch (e) {
    console.error("Error w resource:\t", e.message);
    throw e;
  }
  if (!resource) throw new Error(`Could not find Resource with ID ${_id}`);
  try {
    subcategory = await Subcategory.findById(subcategoryId).populate(
      "parentCategory"
    );
  } catch (e) {
    console.error("Error w resource:\t", e.message);
    throw e;
  }
  if (!subcategory)
    throw new Error(`Could not find Subcategory with ID ${subcategoryId}`);

  if (
    !(resource.subcategories as any)
      .map(s => s._id.toHexString())
      .includes(subcategoryId.toHexString())
  ) {
    try {
      (resource as any).subcategories = [
        ...(resource.subcategories as any).map(s => s._id),
        subcategoryId,
      ];
      await resource.save();
    } catch (e) {
      console.error("Error updating Resource:\n", e.message);
      throw e;
    }
  }
  if (
    !(subcategory.resources as ObjectId[])
      .map(s => s.toHexString())
      .includes(_id.toHexString())
  ) {
    try {
      subcategory.resources = [...(subcategory.resources as ObjectId[]), _id];
      await subcategory.save();
    } catch (e) {
      console.error("Error updating Subcategory:\n", e.message);
      throw e;
    }
  }
}

export async function removeResourceFromSubcategory(
  resourceId: ObjectId,
  subcategoryId: ObjectId
) {
  const resource = await Resource.findById(resourceId);
  if (!resource)
    throw new Error(`Could not find Resource with ID ${resourceId}`);

  const subcategory = await Subcategory.findById(subcategoryId);
  if (!subcategory)
    throw new Error(`Could not find Subcategory with ID ${subcategoryId}`);

  if (
    (resource.subcategories as any)
      .map(s => s._id.toHexString())
      .includes(subcategoryId.toHexString())
  ) {
    resource.subcategories = (resource.subcategories as any).filter(
      s => s._id.toHexString() !== subcategoryId.toHexString()
    );
    await resource.save();
  }
  if (
    (subcategory.resources as ObjectId[])
      .map(s => s.toHexString())
      .includes(resourceId.toHexString())
  ) {
    subcategory.resources = (subcategory.resources as ObjectId[]).filter(
      r => r.toHexString() !== resourceId.toHexString()
    );
    await subcategory.save();
  }
}

/**
 * Takes a draft resource and either creates a new Resource, or updates a Resource
 * if there already exists a Record with the same ID (id) as the draft.
 * @return {TResourceDocument | null} The old resource which has been updated
 */
export async function createOrUpdateResourceFromDraft(
  draftResource: TResource | TNewResource
): Promise<TResourceDocument | null> {
  const existingResource = await Resource.findOne({
    resourceId: (draftResource as TResource).resourceId,
  }).populate("subcategories");
  const resourceBeforeEdits: TResourceDocument | null = existingResource
    ? new Resource(
        resourceToSchema(await resourceDocumentToResource(existingResource))
      )
    : null;
  if (existingResource) {
    // update an existing resource
    const updateObject = diffResources(
      await resourceDocumentToResource(existingResource),
      draftResource as TResource
    );
    // go over each subcategory the old resource was in.. if it's not in the new resource, remove it
    updateObject.left.subcategories &&
      updateObject.right.subcategories &&
      updateObject.left.subcategories.forEach(async subcategory => {
        if (
          !updateObject.right.subcategories
            .map(s => s._id)
            .includes(subcategory._id)
        ) {
          await removeResourceFromSubcategory(
            existingResource._id,
            ObjectId.createFromHexString(subcategory._id)
          );
        }
      });
    // go over each subcategory the new resource is in.. if its not in the old resource, then add it
    updateObject.left.subcategories &&
      updateObject.right.subcategories &&
      updateObject.right.subcategories.forEach(async subcategory => {
        if (
          !updateObject.left.subcategories
            .map(s => s._id)
            .includes(subcategory._id)
        ) {
          await addResourceToSubcategory(
            existingResource._id,
            ObjectId.createFromHexString(subcategory._id)
          );
        }
      });

    delete updateObject.right.subcategories;
    existingResource.set({
      ...resourceToSchema(updateObject.right),
      lastModifiedAt: new Date(),
    });
    await existingResource.save();
  } else {
    const subcategories = draftResource.subcategories;
    const newResource = await new Resource({
      ...resourceToSchema(draftResource),
      subcategories: [],
    }).save();
    await Promise.all(
      subcategories.map(s =>
        addResourceToSubcategory(
          newResource._id,
          ObjectId.createFromHexString(s._id)
        )
      )
    );
  }
  return resourceBeforeEdits;
}
