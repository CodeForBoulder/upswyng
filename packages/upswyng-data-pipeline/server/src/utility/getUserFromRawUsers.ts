export default function(req) {
  const rawUsers = req.session.rawUsers || {};
  const numUsers = Object.keys(rawUsers).length;
  if (numUsers === 1) {
    return rawUsers[Object.keys(rawUsers)[0]];
  }
  if (numUsers > 1) {
    throw new Error(`More than one user is present on the session.`);
  }
  if (numUsers === 0) {
    return null;
  }
}
