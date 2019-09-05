import * as dotenv from "dotenv";
import * as sapper from "@sapper/server";
import bodyParser from "body-parser";
import compression from "compression";
import connectMongo from "connect-mongo";
import grant from "grant-express";
import polka from "polka";
import session from "express-session";
import sirv from "sirv";
import oidc from "grant-oidc";

dotenv.config();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

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
    session({
      // store,
      secret: process.env.DATABASE_SESSION_SECRET || "default_secret",
      saveUninitialized: true,
      resave: true
    }),
    grant(grantConfig),
    sirv("static", { dev })
  )
  .get("/callback", oidc(grantConfig), (req, res) => {
    res.redirect('/');
  })
  .use(
    sapper.middleware({
      session: (req, res) => ({
        grant: req.session.grant || null
      })
    })
  )
  .listen(PORT, err => {
    if (err) console.log("error", err);
  });
