import EventLog, {
  eventLogDocumentToEventLog,
} from "../../../../models/EventLog";
import ResourceIssue, {
  TResourceIssueDocument,
} from "../../../../models/ResourceIssue";
import { TEventLogKind, TUser } from "@upswyng/upswyng-types";

import { ObjectId } from "bson";
import Resource from "../../../../models/Resource";
import { postEventLogMessage } from "../../../../utility/slackbot";
import { requireAdmin } from "../../../../utility/authHelpers";

export async function setResolved(resolved: boolean, req, res, next) {
  let user: TUser;
  try {
    user = requireAdmin(req);
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
      // Create Event Log
      try {
        const resource = await Resource.getByResourceId(issue.resourceId);
        const kind: TEventLogKind = resolved
          ? "resource_issue_resolved"
          : "resource_issue_reopened";
        const newDocument = await new EventLog({
          actor: user._id,
          detail: {
            kind,
            resourceId: issue.resourceId.toHexString(),
            resourceName: resource.name,
            resourceIssueSeverity: issue.severity,
            resourceIssueKind: issue.kind,
            resourceIssueId: issue._id.toHexString(),
          },
          kind,
        }).save();
        await newDocument.populate("actor").execPopulate();
        await postEventLogMessage(eventLogDocumentToEventLog(newDocument));
      } catch (e) {
        console.error(e);
      }
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
