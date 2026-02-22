const express = require("express");
const router = express.Router();
const Profile = require("../ORMmodels/profile");

router.post("/createProfile/:id", async (req, res) => {
  const { id } = req.params;
  const { banner, profilePic, userName, bio, myPosts } = req.body;
  const profile = await Profile.create({
    id: id,
    banner,
    profilePic,
    userName,
    bio,
    myPosts,
  });
  res.json(profile);
});

router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const profile = await Profile.findById({ id });
  res.json(profile);
});

module.exports = router;
