import mongoose, { Schema, Document } from "mongoose";

export interface TSubcategoryFields extends Document {
  createdAt: Date;
  lastModifiedAt: Date;
  name: string;
  parentCategory: Schema.Types.ObjectId;
  resources: Schema.Types.ObjectId[];
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

const Subcategory = mongoose.model<TSubcategoryFields>(
  "Subcategory",
  SubcategorySchema
);

export interface TSubcategory extends mongoose.Model<TSubcategoryFields, {}> {
  findOrCreate: (
    name: string,
    stub: string,
    parentCategory: Schema.Types.ObjectId
  ) => Promise<Schema<TSubcategoryFields>>;
}

export default Subcategory as TSubcategory;
