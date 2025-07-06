import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  dob: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const User = models.User || model("User", UserSchema);
