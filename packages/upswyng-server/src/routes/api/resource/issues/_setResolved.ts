import ResourceIssue, {
  TResourceIssueDocument,
} from "../../../../models/ResourceIssue";

import { ObjectId } from "bson";
import { requireAdmin } from "../../../../utility/authHelpers";

export async function setResolved(resolved: boolean, req, res, next) {
  try {
    requireAdmin(req);
  } catch {
    res.writeHead(401, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: `You are not authorized to ${
          resolved ? "resolve" : "unresolve"
        } issues.`,
      })
    );
    next();
    return;
  }

  const { _id } = req.params;
  let issue: TResourceIssueDocument;
  try {
    issue = await ResourceIssue.findById(ObjectId.createFromHexString(_id));
  } catch (e) {
    res.writeHead(500, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: `Error finding Resource issue with _id ${_id}: ${e.message}`,
      })
    );
    return;
  }

  if (!issue) {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: `Resource issue with _id ${_id} could not be found`,
      })
    );
  } else {
    try {
      issue.resolved = resolved;
      await issue.save();
      res.writeHead(204);
      res.end();
    } catch (e) {
      res.writeHead(500, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          message: `Error setting Resource issue with _id ${_id} to ${
            resolved ? "resolved" : "unresolved"
          }: ${e.message}`,
        })
      );
      return;
    }
  }
}
