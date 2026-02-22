const { Timestamp } = require("mongodb/lib/bson");
const mongoose = require("mongoose");

const myPostsScheme = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    media: [
      {
        id: { type: String },
        mediaType: { type: String },
        post: [{ type: String }],
        caption: { type: String },
        likes: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true },
);

const myPosts = mongoose.model("myPosts", myPostsScheme);

module.exports = myPosts;
