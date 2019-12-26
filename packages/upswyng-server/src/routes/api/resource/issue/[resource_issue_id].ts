import ResourceIssue, {
  TResourceIssueDocument,
  resourceIssueDocumentToResourceIssue,
} from "../../../../models/ResourceIssue";

import { ObjectId } from "bson";
import { requireAdmin } from "../../../../utility/authHelpers";

export async function get(req, res, _next) {
  const { resource_issue_id: _id } = req.params;
  try {
    requireAdmin(req);
  } catch (e) {
    console.error(e);
    res.writeHead(401, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        message: `You are not authorized to view Resource Issues`,
      })
    );
  }

  let resourceIssueDocument: TResourceIssueDocument;
  try {
    resourceIssueDocument = await ResourceIssue.findById(
      ObjectId.createFromHexString(_id)
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

  if (!resourceIssueDocument) {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    return res.end(
      JSON.stringify({
        message: `Could not find a Resource Issue with ID ${_id}`,
      })
    );
  }

  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(
    JSON.stringify({
      resourceIssue: resourceIssueDocumentToResourceIssue(
        resourceIssueDocument
      ),
    })
  );
}
