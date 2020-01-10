import User, { userDocumentToUser } from "../../models/User";

import { requireAdmin } from "../../utility/authHelpers";

/**
 * API endpoint to query Users. Request body should have the following options:
 * {
 *   limit: number, // default 20
 *   offset: number, // default 0
 * }
 *
 * The response has the shape of:
 * {
 *   estimatedTotal: number, // An estimate of the total number of Users
 *   users: TUser[], // Users which match the query
 * }
 */
export async function post(req, res, _next) {
  try {
    requireAdmin(req);
  } catch {
    res.writeHead(401, {
      "Content-Type": "application/json",
    });
    return res.end(
      JSON.stringify({
        message: `You are not authorized to view Users`,
      })
    );
  }

  const limit = req.body.limit || 20;
  const offset = req.body.offset || 0;

  try {
    const users = await User.find({})
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 });

    const estimatedTotal = await User.find().estimatedDocumentCount();

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        estimatedTotal,
        users: users.map(userDocumentToUser),
      })
    );
  } catch (e) {
    res.writeHead(500, {
      "Content-Type": "application/json",
    });
    return res.end(
      JSON.stringify({
        message: `Error getting Users: ${e.message}`,
      })
    );
  }
}
