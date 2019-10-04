import * as dotenv from "dotenv";
import * as sapper from "@sapper/server";
import bodyParser from "body-parser";
import compression from "compression";
import connectMongo from "connect-mongo";
import grant from "grant-express";
import mongoose from "mongoose";
import oidc from "grant-oidc";
import polka from "polka";
import session from "express-session";
import sirv from "sirv";

dotenv.config();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

// Database setup
const {
  DATABASE_URL,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER
} = process.env;

if (dev && /heroku_.*/.test(DATABASE_NAME)) {
  throw new Error(
    "💩 You're attempting to use the production datebase in a dev enviroment.");
}

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    dbName: DATABASE_NAME,
    user: DATABASE_USER,
    pass: DATABASE_PASSWORD
  })
  .then(
    () => console.log(`Connected to MongoDB instance at ${DATABASE_URL}`),
    e =>
      console.error(
        `There was an error connecting to the MongoDB instance at ${DATABASE_URL}:\n${e}`
      )
  );

const MongoStore = connectMongo(session);
const grantConfig = {
  defaults: {
    protocol: process.env.SERVER_PROTOCOL || "http",
    host: process.env.SERVER_HOST || "localhost:3000",
    transport: "session",
    state: true
  },
  google: {
    key: process.env.OAUTH_GOOGLE_CLIENT_ID,
    secret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
    scope: ["openid", "email"],
    nonce: true,
    custom_params: { access_type: "offline" },
    callback: "/callback"
  }
};

// const store =  new MongoStore({
// 	url: process.env.DATABASE_URL,
// 	dbName: process.env.DATABASE_NAME,
// 	user: process.env.DATABASE_USER,
// 	pass: process.env.DATABASE_PASSWORD,
//   });

polka()
  .use(
    compression({ threshold: 0 }),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    session({
      // store,
      secret: process.env.DATABASE_SESSION_SECRET || "default_secret",
      saveUninitialized: true,
      resave: true
    }),
    grant(grantConfig),
    sirv("static", { dev })
  )
  .get("/callback", oidc(grantConfig), (_req, res) => {
    res.redirect("/");
  })
  .use(
    sapper.middleware({
      session: (req, _res) => ({
        grant: req.session.grant || null
      })
    })
  )
  .listen(PORT, err => {
    if (err) console.error("Error starting polka server:", err);
  });
