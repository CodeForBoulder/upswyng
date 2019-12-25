import { TTimezoneName as TTimezoneName_ } from "./TTimezoneName";
import {
  EventLogKind as EventLogKind_,
  TEventLog as TEventLog_,
  TEventLogKind as TEventLogKind_,
  TEventLogData as TEventLogData_,
  TEventLogDetail as TEventLogDetail_,
} from "./TEventLog";
import {
  TResourceIssue as TResourceIssue_,
  TResourceIssueDetail as TResourceIssueDetail_,
  TResourceIssueKind as TResourceIssueKind_,
  ResourceIssueKind as ResourceIssueKind_,
  TLegacyScheduleParsingErrorDetails as TLegacyScheduleParsingErrorDetails_,
} from "./TResourceIssue";
import { TUser as TUser_ } from "./TUser";

export const ResourceIssueKind = ResourceIssueKind_;
export type TLegacyScheduleParsingErrorDetails = TLegacyScheduleParsingErrorDetails_;
export type TResourceIssue = TResourceIssue_;
export type TResourceIssueDetail = TResourceIssueDetail_;
export type TResourceIssueKind = TResourceIssueKind_;
export type TUser = TUser_;

export type TDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

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

export type TTimezoneName = TTimezoneName_;

export const EventLogKind = EventLogKind_;
export type TEventLogKind = TEventLogKind_;
export type TEventLog<TData extends { kind: TEventLogKind }> = TEventLog_<
  TData
>;
export type TEventLogData = TEventLogData_;
export type TEventLogDetail = TEventLogDetail_;
