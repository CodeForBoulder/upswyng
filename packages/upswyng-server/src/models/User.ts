import mongoose, { Document, Schema } from "mongoose";

import { ObjectId } from "bson";
import { TUser } from "@upswyng/upswyng-types";
import removeUndefinedFields from "../utility/removeUndefinedFields";

export interface TUserDocument extends Document {
  _id: ObjectId;
  facebook?: {
    id: string;
    name: string;
    email: string;
  };
  google?: {
    sub: string;
    email: string;
  };
  slack?: {
    userId: string; // primary identifier
    name: string;
    email: string;
    teamId: string;
  };
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

export function userDocumentToUser(u: TUserDocument): TUser {
  const result: Partial<TUser> = {
    _id: u._id.toHexString(),
    providers: [],
    isAdmin: u.isAdmin || false,
    isSuperAdmin: u.isSuperAdmin || false,
  };

  if (u.facebook && u.facebook.email) {
    result.providers.push("facebook");
    result.name = u.facebook.name;
    result.email = u.facebook.email;
  }
  if (u.google && u.google.email) {
    result.providers.push("google");
    result.email = u.google.email;
  }
  if (u.slack && u.slack.email) {
    result.providers.push("slack");
    result.email = u.slack.email;
    if (!result.name && u.slack.name) {
      // don't overwrite the name if it came from Facebook since that one is more likely accurate/complete
      result.name = u.slack.name;
    }
  }
  removeUndefinedFields(result);
  return result as TUser;
}

const UserSchema = new Schema(
  {
    facebook: {
      id: { type: String, index: true },
      name: { type: String },
      email: { type: String, index: true },
    },
    google: {
      // The google ID; doesn't ever change.
      // See https://developers.google.com/identity/protocols/OpenIDConnect?hl=en#obtainuserinfo
      sub: { type: String, index: true },
      email: { type: String, index: true },
    },
    slack: {
      email: { index: true, type: String },
      name: { type: String },
      teamId: { type: String },
      userId: { index: true, type: String },
    },
    // can approve new resources, etc
    isAdmin: { type: Boolean, default: false },
    // can execute operations on users
    isSuperAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.statics.findOrCreateFacebookUser = async function(
  id: string,
  name?: string,
  email?: string
): Promise<TUserDocument> {
  const self = this; // eslint-disable-line @typescript-eslint/no-this-alias
  const user = await this.findOne({ "facebook.id": id });
  if (!user && !email) {
    throw new Error(
      `User with id ${id} not found and no email included to create the user.`
    );
  } else if (!user) {
    try {
      const newUser = new self({ facebook: { id, name, email } });
      const result = await newUser.save();
      return result.toObject();
    } catch (e) {
      console.error(`Error creating new user:\t${e}`);
      throw e;
    }
  }
  if (user.facebook.email !== email || user.facebook.name !== name) {
    // if the user has updated their name or email on facebook,
    // update it in our records
    if (email) {
      user.facebook.email = email;
    }
    if (name) {
      user.facebook.name = name;
    }
    const updatedUser = await user.save();
    return updatedUser.toObject();
  }
  return user;
};

UserSchema.statics.findOrCreateGoogleUser = async function(
  sub: string,
  email?: string
): Promise<TUserDocument> {
  const self = this; // eslint-disable-line @typescript-eslint/no-this-alias
  const user = await this.findOne({ "google.sub": sub });
  if (!user && !email) {
    throw new Error(
      `User with sub ${sub} not found and no email included to create the user.`
    );
  } else if (!user) {
    try {
      const newUser = new self({ google: { sub, email } });
      const result = await newUser.save();
      return result;
    } catch (e) {
      console.error(`Error creating new user:\t${e}`);
      throw e;
    }
  }
  if (user.google.email !== email) {
    // if the user has updated their email on google,
    // update it in our records
    if (email) {
      user.google.email = email;
    }
    return await user.save();
  }
  return user;
};

UserSchema.statics.findOrCreateSlackUser = async function(
  slackUserId: string,
  email: string,
  name: string,
  teamId: string
): Promise<TUserDocument> {
  const self = this; // eslint-disable-line @typescript-eslint/no-this-alias
  const user = (await this.findOne({
    "slack.userId": slackUserId,
  })) as TUserDocument | null;
  if (!user && !email) {
    throw new Error(
      `User with slack ID ${slackUserId} not found and no email included to create the user.`
    );
  } else if (!user) {
    try {
      const newUser = new self({
        slack: { email, name, userId: slackUserId, teamId },
      });
      const result = await newUser.save();
      return result;
    } catch (e) {
      console.error(`Error creating new user:\t${e}`);
      throw e;
    }
  }
  if (
    user.slack.email !== email ||
    user.slack.name !== name ||
    user.slack.teamId !== teamId
  ) {
    // if the user has updated these fields,
    // update it in our records
    user.slack.email = email;
    user.slack.teamId = teamId;
    user.slack.name = name;
    return await user.save();
  }
  return user;
};

const User = mongoose.model<TUserDocument>("User", UserSchema);

export default User as typeof User & {
  findOrCreateFacebookUser: (
    id: string,
    name?: string,
    email?: string
  ) => Promise<TUserDocument>;
  findOrCreateGoogleUser: (sub: string, email?: string) => TUserDocument;
  findOrCreateSlackUser: (
    slackUserId: string,
    email: string,
    name: string,
    teamId: string
  ) => Promise<TUserDocument>;
};
