import { TTimezoneName as TTimezoneName_ } from "./TTimezoneName";

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
  id: string; // database ObjectId converted to hex string
  name?: string;
  email: string;
  providers: ("facebook" | "google")[];
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

/** Event Logs */
export const EventLogKind = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  draft_deleted: null, // a draft resource was deleted
};
export type TEventLogKind = keyof typeof EventLogKind;

// TODO (rhinodavid): Add other types of events (Draft Created, User Events)
interface TEventLogDraftApprovedDetail {
  kind: "draft_approved";
  resourceId: string;
  resourceName: string;
  // The diff of the resource before and after the draft was approved.
  diff: { left: Partial<TResource>; right: Partial<TResource> };
}

interface TEventLogDraftDeletedDetail {
  kind: "draft_deleted";
  resourceId: string;
  resourceName: string;
}

export type TEventLogDetail =
  | TEventLogDraftApprovedDetail
  | TEventLogDraftDeletedDetail;

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

/** Resource Issue */
export const ResourceIssueKind = {
  legacy_schedule_parsing_error: null, // eslint-disable-line @typescript-eslint/camelcase
};

export type TResourceIssueKind = keyof typeof ResourceIssueKind;

export interface TLegacyScheduleParsingErrorDetails {
  kind: "legacy_schedule_parsing_error";
  legacySchedule: string; // stringified legacy schedule
  legacyClosesSchedule: string; // stringified legacy closes schedule
}

export type TResourceIssueDetail = TLegacyScheduleParsingErrorDetails;

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
