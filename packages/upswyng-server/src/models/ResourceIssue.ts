import { ObjectId } from "bson";
import Resource from "./Resource";
import { TResourceIssue } from "@upswyng/upswyng-types";
import mongoose, { Schema, Document } from "mongoose";
import removeUndefinedFields from "../utility/removeUndefinedFields";
import {
  TResourceIssueKind,
  TResourceIssueDetail,
} from "@upswyng/upswyng-types";
import { ResourceIssueKind } from "@upswyng/upswyng-types";

export interface TResourceIssueDocument extends Document {
  _id: ObjectId;
  createdAt: Date;
  detail: TResourceIssueDetail;
  kind: TResourceIssueKind;
  lastModifiedAt: Date;
  resolved: boolean;
  resourceId: ObjectId; // The resource this issue pertains to, not normally populated
  severity: "low" | "medium" | "high";
}

export function resourceIssueDocumentToResourceIssue(
  d: TResourceIssueDocument
): TResourceIssue {
  const result: TResourceIssue = {
    ...d.toObject(),
    _id: d._id.toHexString(),
    resourceId: d.resourceId.toHexString(),
  };

  removeUndefinedFields(result);
  return result;
}

const ResourceIssueSchema = new Schema(
  {
    detail: {
      /* TResourceIssueDetail */
      required: true,
      type: Object,
    },
    kind: {
      enum: Object.keys(ResourceIssueKind),
      index: true,
      required: true,
      type: String,
    },
    resolved: {
      default: false,
      required: true,
      type: Boolean,
    },
    resourceId: {
      index: true,
      required: true,
      type: Schema.Types.ObjectId,
      validate: {
        validator: async function(v: ObjectId) {
          if (v.toHexString() === "000000000000000000000000") {
            throw new Error(
              "Tried to save Resource Issue with the default Resource ID"
            );
          }
          const r = await Resource.getByResourceId(v);
          if (!r) {
            throw new Error(
              `Tried to save Resource Issue with resourceId ${v.toHexString()} but there is no Resource with that ID.`
            );
          }
          return true;
        },
      },
    },
    severity: {
      required: true,
      default: "low",
      type: String,
      enum: ["low", "medium", "high"],
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "lastModifiedAt" } }
);

/**
 * Creates a new Resource Issue but DOES NOT save it.
 */
ResourceIssueSchema.statics.newWithoutResourceId = function(
  detail: TResourceIssueDetail,
  severity: "low" | "medium" | "high" = "low",
  resolved = false
): TResourceIssueDocument {
  if (!["low", "medium", "high"].includes(severity)) {
    throw new Error(
      `Error creating ResourceIssue. Received an invalid severity: ${severity}`
    );
  }

  const self = this; // eslint-disable-line @typescript-eslint/no-this-alias
  return new self({
    detail,
    kind: detail.kind,
    resolved,
    resourceId: ObjectId.createFromHexString("000000000000000000000000"),
    severity,
  }) as TResourceIssueDocument;
};

ResourceIssueSchema.statics.getForResource = async function(
  resourceId: ObjectId,
  includeResolved = false
): Promise<TResourceIssueDocument[]> {
  // ensure that a resource exists with this ID
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return await ResourceIssue.find({
    resourceId,
    resolved: { $in: [false, includeResolved] },
  }).sort({ createdAt: -1 });
};

const ResourceIssue = mongoose.model<TResourceIssueDocument>(
  "ResourceIssue",
  ResourceIssueSchema
);

export default ResourceIssue as typeof ResourceIssue & {
  /**
   * Creates a new Resource Issue but __does not__ save it. Does not include a Resource ID;
   * must be set before `save` is called.
   */
  newWithoutResourceId: (
    detail: TResourceIssueDetail,
    severity?: "low" | "medium" | "high" /* defaults to "low" */,
    resolved?: boolean /* defaults to false */
  ) => TResourceIssueDocument;
  getForResource: (
    resourceId: ObjectId,
    includeResolved?: boolean
  ) => Promise<TResourceIssueDocument[]>;
};
