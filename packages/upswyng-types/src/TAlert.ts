import { TUser } from "./TUser";

/**
 * Represents an alert which will be shown to users of Upswyng over a time period.
 * This is the format that will be sent over the API to clients.
 */
export interface TAlert {
  _id: string;
  category: string | null;
  color: string; // Hex string, eg #FF11BB
  detail: string | null;
  end: Date;
  icon: string; // fontawesome icon identifier; ex: "fas fa-snowflake"
  start: Date;
  title: string;
}

/**
 * Full information about the alert used on the server/provider side
 */
export interface TAlertFull extends TAlert {
  createdAt: Date;
  createdBy: TUser;
  isApproved: boolean; // will be auto-approved for manually created entries, but can be set to `false` for alerts created by a bot
  isCancelled: boolean;
  lastModifiedAt: Date;
  lastModifiedBy: TUser;
}
