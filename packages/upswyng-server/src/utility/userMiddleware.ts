/**
 * Takes grant information supplied by the grant middleware and converts it into User information
 */

import User, { userDocumentToUser } from "../models/User";

import { TUser } from "@upswyng/upswyng-types";
import axios from "axios";

interface TGrantGoogle {
  provider: "google";
  state: "string";
  nonce: "string";
  response: {
    id_token: {
      payload: { sub: string; email: string; email_verified: boolean };
    };
    access_token: string;
    refresh_token: string;
  };
}

interface TGrantFacebook {
  provider: "facebook";
  state: "string";
  nonce: "string";
  response: { access_token: string };
}

interface TGrantSlack {
  provider: "slack";
  state: "string";
  nonce: "string";
  response: {
    access_token: string;
    raw: {
      ok: boolean;
      access_token: string;
      scope: "identity.basic,identiy.email";
      user_id: string; // UXXXXXXXX
      team_id: string; // TXXXXXXXX
      enterprise_id: string | null;
      user: {
        name: string;
        id: string;
        email: string;
      };
      team: { id: string };
    };
  };
}

type TGrant = TGrantFacebook | TGrantGoogle | TGrantSlack;

function grantToKey(grant: TGrant) {
  return `${grant.provider}_${grant.state}_${grant.nonce}`;
}

async function facebookGrantToUser(grant: TGrantFacebook): Promise<TUser> {
  if (!grant.provider || grant.provider !== "facebook") {
    throw new Error(
      "Attempted to convert a non-facebook grant to user with facebook logic"
    );
  }
  const accessToken = grant.response.access_token;
  if (!accessToken) {
    throw new Error("Could not find an access token in facebook grant");
  }
  try {
    const {
      data: { id, email, name },
    } = await axios.get(
      ` https://graph.facebook.com/v4.0/me?fields=id%2Cname%2Cemail&access_token=${accessToken}`
    );
    try {
      const user = await User.findOrCreateFacebookUser(id, name, email);
      return userDocumentToUser(user);
    } catch (e) {
      throw new Error(`Error creating or finding new user with id ${id}`);
    }
  } catch (e) {
    console.error("Error querying the Facebook API:\t", e.message);
  }
}

async function googleGrantToUser(grant: TGrantGoogle): Promise<TUser> {
  if (!grant.provider || grant.provider !== "google") {
    throw new Error(
      "Attempted to convert a non-google grant to user with google logic"
    );
  }
  try {
    if (!grant.response.id_token) {
      throw new Error(
        `No id_token included with response. Grant:\n${JSON.stringify(
          grant,
          null,
          2
        )}`
      );
    }
    const user = await User.findOrCreateGoogleUser(
      grant.response.id_token.payload.sub,
      grant.response.id_token.payload.email
    );
    return userDocumentToUser(user);
  } catch (e) {
    console.error(e);
    throw new Error(
      `Error creating or finding new user with sub ${grant.response.id_token.payload.sub}:\n${e}`
    );
  }
}

async function slackGrantToUser(grant: TGrantSlack): Promise<TUser> {
  if (!grant.provider || grant.provider !== "slack") {
    throw new Error(
      "Attempted to convert a non-slack grant to user with slack logic"
    );
  }

  try {
    if (!grant.response.access_token) {
      throw new Error(
        `No access_token included with response. Grant:\n${JSON.stringify(
          grant,
          null,
          2
        )}`
      );
    }
    const user = await User.findOrCreateSlackUser(
      grant.response.raw.user_id,
      grant.response.raw.user.email,
      grant.response.raw.user.name,
      grant.response.raw.team_id
    );
    return userDocumentToUser(user);
  } catch (e) {
    console.error(e);
    throw new Error(
      `Error creating or finding new slack user with slack ID ${grant.response.raw.user_id}:\n${e}`
    );
  }
}

async function grantToUser(grant: TGrant) {
  switch (grant.provider) {
    case "facebook":
      return await facebookGrantToUser(grant);
    case "google":
      return await googleGrantToUser(grant);
    case "slack":
      return await slackGrantToUser(grant);
    default:
      throw new Error(
        `Received unknown provider ${
          (grant as any).provider
        } when converting grant to user.`
      );
  }
}

export default async function(req, res, next): Promise<void> {
  try {
    if (req.session.grant && !req.session.rawUsers) {
      req.session.rawUsers = {};
    }
    if (
      req.session.grant &&
      !req.session.rawUsers[grantToKey(req.session.grant)]
    ) {
      const user = await grantToUser(req.session.grant);
      req.session.rawUsers[grantToKey(req.session.grant)] = user;
    }
    if (!req.session.grant && req.session.rawUsers) {
      req.session.rawUsers = null;
    }
  } catch (e) {
    // if there's an error, wipe out `grant` so we don't get stuck with this
    // error on every reload
    req.session.grant = null;
    res.writeHead(500, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: `There was an error logging in: ${e.message}`,
      })
    );
  }
  next();
}
