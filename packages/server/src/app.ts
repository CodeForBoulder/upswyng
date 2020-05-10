/**
 * The core of the API server. Does not include the sapper middleware, since
 * that has to be imported in `server.js`. However, this is enough to test API
 * endpoints.
 */

import { Connection } from "mongoose";
import bodyParser from "body-parser";
import { compose } from "compose-middleware";
import compression from "compression";
import connectMongo from "connect-mongo";
import cors from "cors";
import express from "express";
import grant from "grant-express";
import oidc from "grant-oidc";
import requestResponseLogger from "express-request-response-logger";
import session from "express-session";
import sirv from "sirv";
import userMiddleware from "./utility/userMiddleware";

interface TAppOptions {
  mongooseConnection: Connection;
  dev: boolean; // start server in development mode
  grantConfig: Record<string, any>; // see https://github.com/simov/grant#configuration
  sessionSecret: string;
}

export default function(options: TAppOptions) {
  const { dev, grantConfig, mongooseConnection, sessionSecret } = options;

  const MongoStore = connectMongo(session);

  return express()
    .use(
      compression({ threshold: 0 }),
      cors(), // TODO: Lock this down to non-admin routes
      dev ? requestResponseLogger() : (_req, _res, next) => next(),
      sirv("static", { dev }),
      bodyParser.json({}),
      bodyParser.urlencoded({
        extended: true,
        // retain raw body for use with Slack verification
        verify: (req, res, buf, encoding) => {
          if (buf && buf.length) {
            (req as any).rawBody = buf.toString(encoding || "utf8");
          }
        },
      })
    )
    .use(
      compose([
        session({
          store: new MongoStore({ mongooseConnection }),
          secret: sessionSecret,
          saveUninitialized: false,
          resave: true,
        }),
        (req, res, next) => {
          if (req.session) {
            grant(grantConfig)(req, res, next);
          } else {
            next();
          }
        },
      ])
    )
    .use(userMiddleware)
    .get("/callback", oidc(grantConfig), (_req, res) => {
      res.redirect("/provider/?loggedin=true");
    });
}
