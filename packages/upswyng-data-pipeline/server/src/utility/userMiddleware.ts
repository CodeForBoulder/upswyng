/**
 * Takes grant information supplied by the grant middleware and converts it into User information
 */

import axios from "axios";
import User from "../models/User";
import { TUser } from "../../../src/types";

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

type TGrant = TGrantFacebook | TGrantGoogle;

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
      data: { id, email, name }
    } = await axios.get(
      ` https://graph.facebook.com/v4.0/me?fields=id%2Cname%2Cemail&access_token=${accessToken}`
    );
    try {
      const user = await User.findOrCreateFacebookUser(id, name, email);
      return {
        email: user.facebook.email,
        id: user._id.toHexString(),
        isAdmin: user.isAdmin,
        isSuperAdmin: user.isSuperAdmin,
        name: user.facebook.name,
        provider: "facebook",
      };
    } catch (e) {
      throw new Error(`Error creating or finding new user with id ${id}`);
    }
  } catch (e) {
    console.error("Error querying the Facebook API:\t", e.message);
  }
}

async function grantToUser(grant:TGrant) {
  switch (grant.provider) {
    case "facebook":
      return await facebookGrantToUser(grant);
    default:
      throw new Error(
        `Received unknown provider ${grant.provider} when converting grant to user.`
      );
  }
}

export default async function(req, _res, next): Promise<void> {
  if (req.session.grant && !req.session.rawUsers) {
    req.session.rawUsers = {};
  }
  if (req.session.grant && !req.session.rawUsers[grantToKey(req.session.grant)]) {
    const user = await grantToUser(req.session.grant);
    req.session.rawUsers[grantToKey(req.session.grant)] = user;
  }
  if (!req.session.grant && req.session.rawUsers) {
    req.session.rawUsers = null;
  }
  next();
}
