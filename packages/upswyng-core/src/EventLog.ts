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
    return new EventLog(s._id, s.actor, s.detail, s.createdAt);
  }

  constructor(_id: string, actor: TUser, detail: T, createdAt?: Date) {
    this.actor = actor;
    this.detail = detail;
    this.createdAt = createdAt || new Date();
    this._id = _id;
  }

  toSummary(): string {
    switch (this.detail.kind) {
      case "draft_deleted":
        return `${
          this.actor.name ? this.actor.name : this.actor.email
        } deleted a draft of ${this.detail.resourceName} [Resource ID: ${
          this.detail.resourceId
        }]`;
      case "draft_approved":
        return `${
          this.actor.name ? this.actor.name : this.actor.email
        } approved a draft of ${this.detail.resourceName} [Resource ID: ${
          this.detail.resourceId
        }]`;
      default:
        assertUnreachable(this.detail.kind);
    }
  }
}

export default EventLog;
