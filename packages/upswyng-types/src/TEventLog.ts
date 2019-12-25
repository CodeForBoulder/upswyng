import { TUser } from ".";

export const EventLogKind = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  draft_deleted: null, // a draft resource was deleted
};
export type TEventLogKind = keyof typeof EventLogKind;

interface TEventLogDraftDeletedDetail {
  kind: "draft_deleted";
  resourceId: string;
  resourceName: string;
}

export type TEventLogDetail = TEventLogDraftDeletedDetail /* | TEventLogOtherEvenTDetail */;

/**
 * Represents an event in the Upswyng logs. These are product-level
 * events such as a user creating a resource, an admin triggering a
 * sync with algolia, or an admin creating an alert.
 */
export interface TEventLog<TDetail extends { kind: TEventLogKind }> {
  _id: string;
  actor: TUser;
  createdAt: Date;
  detail: TDetail;
  /** serialize the event summary */
  toSummary: () => string;
  /** serialize the event's detail for storage */
  serializeDetail: () => string;
}

/**
 * Shape of data sent over the wire.
 * Call `EventLog.parse(<TEventLogData>)` to get an `EventLog` instance.
 */
export interface TEventLogData {
  _id: string;
  actor: TUser;
  createdAt: Date;
  detail: TEventLogDetail;
  kind: TEventLogKind;
}
