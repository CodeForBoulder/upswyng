import Subcategory, {
  TSubcategoryDocument,
  subcategoryDocumentToSubcategory,
} from "./Subcategory";
import { TCategory, TSubcategory } from "@upswyng/types";
import mongoose, { Document, Schema } from "mongoose";

import { ObjectId } from "bson";
import removeUndefinedFields from "../utility/removeUndefinedFields";

export interface TCategoryDocument extends Document {
  _id: ObjectId;
  color: string;
  createdAt: Date;
  lastModifiedAt: Date;
  name: string;
  stub: string;
  subcategories: ObjectId[] | TSubcategoryDocument[];
}

export function categoryDocumentToCategory(
  d: TCategoryDocument
): TCategory | null {
  let c = d;
  if (d.toObject) {
    c = d.toObject();
  } else {
    // console.warn(
    //   `\`categoryToDocumentCategory\` received category which does not appear to be a Mongoose Document [${Object.keys(
    //     d
    //   )}]:\n${JSON.stringify(d, null, 2)}`
    // );
    if (d.hasOwnProperty("_bsontype")) {
      // console.warn("This appears to be an ObjectId");
      // console.trace();
      return null;
    }
  }

  const result = {
    ...c,
    _id: c._id.toHexString(),
    subcategories: ((c.subcategories || []) as any)
      .map(subcategoryDocumentToSubcategory)
      .filter(Boolean) as TSubcategory[],
  };
  removeUndefinedFields(result);
  return result;
}

const CategorySchema = new Schema<TCategoryDocument>({
  name: { type: String, required: true },
  stub: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: true,
  },
  color: String,
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
    },
  ],
  createdAt: { type: Date, default: Date.now, required: true },
  lastModifiedAt: { type: Date, default: Date.now, required: true },
});

CategorySchema.statics.findOrCreate = async function(
  name: string,
  stub: string,
  // only used to update the color;
  // will not create two categories if the only thing different is the color
  color?: string
): Promise<TCategoryDocument> {
  const result = await this.findOne({ name, stub }).populate("subcategories");
  if (result) {
    result.color = color;
    return result;
  } else {
    return new this({ name, stub, color, subcategories: [] });
  }
};

CategorySchema.statics.getCategoryList = async function(): Promise<
  TCategoryDocument[]
> {
  return await this.find().populate("subcategories");
};

CategorySchema.statics.getByStub = async function(
  stub: string
): Promise<TCategoryDocument | null> {
  return await this.findOne({ stub }).populate({
    path: "subcategories",
    populate: { path: "resources" },
  });
};

/**
 * Creates or finds an existing subcategory by its name and adds
 * it as a child of this category
 */
(CategorySchema.methods as any).addSubcategory = async function(
  subcategoryName: string,
  subcategoryStub: string
) {
  const subcategory = await Subcategory.findOrCreate(
    subcategoryName,
    subcategoryStub,
    this._id
  );
  await (subcategory as any).save();
  this.subcategories.push((subcategory as any)._id);
  await this.save();
};

const Category = mongoose.model<TCategoryDocument>("Category", CategorySchema);

export default Category as typeof Category & {
  findOrCreate: (
    name: string,
    stub: string,
    color?: string
  ) => Promise<TCategoryDocument>;
  getCategoryList: () => Promise<TCategoryDocument[]>;
  getByStub: (stub: string) => Promise<TCategoryDocument | null>;
};
