import mongoose, { Schema, Document } from "mongoose";
import Subcategory from "./Subcategory";

export interface TCategoryFields extends Document {
  name: string;
  color: string;
  subcategories: Schema.Types.ObjectId[];
  createdAt: Date;
  lastModifiedAt: Date;
}

const CategorySchema = new Schema({
  name: { type: String, required: true, index: true, unique: true },
  color: String,
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subcategory"
    }
  ],
  createdAt: { type: Date, default: Date.now, required: true },
  lastModifiedAt: { type: Date, default: Date.now, required: true }
});

CategorySchema.statics.findByNameOrCreate = async function(name: string) {
  const result = await this.findOne({ name });
  if (result) {
    return result;
  } else {
    return new this({ name });
  }
};

/**
 * Creates or finds an existing subcategory by its name and adds
 * it as a child of this category
 */
CategorySchema.methods.addSubcategory = async function(
  subcategoryName: string
) {
  const subcategory = await Subcategory.findByNameOrCreate(subcategoryName);
  await (subcategory as any).save();
  this.subcategories.push((subcategory as any)._id);
  return this.save();
};

const Category = mongoose.model<TCategoryFields>("Category", CategorySchema);

export default Category as typeof Category & {
  findByNameOrCreate: (name: string) => Promise<Schema<TCategoryFields>>;
};
