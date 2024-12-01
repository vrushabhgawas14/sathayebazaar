import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
