import mongoose, { Schema, Document } from "mongoose";

export interface TSubcategoryFields extends Document {
  name: string;
  resources: Schema.Types.ObjectId[];
  createdAt: Date;
  lastModifiedAt: Date;
}

const SubcategorySchema = new Schema({
  name: { type: String, required: true, index: true, unique: true },
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

SubcategorySchema.statics.findByNameOrCreate = async function(name: string) {
  const result = await this.findOne({ name });
  if (result) {
    return result;
  } else {
    return new this({ name });
  }
};

const Subcategory = mongoose.model<TSubcategoryFields>(
  "Subcategory",
  SubcategorySchema
);

export interface TSubcategory extends mongoose.Model<TSubcategoryFields, {}> {
  findByNameOrCreate: (name: string) => Promise<Schema<TSubcategoryFields>>;
}

export default Subcategory as TSubcategory;
