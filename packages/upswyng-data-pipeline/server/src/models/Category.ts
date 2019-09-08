import mongoose, { Schema, Document } from "mongoose";
import Subcategory from "./Subcategory";

export interface TCategoryFields extends Document {
  color: string;
  createdAt: Date;
  lastModifiedAt: Date;
  name: string;
  stub: string;
  subcategories: Schema.Types.ObjectId[];
}

const CategorySchema = new Schema({
  name: { type: String, required: true },
  stub: { type: String, lowercase: true, required: true, trim: true, unique: true },
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

CategorySchema.statics.findOrCreate = async function(name: string, stub: string) {
  const result = await this.findOne({ name, stub });
  if (result) {
    return result;
  } else {
    return new this({ name, stub });
  }
};

CategorySchema.statics.getCategoryList = async function() {
  return await this.find();
};

/**
 * Creates or finds an existing subcategory by its name and adds
 * it as a child of this category
 */
CategorySchema.methods.addSubcategory = async function(
  subcategoryName: string, subcategoryStub:string
) {
  const subcategory = await Subcategory.findOrCreate(subcategoryName, subcategoryStub);
  await (subcategory as any).save();
  this.subcategories.push((subcategory as any)._id);
  return this.save();
};

const Category = mongoose.model<TCategoryFields>("Category", CategorySchema);

export default Category as typeof Category & {
  findOrCreate: (name: string, stub: string) => Promise<Schema<TCategoryFields>>;
  getCategoryList: () => Promise<{ name: string; color: string, stub: string }[]>;
};
