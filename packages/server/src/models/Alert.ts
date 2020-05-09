import { TAlert, TAlertFull } from "@upswyng/types";
import User, { TUserDocument } from "./User";
import mongoose, { Document, Schema } from "mongoose";

import { ObjectId } from "bson";
import removeUndefinedFields from "../utility/removeUndefinedFields";
import { userDocumentToUser } from "./User";

export interface TAlertDocument extends Document {
  _id: ObjectId;
  category: string | null;
  createdAt: Date;
  createdBy: ObjectId | TUserDocument;
  color: string;
  detail: string | null;
  end: Date;
  isApproved: boolean;
  isCancelled: boolean;
  icon: string;
  lastModifiedAt: Date;
  lastModifiedBy: ObjectId | TUserDocument;
  start: Date;
  title: string;
  wasProcessed: boolean;
}

export function fullAlertToAlert(alert: TAlertFull): TAlert {
  const a = Object.assign({}, alert);
  delete a.createdAt;
  delete a.createdBy;
  delete a.isCancelled;
  delete a.isApproved;
  delete a.lastModifiedAt;
  delete a.lastModifiedBy;
  return a;
}

export async function alertDocumentToFullAlert(
  u: TAlertDocument
): Promise<TAlertFull> {
  const result = u.toObject();
  if (!result.createdBy.hasOwnProperty("_id")) {
    const createdBy = userDocumentToUser(await User.findById(result.createdBy));
    if (!createdBy) {
      throw new Error(
        `While retreiving an alert, could not find the user who created the alert (ID: ${result.createdBy})`
      );
    }
    result.createdBy = createdBy;
  }
  if (!result.lastModifiedBy.hasOwnProperty("_id")) {
    const lastModifiedBy = userDocumentToUser(
      await User.findById(result.lastModifiedBy)
    );
    if (!lastModifiedBy) {
      throw new Error(
        `While retreiving an alert, could not find the user who last modified the alert (ID: ${result.lastModifiedBy})`
      );
    }
    result.lastModifiedBy = lastModifiedBy;
  }
  result._id = (result._id as ObjectId).toHexString();
  removeUndefinedFields(result);
  return result as TAlertFull;
}

const AlertSchema = new Schema(
  {
    category: { type: String, required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    color: { type: String, required: true },
    detail: { type: String },
    end: { type: Date, required: true, index: true },
    icon: { type: String, required: true },
    isApproved: { type: Boolean, default: true }, // for bots, may be false
    isCancelled: { type: Boolean, default: false },
    lastModifiedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    wasProcessed: { type: Boolean, default: false },
    start: { type: Date, required: true, index: true },
    title: { type: String, required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "lastModifiedAt" } }
);

/**
 * Fetches the alerts that are currently active
 */
AlertSchema.statics.genActiveAlerts = async function(now = new Date()) {
  const results: Array<TAlertDocument> = await this.find({
    end: { $gte: now },
  });

  return results
    .filter(x => x.isCancelled === false)
    .filter(x => x.isApproved === true)
    .filter(x => x.start <= now);
};

const Alert = mongoose.model<TAlertDocument>("Alert", AlertSchema);

export default Alert as typeof Alert & {
  /**
   * Fetch the active alerts. `now` pararameter provided for testing purposes.
   */
  genActiveAlerts: (now: Date | undefined) => Promise<Array<TAlertDocument>>;
};
