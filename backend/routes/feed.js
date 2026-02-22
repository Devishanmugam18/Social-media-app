const express = require("express");
const Feed = require("../ORMmodels/feed");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const router = express.Router();

const authorization = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, "password", (err, user) => {
    if (err) {
      return res.send("authorization failed");
    }
    if (user.role == "user") {
      next();
    } else {
      return json.send("authorization failed");
    }
  });
};

router.get("/getAllFeed", auth, async (req, res) => {
  try {
    console.log("Fetching feeds...");
    const post = await Feed.find();
    console.log("Feeds fetched:", post.length);
    res.status(200).json({ post });
  } catch (err) {
    console.error("Error in getAllFeed", err);
    res
      .status(500)
      .json({ error: "Failed to fetch feeds", details: err.message });
  }
});
// router.post("/createPost", async (req, res) => {
//   try {
//     const post = await Post.create({ ...req.body });
//     res.json({ post });
//   } catch (err) {
//     res.status(500).json({ msg: "post creation failed" });
//   }
// });

// router.get(
//   "/:id/getPost",
//   /*authorization,*/ async (req, res) => {
//     const { id } = req.params;
//     const posts = await Post.find({ user: id }).select("media likes");
//     res.json(posts);
//   }
// );

module.exports = router;
