import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  googleId: {
    type: String,
    index: true
  },
  email: { type: String }
});

const User = (module.exports = mongoose.model("User", UserSchema));

export default User;
