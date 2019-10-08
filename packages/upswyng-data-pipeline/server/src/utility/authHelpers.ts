import getUserFromRawUsers from "./getUserFromRawUsers";

export function requireAdmin(req) {
  const user = getUserFromRawUsers(req);
  const admin = user ? !!user.isAdmin : false;
  if (!admin) throw new Error("You must be an admin to perform this action.");
}
