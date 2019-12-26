import { TUser } from "@upswyng/upswyng-types";
import getUserFromRawUsers from "./getUserFromRawUsers";

export function isAdmin(req): boolean {
  const user = getUserFromRawUsers(req);
  return user ? !!user.isAdmin : false;
}

export function requireAdmin(req): TUser {
  if (!isAdmin(req))
    throw new Error("You must be an admin to perform this action.");
  return getUserFromRawUsers(req);
}

export function requireLoggedIn(req): TUser {
  const user = getUserFromRawUsers(req);
  if (!user) throw new Error("You must be logged in to perform this action.");
  return user;
}
