import ResourceIssue, {
  resourceIssueDocumentToResourceIssue,
} from "../../../../models/ResourceIssue";
import { ObjectId } from "bson";
import { requireAdmin } from "../../../../utility/authHelpers";

export async function get(req, res, _next) {
  requireAdmin(req);
  const { resourceId } = req.params;
  try {
    const resourceIssueDocuments = await ResourceIssue.getForResource(
      ObjectId.createFromHexString(resourceId)
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
