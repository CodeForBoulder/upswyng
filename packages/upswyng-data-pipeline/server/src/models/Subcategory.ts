import { ObjectId } from "mongodb";
import { TSubcategory, TCategory, TResource } from "../../../src/types";
import mongoose, { Schema, Document } from "mongoose";
import { TCategoryDocument, categoryDocumentToCategory } from "./Category";
import { TResourceDocument } from "./Resource";
import removeUndefinedFields from "../utility/removeUndefinedFields";

export interface TSubcategoryDocument extends Document {
  _id: ObjectId;
  createdAt: Date;
  lastModifiedAt: Date;
  name: string;
  parentCategory: TCategoryDocument; // we always call `populate` on parent category
  resources: ObjectId[] | TResourceDocument[];
  stub: string;
}

export function subcategoryDocumentToSubcategory(
  d: TSubcategoryDocument
): TSubcategory {
  const s = d.toObject();
  const result = {
    ...s,
    _id: s._id.toHexString(),
    parentCategory: categoryDocumentToCategory(s.parentCategory),
  };
  removeUndefinedFields(result);
  return result;
}

const SubcategorySchema = new Schema({
  name: { type: String, required: true },
  stub: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: true,
  },
  parentCategory: { type: Schema.Types.ObjectId, ref: "Category" },
  resources: [
    {
      // corresponds to the `Resource.id` (note: NOT `Resource._id`)
      type: Schema.Types.ObjectId,
      ref: "Resource",
    },
  ],
  createdAt: { type: Date, default: Date.now, required: true },
  lastModifiedAt: { type: Date, default: Date.now, required: true },
});

SubcategorySchema.statics.findOrCreate = async function(
  name: string,
  stub: string,
  parentCategoryId: Schema.Types.ObjectId
) {
  const result = await this.findOne({ name, stub, parentCategoryId }).populate(
    "parentCategory"
  );
  return result || new this({ name, stub, parentCategoryId });
};

SubcategorySchema.statics.getSubcategoryList = async function(
  includeResources: boolean = false
) {
  if (includeResources) {
    return await this.find()
      .populate("parentCategory")
      .populate("resources");
  }
  return await this.find()
    .populate("parentCategory")
    .map(r => {
      delete r.resources;
      return r;
    });
};

SubcategorySchema.statics.getByStub = async function(
  stub: string
): Promise<TSubcategoryDocument | null> {
  return await this.find({ stub })
    .populate("parentCategory")
    .populate("resources");
};

const Subcategory = mongoose.model<TSubcategoryDocument>(
  "Subcategory",
  SubcategorySchema
);

export default Subcategory as typeof Subcategory & {
  findOrCreate: (
    name: string,
    stub: string,
    parentCategoryId: ObjectId
  ) => Promise<TSubcategoryDocument>;
  getByStub: (stub: string) => Promise<TSubcategoryDocument | null>;
  getSubcategoryList: (
    includeResources?: boolean
  ) => Promise<TSubcategoryDocument[]>;
};
