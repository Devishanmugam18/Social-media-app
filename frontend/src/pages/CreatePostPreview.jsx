import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  IconButton,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PostWithSwiper from "../components/PostWithSwiper";

const CreatePostPreview = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const selected = state?.selectedMedia || null;
  const gallery = state?.galleryMedia || [];
  const content = state?.content || "";

  const mediaList =
    gallery && gallery.length > 0 ? gallery : selected ? [selected] : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const [caption, setCaption] = useState(content || "");

  if (!mediaList.length) {
    // If no media was passed, go back to create step
    return (
      <Box sx={{ p: 2 }}>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </Box>
    );
  }

  async function handleCreatePost() {
    const token = localStorage.getItem("token");
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const uploadedUrls = [];

    for (let media of mediaList) {
      const fileResponse = await fetch(media.url);
      const file = await fileResponse.blob();

      // 1️⃣ Get presigned URL
      const res = await fetch(`${apiBaseUrl}/post/generate-upload-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fileName: `image-${Date.now()}.jpg`,
          fileType: file.type,
        }),
      });

      const { uploadUrl, fileUrl } = await res.json();

      // 2️⃣ Upload directly to S3
      await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      uploadedUrls.push(fileUrl);
    }

    // 3️⃣ Save post in DB
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/post/createPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        caption,
        images: uploadedUrls,
      }),
    });

    navigate("/profile");
  }

  return (
    <Box sx={{ minHeight: "100vh", px: 2, pb: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ p: 0 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography sx={{ fontWeight: 700 }}>New post</Typography>
      </Box>

      <PostWithSwiper
        mediaList={mediaList}
        carouselDots={true}
        imageCountLabel={true}
      />

      <Box sx={{ mt: 2 }}>
        <TextareaAutosize
          minRows={3}
          maxRows={5}
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            resize: "none",
            fontFamily: "Kumbh Sans",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "18px",
          }}
        />
      </Box>

      <Box sx={{ position: "fixed", left: 0, right: 0, bottom: 18, px: 3 }}>
        <Button
          variant="contained"
          onClick={handleCreatePost}
          sx={{
            width: "100%",
            backgroundColor: "#000",
            borderRadius: 99,
            py: 1.5,
          }}
        >
          CREATE
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePostPreview;
