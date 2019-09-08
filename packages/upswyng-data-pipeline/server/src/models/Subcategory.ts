import mongoose, { Schema } from "mongoose";

const SubcategorySchema = new Schema({
  name: { type: String, required: true, index: true, unique: true },
  resources: [
    {
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
    return Promise.resolve(new this({ name }));
  }
};

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);

export default Subcategory as typeof Subcategory & {
  findByNameOrCreate: (name: string) => Promise<Schema<any>>;
};
