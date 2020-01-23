/**
 * The core of the API server. Does not include the sapper middleware, since
 * that has to be imported in `server.js`. However, this is enough to test API
 * endpoints.
 */

import { Connection } from "mongoose";
import bodyParser from "body-parser";
import compression from "compression";
import connectMongo from "connect-mongo";
import cors from "cors";
import grant from "grant-express";
import oidc from "grant-oidc";
import polka from "polka";
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

  return polka()
    .use(
      compression({ threshold: 0 }),
      cors(), // TODO: Lock this down to non-admin routes
      sirv("static", { dev }),
      bodyParser.urlencoded({ extended: true }),
      bodyParser.json(),
      session({
        store: new MongoStore({ mongooseConnection }),
        secret: sessionSecret,
        saveUninitialized: false,
        resave: false,
      }),
      grant(grantConfig),
      userMiddleware
    )
    .get("/callback", oidc(grantConfig), (_req, res) => {
      res.redirect("/");
    });
}
