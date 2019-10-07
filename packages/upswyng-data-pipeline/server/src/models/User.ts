import mongoose, { Document, Schema } from "mongoose";
import { ObjectId } from "bson";

interface TUserFields extends Document {
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

const UserSchema = new Schema(
  {
    facebook: {
      id: { type: String, index: true, unique: true },
      name: { type: String },
      email: { type: String, index: true, unique: true }
    },
    google: {
      // The google ID; doesn't ever change.
      // See https://developers.google.com/identity/protocols/OpenIDConnect?hl=en#obtainuserinfo
      sub: { type: String, index: true, unique: true },
      email: { type: String, index: true, unique: true }
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
      const newUser = new self({ facebook: { id, name, user } });
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

const User = mongoose.model<TUserFields>("User", UserSchema);

export default User as typeof User & {
  findOrCreateFacebookUser: (
    id: string,
    name?: string,
    email?: string
  ) => Promise<TUserFields>;
};
