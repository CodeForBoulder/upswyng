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
