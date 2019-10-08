import getUserFromRawUsers from "./getUserFromRawUsers";
import { TUser } from "../../../src/types";

export function requireAdmin(req) {
  if (!isAdmin(req))
    throw new Error("You must be an admin to perform this action.");
}

export function isAdmin(req): boolean {
  const user = getUserFromRawUsers(req);
  return user ? !!user.isAdmin : false;
}

export function requireLoggedIn(req): TUser {
  const user = getUserFromRawUsers(req);
  if (!user) throw new Error("You must be logged in to perform this action.");
  return user;
}
