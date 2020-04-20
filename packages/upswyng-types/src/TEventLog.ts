import { TResource } from "./TResource";
import { TResourceIssueKind } from "./TResourceIssue";
import { TUser } from "./TUser";

/** Event Logs */
export enum EventLogKind {
  AlertLive = "alert_live",
  DraftApproved = "draft_approved", // a draft resource was approved
  DraftCreated = "draft_created",
  DraftDeleted = "draft_deleted", // a draft resource was deleted
  ResourceIssueReopened = "resource_issue_reopened",
  ResourceIssueResolved = "resource_issue_resolved",
  UserPermissionChanged = "user_permission_changed",
}

interface TEventLogAlertLiveDetail {
  alertId: string;
  alertTitle: string;
  kind: EventLogKind.AlertLive;
}

interface TEventLogUserPermissionChangedDetail {
  isAdminNew: boolean;
  isAdminOld: boolean;
  isSuperAdminNew: boolean;
  isSuperAdminOld: boolean;
  kind: EventLogKind.UserPermissionChanged;
  modifiedUserId: string; // the ID of the user whose permissions are changing
}

interface TEventLogDraftApprovedDetail {
  // The diff of the resource before and after the draft was approved.
  // Won't be populated if `newResource` is true.
  diff?: { left: Partial<TResource>; right: Partial<TResource> };
  kind: EventLogKind.DraftApproved;
  newResource: boolean; // no resource previously existed
  resourceId: string;
  resourceName: string;
}

interface TEventLogDraftCreatedDetail {
  draftId: string; // `_id` of the draft
  kind: EventLogKind.DraftCreated;
  newResource: boolean; // no resource previously existed
  resourceId: string;
  resourceName: string;
}

interface TEventLogDraftDeletedDetail {
  kind: EventLogKind.DraftDeleted;
  resourceId: string;
  resourceName: string;
}

interface TEventLogResourceIssueReopenedDetail {
  kind: EventLogKind.ResourceIssueReopened;
  resourceId: string;
  resourceName: string;
  resourceIssueKind: TResourceIssueKind;
  resourceIssueId: string;
  resourceIssueSeverity: "low" | "medium" | "high";
}

interface TEventLogResourceIssueResolvedDetail {
  kind: EventLogKind.ResourceIssueResolved;
  resourceId: string;
  resourceName: string;
  resourceIssueKind: TResourceIssueKind;
  resourceIssueId: string;
  resourceIssueSeverity: "low" | "medium" | "high";
}

export type TEventLogDetail =
  | TEventLogAlertLiveDetail
  | TEventLogDraftApprovedDetail
  | TEventLogDraftCreatedDetail
  | TEventLogDraftDeletedDetail
  | TEventLogResourceIssueReopenedDetail
  | TEventLogResourceIssueResolvedDetail
  | TEventLogUserPermissionChangedDetail;

/**
 * A record we keep when something happens.
 */
export interface TEventLog {
  _id: string;
  actor: TUser; // the user who initiated the action which caused th eevent
  createdAt: Date;
  detail: TEventLogDetail;
  kind: EventLogKind;
  wasProcessed: boolean; // intially false, then true once the start time has come and the worker has processed the event and sent notifications
}
