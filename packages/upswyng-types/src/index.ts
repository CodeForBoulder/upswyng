import { TTimezoneName as TTimezoneName_ } from "./TTimezoneName";

export interface TAlgoliaHit {
  objectID: string;
  name: string;
  description: string;
  subcategories: string;
}

export type TDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface TCategory {
  _id: string;
  color: string;
  createdAt: Date;
  lastModifiedAt: Date;
  name: string;
  stub: string;
  subcategories?: TSubcategory[];
}

export interface TSubcategory {
  _id: string;
  createdAt: Date;
  lastModifiedAt: Date;
  name: string;
  parentCategory: TCategory;
  resources?: TResource[]; // not returned unless specifically asked for
  stub: string;
}

export interface TResource {
  _id: string; // DO NOT normally reference this, use `resourceId`
  address: TAddress;
  createdAt: Date;
  createdBy?: TUser; // id of the user who created this
  deleted: boolean; // We leave entries in the DB so they don't get resynced from Strapped, but for all intents & purposes this resource doesn't exist.
  description: string;
  kudos: number;
  lastModifiedAt: Date;
  lastModifiedBy?: TUser;
  latitude: number | null;
  legacyId?: string; // ID from strappd
  longitude: number | null;
  name: string;
  phone: string;
  resourceId: string; // the canonical upswyng id for the resource; this is probably the one you want
  schedule: TResourceScheduleData; // sent over the wire as a string; call `ResourceSchedule.parse(<TResourceScheduleJson>)` to get the `ResourceSchedule` instance
  services: string[]; // maps from servicetype
  subcategories: TSubcategory[];
  website: string;
}

export interface TLegacyResource {
  address1: string;
  address2: string;
  approved: 0 | 1;
  category: string;
  charityname: string;
  city: string;
  closeschedule: TLegacyCloseSchedule[];
  description: string;
  kudos: number;
  lat: number;
  lng: number;
  phone: string;
  schedule: TLegacySchedule[];
  selectedAll: boolean;
  service: string;
  servicetype: string;
  showflag: boolean;
  state: string;
  updateshelter: string;
  useremail: string;
  userid: string;
  website: string;
  zip: string;
}

export interface TAddress {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
}

/**
 * The data needed to hydrate a `ResourceSchedule` instance.
 * ex:
 * const s: TResourceScheduleData = await fetchData(.....);
 * const rs: ResourceSchedule = ResourceSchedule.parse(s);
 */
export interface TResourceScheduleData {
  _items: {
    comment: string;
    fromTime: string;
    recurrenceRule: string;
    toTime: string;
  }[];
  alwaysOpen: boolean;
  timezone: TTimezoneName;
}

// Data needed to create a new resource; these fields will be automatically
// assigned upon creation
export type TNewResource = Omit<
  TResource,
  | "_id"
  | "createdAt"
  | "deleted"
  | "id"
  | "kudos"
  | "legacyId"
  | "lastModifiedAt"
>;

export interface TIconProps {
  color?: string;
}

export enum TStatusFetch {
  STATUS_NOT_FETCHED = "NOT_FETCHED",
  STATUS_FETCHING = "FETCHING",
  STATUS_FETCH_SUCCESS = "FETCH_SUCCESS",
  STATUS_FETCH_ERROR = "FETCH_ERROR",
}

interface TScheduleBase {
  _id?: string;
  day?: TDay;
  date?: string;
  period?: TSchedulePeriod;
  from?: string;
  to?: string;
}

export interface TSchedule extends TScheduleBase {
  scheduleType: TScheduleType;
}

export type TScheduleType = "Weekly" | "Monthly" | "Open 24/7" | "Date Range";
export type TCloseScheduleType = TScheduleType | "Permanently Closed";

export interface TCloseSchedule extends TScheduleBase {
  scheduleType: TCloseScheduleType;
}

interface TLegacyScheduleBase {
  day?: TDay;
  date?: string;
  period?: TSchedulePeriod;
  fromstring?: string;
  tostring?: string;
}

export interface TLegacySchedule extends TLegacyScheduleBase {
  type: TScheduleType;
}

interface TLegacyCloseSchedule extends TLegacyScheduleBase {
  type: TCloseScheduleType;
}

export type TSchedulePeriod =
  | "Last"
  | "First"
  | "Second"
  | "Third"
  | "Fourth"
  | "Fifth";

export interface THotline {
  _id: string;
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

export interface TUser {
  _id: string; // database ObjectId converted to hex string
  name?: string;
  email: string;
  providers: ("facebook" | "google" | "slack")[];
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

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
}

/** Resource Issue */
export const ResourceIssueKind = {
  legacy_schedule_parsing_error: null, // eslint-disable-line @typescript-eslint/camelcase
  user_report: null, // eslint-disable-line @typescript-eslint/camelcase
};

export type TResourceIssueKind = keyof typeof ResourceIssueKind;

export interface TLegacyScheduleParsingErrorDetails {
  kind: "legacy_schedule_parsing_error";
  legacySchedule: string; // stringified legacy schedule
  legacyClosesSchedule: string; // stringified legacy closes schedule
}

export interface TUserReportDetails {
  kind: "user_report";
  detailExplanation?: string; // text the user writes in a 'detail'
  reportedIssues: string[]; // "Schedule Incorrect, WebsiteInop"
}

export type TResourceIssueDetail =
  | TLegacyScheduleParsingErrorDetails
  | TUserReportDetails;

export interface TResourceIssue {
  _id: string;
  createdAt: Date;
  detail: TResourceIssueDetail;
  kind: TResourceIssueKind; // needs to match the "kind" in "detail"
  lastModifiedAt: Date;
  resolved: boolean; // initally `false`, then set to `true` once the issue is fixed
  resourceId: string;
  severity: "low" | "medium" | "high";
}

// Exports
export type TTimezoneName = TTimezoneName_;
