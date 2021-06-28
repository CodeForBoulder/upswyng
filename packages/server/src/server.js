import "./utility/slackbot.ts";

import * as dotenv from "dotenv";
import * as path from "path";
import * as sapper from "@sapper/server";

import app from "./app.ts";
import getUserFromRawUsers from "./utility/getUserFromRawUsers.ts";
import http from "http";
import mongoose from "mongoose";
import sirv from "sirv";
import webSocketServer from "./worker/webSocketServer.ts";

const dev = process.env.NODE_ENV === "development";

// load web clients env
dotenv.config({ path: path.resolve(process.cwd(), "../web/.env") });

// load this package's env
dotenv.config();

const { PORT } = process.env;

// Database setup
const { DATABASE_PASSWORD, DATABASE_URL, DATABASE_USER } = process.env;

const { ALGOLIA_INDEX_NAME } = process.env;

if (dev && /heroku_23.*/.test(DATABASE_URL)) {
  throw new Error(
    "💩 You're attempting to use the production database in a dev environment."
  );
}

if (dev && /prod/.test(ALGOLIA_INDEX_NAME)) {
  console.warn(
    "😮 You're running in a dev environment but it appears you're using the production Algolia index." +
      "This can cause problems if it was not intentional."
  );
}

const grantConfig = {
  defaults: {
    protocol: process.env.SERVER_PROTOCOL || "http",
    host: process.env.SERVER_HOST || "localhost:3000",
    transport: "session",
    state: true,
  },
  google: {
    key: process.env.OAUTH_GOOGLE_CLIENT_ID,
    secret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
    scope: ["openid", "email"],
    nonce: true,
    // eslint-disable-next-line @typescript-eslint/camelcase
    custom_params: { access_type: "offline" },
    callback: "/callback",
  },
  facebook: {
    key: process.env.OAUTH_FACEBOOK_CLIENT_ID,
    secret: process.env.OAUTH_FACEBOOK_CLIENT_SECRET,
    scope: ["email"],
    nonce: true,
    callback: "/callback",
  },
  slack: {
    callback: "/callback",
    key: process.env.OAUTH_SLACK_CLIENT_ID,
    nonce: true,
    scope: ["identity.basic", "identity.email"],
    secret: process.env.OAUTH_SLACK_CLIENT_SECRET,
    team: process.env.OAUTH_SLACK_WORKSPACE_ID,
  },
};

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: DATABASE_USER,
    pass: DATABASE_PASSWORD,
  })
  .then(
    () => {
      console.log(`Connected to MongoDB instance at ${DATABASE_URL}`);

      if (!process.env.DATABASE_SESSION_SECRET) {
        console.warn(
          "Starting session storage with default secret. \
    Please set a secret at `DATABASE_SESSION_SECRET` ENV variable."
        );
      }

      const appInstance = app({
        dev,
        grantConfig,
        mongooseConnection: mongoose.connection,
        sessionSecret: process.env.DATABASE_SESSION_SECRET || "default_secret",
      });

      if (!appInstance) {
        throw new Error(`Failed to create an app instance`);
      }

      // Sapper App
      appInstance.use(
        sapper.middleware({
          ignore: path => {
            // see https://stackoverflow.com/questions/5296268/fastest-way-to-check-a-string-contain-another-substring-in-javascript
            // ignore the route if it doesn't belong to the sapper app so that it falls
            // through to the web client
            return (
              path.indexOf("api") !== 1 &&
              path.indexOf("callback") !== 1 &&
              path.indexOf("client") !== 1 && // this is the provider portal client, not the web client
              path.indexOf("connect") !== 1 &&
              path.indexOf("provider") !== 1
            );
          },
          session: (req, _res) => {
            return { user: getUserFromRawUsers(req) };
          },
        })
      );

      // Web client
      appInstance.use(
        sirv(path.resolve(__dirname + "/../../../../web/build"), {
          dev,
          maxAge: 2628000, // ~ 1 month
        })
      );

      // Catch react-router routes and serve the web client index.
      // The regex ensures that 404s of provider routes will be shown
      // the sapper app 404 page.
      appInstance.use(
        /^(?!\/api)(?!\/provider)(?!\/connect)(?!\/callback).*$/,
        (_req, res) => {
          res.sendFile(
            path.resolve(__dirname + "/../../../../web/build/index.html")
          );
        }
      );

      const s = http.createServer(appInstance);

      webSocketServer(s);

      s.listen(PORT);
    },
    e =>
      console.error(
        `There was an error connecting to the MongoDB instance at ${DATABASE_URL}:\n${e}`
      )
  );
