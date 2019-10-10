import mongoose, { Document, Schema } from "mongoose";
import { ObjectId } from "bson";
import { TUser } from "../../../src/types";

export interface TUserFields extends Document {
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
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

export function schemaToUser(u: TUserFields): TUser {
  const result: Partial<TUser> = {
    id: u.id,
    providers: [],
    isAdmin: u.isAdmin || false,
    isSuperAdmin: u.isSuperAdmin || false
  };
  if (u.facebook) {
    result.providers.push("facebook");
    result.name = u.facebook.name;
    result.email = u.facebook.email;
  }
  if (u.google) {
    result.providers.push("google");
    result.email = u.google.email;
  }
  return result as TUser;
}

const UserSchema = new Schema(
  {
    facebook: {
      id: { type: String, index: true },
      name: { type: String },
      email: { type: String, index: true }
    },
    google: {
      // The google ID; doesn't ever change.
      // See https://developers.google.com/identity/protocols/OpenIDConnect?hl=en#obtainuserinfo
      sub: { type: String, index: true },
      email: { type: String, index: true }
    },
    // can approve new resources, etc
    isAdmin: { type: Boolean, default: false },
    // can execute operations on users
    isSuperAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

UserSchema.statics.findOrCreateFacebookUser = async function(
  id: string,
  name?: string,
  email?: string
): Promise<TUserFields> {
  const self = this;
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
  return user.toObject();
};

UserSchema.statics.findOrCreateGoogleUser = async function(
  sub: string,
  email?: string
): Promise<TUserFields> {
  const self = this;
  const user = await this.findOne({ "google.sub": sub });
  if (!user && !email) {
    throw new Error(
      `User with sub ${sub} not found and no email included to create the user.`
    );
  } else if (!user) {
    try {
      const newUser = new self({ google: { sub, email } });
      const result = await newUser.save();
      return result.toObject();
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
    const updatedUser = await user.save();
    return updatedUser.toObject();
  }
  return user.toObject();
};

const User = mongoose.model<TUserFields>("User", UserSchema);

export default User as typeof User & {
  findOrCreateFacebookUser: (
    id: string,
    name?: string,
    email?: string
  ) => Promise<TUserFields>;
  findOrCreateGoogleUser: (sub: string, email?: string) => TUserFields;
};
