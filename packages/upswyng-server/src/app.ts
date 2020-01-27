/**
 * The core of the API server. Does not include the sapper middleware, since
 * that has to be imported in `server.js`. However, this is enough to test API
 * endpoints.
 */

import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import grant from "grant-express";
import memorystore from "memorystore";
import oidc from "grant-oidc";
import polka from "polka";
import session from "express-session";
import sirv from "sirv";
import userMiddleware from "./utility/userMiddleware";

interface TAppOptions {
  dev: boolean; // start server in development mode
  grantConfig: Record<string, any>; // see https://github.com/simov/grant#configuration
  sessionSecret: string;
}

export default function(options: TAppOptions) {
  const { dev, grantConfig, sessionSecret } = options;

  const MemoryStore = memorystore(session);

  return polka()
    .use(
      compression({ threshold: 0 }),
      cors(), // TODO: Lock this down to non-admin routes
      sirv("static", { dev }),
      bodyParser.urlencoded({ extended: true }),
      bodyParser.json()
    )
    .use(
      session({
        store: new MemoryStore({ checkPeriod: 86400000 }), // prune expired entries every 24h
        secret: sessionSecret,
        saveUninitialized: false,
        resave: true,
      })
    )
    .use(grant(grantConfig))
    .use(userMiddleware)
    .get("/callback", oidc(grantConfig), (_req, res) => {
      res.redirect("/");
    });
}
