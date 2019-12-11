import { ObjectId } from "bson";
import { THotline } from "@upswyng/upswyng-types";
import mongoose, { Schema, Document } from "mongoose";
import removeUndefinedFields from "../utility/removeUndefinedFields";

export interface THotlineDocument extends Document {
  // TODO: Add Schedule
  chatWebsite: string;
  createdAt: Date;
  description: string;
  lastModifiedAt: Date;
  name: string;
  phone: string;
  text: string; // ex: "Text to 838255",
  website: string;
}

export function hotlineDocumentToHotline(d: THotlineDocument): THotline | null {
  let h = d;
  if (d.toObject) {
    h = d.toObject();
  } else {
    console.warn(
      `\`hotlineDocumentToHotline\` received hotline which does not appear to be a Mongoose Document [${Object.keys(
        d
      )}]:\n${JSON.stringify(d, null, 2)}`
    );
    return null;
  }
  const result: THotline = {
    ...h,
    _id: (h._id as ObjectId).toHexString(),
  };
  removeUndefinedFields(result);
  return result;
}

const HotlineSchema = new Schema(
  {
    chatWebsite: { type: String },
    description: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    text: { type: String },
    website: { type: String },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "lastModifiedAt" } }
);

HotlineSchema.statics.getAll = async function(): Promise<THotlineDocument[]> {
  return await this.find({});
};

const HotlineModel = mongoose.model<THotlineDocument>("Hotline", HotlineSchema);

export default HotlineModel as typeof HotlineModel & {
  getAll: () => Promise<THotlineDocument[]>;
};
