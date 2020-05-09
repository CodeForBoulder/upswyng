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
