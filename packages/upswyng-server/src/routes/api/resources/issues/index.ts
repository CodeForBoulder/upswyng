import ResourceIssue, {
  resourceIssueDocumentToResourceIssue,
} from "../../../../models/ResourceIssue";

import { requireAdmin } from "../../../../utility/authHelpers";

/**
 * API endpoint to get a list of Resource Issues. Request body should have the following options:
 * {
 *   includeResolved: boolean, // default false,
 *   limit: number, // default 20
 *   minimumSeverity: "low" | "medium" | "high", // default low
 *   offset: number, // default 0
 * }
 *
 * The response has the shape of:
 * {
 *   count: number, // The total number of Resource Issues which match the query (ignoring limit)
 *   estimatedTotal: number, // An estimate of the total number of Resource Issues (ignores entire query)
 *   resourceIssues: TResourceIssue[], // Resource Issues which match the query
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
        message: `You are not authorized to view the list of Resource Issues`,
      })
    );
  }

  const includeResolved: boolean = !!req.body.includeResolved;
  const limit = req.body.limit || 20;
  const offset = req.body.offset || 0;
  const minimumSeverity = req.body.minimumSeverity || "low";

  const includedSeverities = {
    low: ["low", "medium", "high"],
    medium: ["medium", "high"],
    high: ["high"],
  };

  try {
    const issues = await ResourceIssue.find({
      resolved: { $in: [false, includeResolved] },
      severity: { $in: includedSeverities[minimumSeverity] },
    })
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 });

    const count = await ResourceIssue.find({
      resolved: { $in: [false, includeResolved] },
      severity: { $in: includedSeverities[minimumSeverity] },
    }).countDocuments();

    const estimatedTotal = await ResourceIssue.find().estimatedDocumentCount();

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        count,
        estimatedTotal,
        resourceIssues: issues.map(resourceIssueDocumentToResourceIssue),
      })
    );
  } catch (e) {
    res.writeHead(500, {
      "Content-Type": "application/json",
    });
    return res.end(
      JSON.stringify({
        message: `Error getting Resource Issues: ${e.message}`,
      })
    );
  }
}
