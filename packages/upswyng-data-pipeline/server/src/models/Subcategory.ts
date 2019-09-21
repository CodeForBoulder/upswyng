import mongoose, { Schema, Document, Types } from "mongoose";
import Resource from "./Resource";
import { ObjectId } from "bson";
import { TSubcategory } from "../../../src/types";

export interface TSubcategoryFields extends Document {
  createdAt: Date;
  lastModifiedAt: Date;
  name: string;
  parentCategory: ObjectId;
  resources: ObjectId[];
  stub: string;
}

const SubcategorySchema = new Schema({
  name: { type: String, required: true },
  stub: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: true
  },
  parentCategory: { type: Schema.Types.ObjectId, ref: "Category" },
  resources: [
    {
      // corresponds to the `Resource.id` (note: NOT `Resource._id`)
      type: Schema.Types.ObjectId,
      ref: "Resource"
    }
  ],
  createdAt: { type: Date, default: Date.now, required: true },
  lastModifiedAt: { type: Date, default: Date.now, required: true }
});

SubcategorySchema.statics.findOrCreate = async function(
  name: string,
  stub: string,
  parentCategory: Schema.Types.ObjectId
) {
  const result = await this.findOne({ name, stub, parentCategory });
  if (result) {
    return result;
  } else {
    return new this({ name, stub, parentCategory });
  }
};

SubcategorySchema.statics.getByStub = async function(stub: string) {
  const subcategory = await this.findOne({ stub });
  if (!subcategory) {
    return Promise.resolve(null);
  }
  try {
    const resources = await Promise.all([
      ...subcategory.resources.map(r =>
        Resource.findOne({ id: new Types.ObjectId(r.id) })
      )
    ]);
    subcategory.resources = resources;
    return subcategory;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

SubcategorySchema.statics.getSubcategoryList = async function(
  includeResources = false
) {
  const records = await this.find().populate('parentCategory');
  if (includeResources) {
    throw new Error("Unimplemented");
  } else {
    return records.map(r => {
      delete r.resources;
      return r;
    });
  }
};

const Subcategory = mongoose.model<TSubcategoryFields>(
  "Subcategory",
  SubcategorySchema
);

export default Subcategory as typeof Subcategory & {
  findOrCreate: (
    name: string,
    stub: string,
    parentCategory: Schema.Types.ObjectId
  ) => Promise<Schema<TSubcategoryFields>>;
  getByStub: (stub: string) => Promise<Schema<TSubcategoryFields> | null>;
  getSubcategoryList: (includeResources?: boolean) => Promise<TSubcategory[]>;
};
