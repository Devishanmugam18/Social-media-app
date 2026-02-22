const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // content: { type: String, required: true },
    media: [
      {
        id: { type: String },
        post: [
          {
            type: String,
          },
        ],
        caption: {
          type: String,
        },
        likes: { type: Number, default: 0 },
      },
    ],
    // hashtag: [{ type: String }],
    // likes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const feed = mongoose.model("feed", feedSchema, "feed_posts");

module.exports = feed;
