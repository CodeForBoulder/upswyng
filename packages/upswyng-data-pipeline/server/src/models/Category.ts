import mongoose, { Schema } from "mongoose";
import Subcategory from "./Subcategory";

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
    return Promise.resolve(result);
  } else {
    return Promise.resolve(new this({ name }));
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

const Category = mongoose.model("Category", CategorySchema);

export default Category as typeof Category & {
  findByNameOrCreate: (name: string) => Promise<Schema<any>>;
};
