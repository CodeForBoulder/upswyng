import Resource from "./Resource";
import { ObjectId } from "bson";
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
