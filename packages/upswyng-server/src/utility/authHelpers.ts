import { TUser } from "@upswyng/upswyng-types";
import getUserFromRawUsers from "./getUserFromRawUsers";

export function isAdmin(req): boolean {
  const user = getUserFromRawUsers(req);
  return user ? !!user.isAdmin : false;
}

export function isSuperAdmin(req): boolean {
  const user = getUserFromRawUsers(req);
  return user ? !!user.isSuperAdmin : false;
}

export function requireAdmin(req): TUser {
  if (!isAdmin(req))
    throw new Error("You must be an admin to perform this action.");
  return getUserFromRawUsers(req);
}

export function requireSuperAdmin(req): TUser {
  if (!isSuperAdmin(req))
    throw new Error("You must be a super admin to perform this action.");
  return getUserFromRawUsers(req);
}

export function requireLoggedIn(req): TUser {
  const user = getUserFromRawUsers(req);
  if (!user) throw new Error("You must be logged in to perform this action.");
  return user;
}
