import { TResource } from "./TResource";
import { TResourceIssueKind } from "./TResourceIssue";
import { TUser } from "./TUser";

/** Event Logs */
export const EventLogKind = {
  /* eslint-disable @typescript-eslint/camelcase */
  draft_approved: null, // a draft resource was approved
  draft_created: null,
  draft_deleted: null, // a draft resource was deleted
  resource_issue_reopened: null,
  resource_issue_resolved: null,
  user_permission_changed: null,
  /* eslint-enable @typescript-eslint/camelcase */
};
export type TEventLogKind = keyof typeof EventLogKind;

interface TEventLogUserPermissionChangedDetail {
  isAdminNew: boolean;
  isAdminOld: boolean;
  isSuperAdminNew: boolean;
  isSuperAdminOld: boolean;
  kind: "user_permission_changed";
  modifiedUserId: string; // the ID of the user whose permissions are changing
}

interface TEventLogDraftApprovedDetail {
  // The diff of the resource before and after the draft was approved.
  // Won't be populated if `newResource` is true.
  diff?: { left: Partial<TResource>; right: Partial<TResource> };
  kind: "draft_approved";
  newResource: boolean; // no resource previously existed
  resourceId: string;
  resourceName: string;
}

interface TEventLogDraftCreatedDetail {
  draftId: string; // `_id` of the draft
  kind: "draft_created";
  newResource: boolean; // no resource previously existed
  resourceId: string;
  resourceName: string;
}

interface TEventLogDraftDeletedDetail {
  kind: "draft_deleted";
  resourceId: string;
  resourceName: string;
}

interface TEventLogResourceIssueReopenedDetail {
  kind: "resource_issue_reopened";
  resourceId: string;
  resourceName: string;
  resourceIssueKind: TResourceIssueKind;
  resourceIssueId: string;
  resourceIssueSeverity: "low" | "medium" | "high";
}

interface TEventLogResourceIssueResolvedDetail {
  kind: "resource_issue_resolved";
  resourceId: string;
  resourceName: string;
  resourceIssueKind: TResourceIssueKind;
  resourceIssueId: string;
  resourceIssueSeverity: "low" | "medium" | "high";
}

export type TEventLogDetail =
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
  actor: TUser;
  createdAt: Date;
  detail: TEventLogDetail;
  kind: TEventLogKind;
  wasProcessed: boolean; // intially false, then true once the start time has come and the worker has processed the event and sent notifications
}
