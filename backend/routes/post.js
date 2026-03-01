const express = require("express");
// const Post = require("../ORMmodels/Post");
const jwt = require("jsonwebtoken");
const myPosts = require("../ORMmodels/myPosts");
const feedPosts = require("../ORMmodels/feed");
// const AWS = require("aws-sdk");
// const { GetObjectCommand } = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const router = express.Router();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const authorization = (req, res, next) => {
  const token = req.headers.authorization;
  const tokenValue = token.split(" ")[1];
  jwt.verify(tokenValue, "password", (err, user) => {
    if (err) {
      return res.json({ error: "authorization failed" });
    } else {
      req.user = user;
      next();
    }
  });
};

router.post("/generate-upload-url", authorization, async (req, res) => {
  try {
    const { fileName, fileType } = req.body;

    const key = `posts/${req.user.userId}/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60,
    });

    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    res.json({ uploadUrl, fileUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate upload URL" });
  }
});

//delete if the new implemntation works
// router.post("/createPost", authorization, async (req, res) => {
//   try {

//     const { caption, images } = req.body;
//     const user = await myPosts.findOne({ user: req.user.userId });
//     if (user) {
//       await myPosts.findOneAndUpdate(
//         { user: req.user.userId },
//         { $push: { media: images } },
//         { new: true },
//       );
//       res.json({ message: "post updated on existing user doc", user });
//     } else {
//       await myPosts.create({ user: req.user.userId, ...req.body });
//       res.json({ message: "post stored in db by creating new doc" });
//     }

//     //store in feed collection as well
//     await feedPosts.create({
//       userId: req.user.userId,
//       media: images,
//     });
//     res.json({ message: "post stored in feed collection" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "post creation failed", err });
//   }
// });

router.post("/createPost", authorization, async (req, res) => {
  try {
    const { images, caption } = req.body;

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "No images provided" });
    }

    // Create media object as per schema
    const mediaObject = {
      id: Date.now().toString(),
      mediaType: "image",
      post: images, // array of S3 URLs
      caption: caption || "",
      likes: 0,
    };

    // 1️⃣ Store in feedPosts
    await feedPosts.create({
      userId: req.user.userId,
      media: [mediaObject], // feed schema expects array
    });

    // 2️⃣ Store in myPosts (single doc per user)
    const existingUser = await myPosts.findOne({
      user: req.user.userId,
    });

    if (existingUser) {
      await myPosts.findOneAndUpdate(
        { user: req.user.userId },
        { $push: { media: mediaObject } },
        { new: true },
      );
    } else {
      await myPosts.create({
        user: req.user.userId,
        media: [mediaObject],
      });
    }

    res.json({ message: "Post stored in feed & myPosts" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Post creation failed" });
  }
});

//delete if the new implemntation works
router.get(
  "/:id/getPost",
  /*authorization,*/ async (req, res) => {
    try {
      const { id } = req.params;
      const posts = await myPosts.find({ user: id }).select("media");
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  },
);

// router.get("/:id/getPost", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const posts = await myPosts.find({ user: id }).select("media").lean(); // important

//     for (let userDoc of posts) {
//       for (let mediaItem of userDoc.media) {
//         const signedUrls = [];

//         for (let imageUrl of mediaItem.post) {
//           // Extract key from stored full S3 URL
//           const key = imageUrl.split(".amazonaws.com/")[1];

//           const command = new GetObjectCommand({
//             Bucket: process.env.S3_BUCKET_NAME,
//             Key: key,
//           });

//           const signedUrl = await getSignedUrl(s3Client, command, {
//             expiresIn: 3600, // 1 hour
//           });

//           signedUrls.push(signedUrl);
//         }

//         mediaItem.post = signedUrls;
//       }
//     }

//     res.json(posts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch posts" });
//   }
// });

module.exports = router;
