const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    avatar: String,
    bio: String,
    coverImage: String,
    googleId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema, "user");
