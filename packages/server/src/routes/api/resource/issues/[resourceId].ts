import ResourceIssue, {
  resourceIssueDocumentToResourceIssue,
} from "../../../../models/ResourceIssue";

import { ObjectId } from "bson";
import { requireAdmin } from "../../../../utility/authHelpers";

/**
 *  Fetch all the Issues for the resource specified by the Resource ID. Set the
 * `include_resolved` query param to `true` to fetch both resolved and unresolved issues.
 */
export async function get(req, res, _next) {
  try {
    requireAdmin(req);
  } catch {
    res.writeHead(401, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        message:
          "You are not authorized to view the issues for a Service Provider",
      })
    );
  }

  const { resourceId } = req.params;

  try {
    const includeResolved = Boolean(req.query.include_resolved);
    const resourceIssueDocuments = await ResourceIssue.getForResource(
      ObjectId.createFromHexString(resourceId),
      includeResolved
    );

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        resourceIssues: resourceIssueDocuments.map(
          resourceIssueDocumentToResourceIssue
        ),
      })
    );
  } catch (e) {
    res.writeHead(500, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        message: e.message,
      })
    );
  }
}
