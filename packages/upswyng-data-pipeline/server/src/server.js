import * as dotenv from "dotenv";
import * as sapper from "@sapper/server";
import bodyParser from "body-parser";
import compression from "compression";
import connectMongo from "connect-mongo";
import cors from "cors";
import getUserFromRawUsers from "./utility/getUserFromRawUsers.ts";
import grant from "grant-express";
import mongoose from "mongoose";
import oidc from "grant-oidc";
import polka from "polka";
import session from "express-session";
import sirv from "sirv";
import userMiddleware from "./utility/userMiddleware.ts";

dotenv.config();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

// Database setup
const {
  DATABASE_URL,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER,
} = process.env;

if (dev && /heroku_.*/.test(DATABASE_NAME)) {
  throw new Error(
    "💩 You're attempting to use the production datebase in a dev enviroment."
  );
}

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    dbName: DATABASE_NAME,
    user: DATABASE_USER,
    pass: DATABASE_PASSWORD,
  })
  .then(
    () => console.log(`Connected to MongoDB instance at ${DATABASE_URL}`),
    e =>
      console.error(
        `There was an error connecting to the MongoDB instance at ${DATABASE_URL}:\n${e}`
      )
  );

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
};

const MongoStore = connectMongo(session);

if (!process.env.DATABASE_SESSION_SECRET) {
  console.warn(
    "Starting session storage with default secret. \
    Please set a secret at `DATABASE_SESSION_SECRET` ENV variable."
  );
}

polka()
  .use(
    compression({ threshold: 0 }),
    cors(), // TODO: Lock this down to non-admin routes
    sirv("static", { dev }),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    session({
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      secret: process.env.DATABASE_SESSION_SECRET || "default_secret",
      saveUninitialized: true,
      resave: true,
    }),
    grant(grantConfig),
    userMiddleware
  )
  .get("/callback", oidc(grantConfig), (_req, res) => {
    res.redirect("/");
  })
  .use(
    sapper.middleware({
      session: (req, _res) => {
        return { user: getUserFromRawUsers(req) };
      },
    })
  )
  .listen(PORT, err => {
    if (err) console.error("Error starting polka server:", err);
  });
