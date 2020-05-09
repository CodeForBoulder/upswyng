import { EventLogKind, TEventLog, TEventLogDetail } from "@upswyng/types";
import { TUserDocument, userDocumentToUser } from "./User";
import mongoose, { Document, Schema } from "mongoose";

import { ObjectId } from "bson";
import removeUndefinedFields from "../utility/removeUndefinedFields";

export interface TEventLogDocument extends Document {
  _id: ObjectId;
  actor: TUserDocument;
  createdAt: Date;
  detail: TEventLogDetail;
  kind: EventLogKind;
  wasProcessed: boolean;
}

export function eventLogDocumentToEventLog(d: TEventLogDocument): TEventLog {
  const result: TEventLog = {
    ...d.toObject(),
    _id: d._id.toHexString(),
    actor: userDocumentToUser(d.actor),
  };

  removeUndefinedFields(result);
  return result;
}

const EventLogSchema = new Schema(
  {
    actor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    detail: {
      /* TEventLogDetail */
      required: true,
      type: Object,
    },
    kind: {
      enum: Object.values(EventLogKind),
      index: true,
      required: true,
      type: String,
    },
    wasProcessed: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "createdAt" } }
);

const EventLog = mongoose.model<TEventLogDocument>("EventLog", EventLogSchema);

export default EventLog as typeof EventLog & {};
