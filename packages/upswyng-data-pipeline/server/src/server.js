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
import Resource, {legacyResourceToResource, resourceToSchema}  from './models/Resource.ts';

dotenv.config();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

// Database setup
const { DATABASE_URL, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USER } = process.env;
mongoose
  .connect(DATABASE_URL, {useNewUrlParser: true, dbName: DATABASE_NAME, user: DATABASE_USER, pass: DATABASE_PASSWORD})
  .then(
    () => console.log(`Connected to MongoDB instance at ${DATABASE_URL}`),
    e =>
      console.log(
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

const testResource = {
    "address1": "1100 E 18th Ave",
    "address2": "",
    "approved": 1,
    "category": "Men,Women,Kids,Seniors,Families,Disabled,LGBT+,All",
    "charityname": "Metro Caring",
    "city": "Denver",
    "closeschedule": [
      { "day": "Wednesday", "period": "First", "type": "Monthly" }
    ],
    "description": "\"Metro Caring's largest program, Healthful Foods Access, ensures that hungry families and individuals have nutritious food to meet their immediate need and avoid hunger in the short term while they work toward self-reliance. Instead of receiving a pre-packed or standard bag of groceries, families and individuals shop for free at the Metro Caring Fresh-Foods Market. A \"choice\" model gives participants control over their food selection, allows for cultural and dietary preferences, and reduces waste. Volunteer Market Assistants offer samples of different nutritious foods that people may be unfamiliar with, and provide personal assistance when needed.\"",
    "kudos": 3,
    "lat": 39.7445915,
    "lng": -104.97300459999997,
    "phone": "(303) 860-7200",
    "schedule": [
      {
        "day": "Monday",
        "fromstring": "9:30 AM",
        "tostring": "3:00 PM",
        "type": "Weekly"
      },
      {
        "day": "Tuesday",
        "fromstring": "9:30 AM",
        "tostring": "3:00 PM",
        "type": "Weekly"
      },
      {
        "day": "Tuesday",
        "fromstring": "6:00 PM",
        "tostring": "8:00 PM",
        "type": "Weekly"
      },
      {
        "day": "Wednesday",
        "fromstring": "9:30 AM",
        "tostring": "3:00 PM",
        "type": "Weekly"
      },
      {
        "day": "Thursday",
        "fromstring": "9:30 AM",
        "tostring": "3:00 PM",
        "type": "Weekly"
      },
      {
        "day": "Friday",
        "fromstring": "9:30 AM",
        "tostring": "3:00 PM",
        "type": "Weekly"
      }
    ],
    "selectedAll": true,
    "service": "Food",
    "servicetype": "Food Pantry",
    "showflag": false,
    "state": "CO",
    "updateshelter": "09/19/2016 10:25 PM",
    "useremail": "patrudu36@gmail.com",
    "userid": "70b8446e-61ca-41c9-93f9-9f3fb4996e6c",
    "website": "http://www.metrocaring.org",
    "zip": 80203
  };

const r = new Resource(resourceToSchema(legacyResourceToResource(testResource)));
r.save((e,r) => {
e &&console.log("save error: ", e);
if (r) {
  console.log("RESOURCE: ", r);
}
});

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
    res.redirect("/");
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
