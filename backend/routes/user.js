var express = require("express");
const User = require("../ORMmodels/user");
var router = express.Router();
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// add larger json parser and router-level CORS handling
router.use(express.json({ limit: "10mb" }));
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

// respond to preflight requests
router.options("*", (req, res) => {
  res.sendStatus(200);
});

const jwt = require("jsonwebtoken");
const myPosts = require("../ORMmodels/myPosts");
const profileDetails = require("../ORMmodels/profile");
const { OAuth2Client } = require("google-auth-library");
// const user = require("../ORMmodels/user");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* send user info to the database */
router.post("/google-login", async (req, res) => {
  try {
    const { credential } = req.body; // ID token from frontend

    if (!credential) {
      return res.status(400).json({ msg: "No Google token provided" });
    }

    // 🔐 Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub: googleId, email, name, picture } = payload;

    // Check user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
        googleId,
        bio: "Just joined ✨",
        coverImage: "default-cover.jpg",
      });
    }

    // Create YOUR app JWT
    const token = jwt.sign({ userId: user._id }, "password", {
      expiresIn: `24h`,
    });

    res.json({ token, user });
  } catch (err) {
    console.error("Google auth error:", err);
    res.status(401).json({ msg: "Invalid Google token" });
  }
});

//login with username and password
// router.post("/loginn", async (req, res) => {
//   const { userName, password } = req.body;
//   const user = await User.findOne({ name: userName });
//   if (!user) {
//     return res.status(404).send("user not registered");
//   } else if (user.password === password) {
//     const token = jwt.sign({ name: userName }, "password", {
//       expiresIn: "1hr",
//     });
//     res.send(token);
//   } else {
//     return res.status(401).send("incorrecrt password");
//   }
// });

// google login
router.post("/login", async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    const token = jwt.sign(
      { name: name, email: email, role: "user" },
      "password",
      {
        expiresIn: "1hr",
      },
    );
    res.json({ token });
  } else {
    return res.send("user not registered");
  }
});

//read user info from db
// router.get("/getUser/:id", async (req, res) => {
//   const { id } = req.params;
//   const userData = await User.findById(id);
//   res.send(userData);
// });

//get profile info
router.get("/profile-details", async (req, res) => {
  try {
    // const { email } = req.body;
    // const user = await User.find({ email: email }).select(
    //   "name avatar bio coverImage",
    // );
    const user = await User.find().select("name avatar bio coverImage");

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    res.send(user);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
});

// save profile details
router.post("/profileDetails", async (req, res) => {
  await profileDetails.create({ ...req.body });
  res.send("profiel details saved");
});
//send profile details
router.get("/profileDetails", async (req, res) => {
  const profileInfo = await profileDetails.find();
  res.json(profileInfo);
  // res.send("profiel details saved");
});

// Update profile using Google OAuth bearer token + payload
router.put(
  "/updateProfile",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("updateProfile request received");
      console.log("Headers:", req.headers);
      console.log("Body:", req.body);
      console.log("Files:", req.files);

      const authHeader = req.headers.authorization || req.headers.Authorization;
      if (!authHeader) {
        console.log("No auth header");
        return res.status(401).json({ msg: "No token provided" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        console.log("No token in header");
        return res.status(401).json({ msg: "Invalid token format" });
      }

      console.log("Verifying token...");
      // Verify custom JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
      console.log("Token verified for userId:", userId);

      // Find user by ID
      let user = await User.findById(userId);
      if (!user) return res.status(404).json({ msg: "User not found" });

      console.log("User found:", user._id);

      // Build update object from form fields and files
      const update = {};
      const { name, bio } = req.body;

      if (name) update.name = name;
      if (bio) update.bio = bio;

      // Handle file uploads
      if (req.files?.avatar && req.files.avatar[0]) {
        const buffer = req.files.avatar[0].buffer;
        update.avatar = `data:${req.files.avatar[0].mimetype};base64,${buffer.toString("base64")}`;
        console.log("Avatar file processed, size:", buffer.length);
      }

      if (req.files?.coverImage && req.files.coverImage[0]) {
        const buffer = req.files.coverImage[0].buffer;
        update.coverImage = `data:${req.files.coverImage[0].mimetype};base64,${buffer.toString("base64")}`;
        console.log("Cover image file processed, size:", buffer.length);
      }

      console.log("Update object:", Object.keys(update));

      if (Object.keys(update).length === 0)
        return res.status(400).json({ msg: "No updatable fields provided" });

      const updatedUser = await User.findByIdAndUpdate(user._id, update, {
        new: true,
      });

      console.log("User updated successfully");
      res.json({ user: updatedUser });
    } catch (err) {
      console.error("update-profile error:", err);
      if (err && err.message && err.message.includes("Token used too late")) {
        return res.status(401).json({ msg: "Expired or invalid token" });
      }
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  },
);

// post the myposts data\
router.post("/:id/myPosts", async (req, res) => {
  const { id } = req.params;
  // fixed: use req.body (not res.body) and await creation
  const posts = await myPosts.create({ user: id, ...req.body });
  res.json({ posts });
});

//get myposts
router.get("/:id/myPosts", async (req, res) => {
  try {
    const { id } = req.params;
    // ensure await and return found posts
    const posts = await User.findById(id).select("media title likesCount");
    if (!posts || posts.length === 0)
      return res.status(404).json({ msg: "Not posted yet" });
    res.json(posts);
  } catch {
    res.status(404).json({ msg: "user not found" });
  }
});
//edit profile
router.put("/:id/myPosts", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) return res.status(404).json({ msg: "No user found" });
    res.json({ updatedUser });
  } catch {
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
