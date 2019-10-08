import { TUser } from "../../../src/types";

export default function(req): TUser | null {
  const rawUsers = req.session.rawUsers || {};
  const numUsers = Object.keys(rawUsers).length;
  if (numUsers === 1) {
    return rawUsers[Object.keys(rawUsers)[0]];
  }
  if (numUsers > 1) {
    console.warn(
      `More than one user is present on the session. Using first user.`
    );
    return rawUsers[Object.keys(rawUsers)[0]];
  }
  if (numUsers === 0) {
    return null;
  }
}
