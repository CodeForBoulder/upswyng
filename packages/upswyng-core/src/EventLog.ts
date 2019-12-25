import { ObjectId } from "bson";
import { TUser, TEventLogDetail, TEventLogData } from "@upswyng/upswyng-types";

function assertUnreachable(_x: never): never {
  throw new Error("Didn't expect to get here");
}

class EventLog<T extends TEventLogDetail> {
  _id: string;
  actor: TUser;
  detail: T;
  createdAt: Date;

  static async parse(s: TEventLogData): Promise<EventLog<TEventLogDetail>> {
    return new EventLog(s.actor, s.detail, s.createdAt, s._id);
  }

  constructor(actor: TUser, detail: T, createdAt?: Date, _id?: string) {
    this.actor = actor;
    this.detail = detail;
    this.createdAt = createdAt || new Date();
    this._id = _id || new ObjectId().toHexString();
  }

  toSummary(): string {
    switch (this.detail.kind) {
      case "draft_deleted":
        return `Draft for ${this.detail.resourceName} [${
          this.detail.resourceId
        }] was deleted by ${
          this.actor.name ? this.actor.name : this.actor.email
        }`;
      default:
        assertUnreachable(this.detail.kind);
    }
  }
}

export default EventLog;
