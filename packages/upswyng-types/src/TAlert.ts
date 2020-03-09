import { TUser } from "@upswyng/upswyng-types";

/**
 * Represents an alert which will be shown to users of Upswyng over a time period.
 */

export interface TAlert {
  _id: string;
  title: string;
  start: Date;
  end: Date;
  detail: string | null;
  isCancelledEarly: boolean;
  createdBy: TUser;
  lastModifiedBy: TUser;
}
