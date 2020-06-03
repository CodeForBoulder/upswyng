import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

import { ObjectId } from "bson";
import { ParamsDictionary } from "express-serve-static-core";
import Resource from "../../../../models/Resource";
import ResourceIssue from "../../../../models/ResourceIssue";
import { TUserReportDetails } from "@upswyng/types/src";
import { compose } from "compose-middleware";

interface TRequest extends ParamsDictionary {
  resourceId: string;
  reportedIssues: string; // serialized string[]
  detailExplanation?: string;
}

/**
 * API endpoint to create a new User Report Resource Issue.
 * In an UpSwyng client, if a user notices a problem with a Resource
 * (schedule is wrong, phone number is out of service, etc..) they can
 * initiate a report saying so through this endpont.
 *
 * {
 *   resourceId: string;
 *   detailExplanation?: string; // text the user writes in a 'detail'
 *   reportedIssues: string[]; // "Schedule Incorrect, WebsiteInop"
 * }
 *
 * Successful Response (201): {}
 * Error Response (40x|500):
 * {
 *   message: string; // human-readable error message
 * }
 */
export const post = compose([
  check("resourceId").isString(),
  check("reportedIssues").isJSON(),
  async (req: Request<TRequest>, res: Response, _next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: `The request contained invalid information. Include a \`resourceId\`, one or more \`reportedIssues\`, and optionally a \`detailExplanation\``,
      });
    }
    let reportedIssues: string[];
    try {
      reportedIssues = JSON.parse(req.body.reportedIssues);
    } catch {
      return res.status(422).json({
        message:
          "The 'reportedIssues' parameter must be a serialized array of issue strings",
      });
    }
    try {
      new ObjectId(req.body.resourceId);
    } catch (_) {
      return res.status(422).json({
        message: `'${req.body.resourceId}' is not a valid Service Provider ID`,
      });
    }
    if (!(await Resource.getByResourceId(req.body.resourceId))) {
      return res.status(404).json({
        message: `Service Provider with Resource ID: ${req.body.resourceId} does not exist`,
      });
    }
    try {
      const detail: TUserReportDetails = {
        kind: "user_report",
        reportedIssues,
      };
      if (req.body.detailExplanation && req.body.detailExplanation.length) {
        detail.detailExplanation = req.body.detailExplanation;
      }
      await new ResourceIssue({
        kind: "user_report",
        severity: "high",
        resourceId: req.body.resourceId,
        detail,
      }).save();
      return res.status(201).json({});
    } catch (e) {
      return res
        .status(500)
        .json({ message: "There was an error saving the report" });
    }
  },
]);
