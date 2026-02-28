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

  // function handleCreatePost() {
  //   const token = localStorage.getItem("token");

  //   const formattedMedia = [
  //     {
  //       id: Date.now(),
  //       post: mediaList.map((m) => m.url),
  //       caption,
  //     },
  //   ];
  //   console.log("formattedMedia", formattedMedia);
  //   fetch("http://localhost:3000/post/createPost", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       ...(token ? { Authorization: `Bearer ${token}` } : {}),
  //     },
  //     body: JSON.stringify({
  //       media: formattedMedia,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Post created:", data);
  //       navigate("/profile");
  //     })
  //     .catch((error) => {
  //       console.error("Error creating post:", error);
  //     });
  // }
  async function handleCreatePost() {
    const token = localStorage.getItem("token");

    const uploadedUrls = [];

    for (let media of mediaList) {
      const fileResponse = await fetch(media.url);
      const file = await fileResponse.blob();

      // 1️⃣ Get presigned URL
      const res = await fetch(
        "http://localhost:3000/post/generate-upload-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fileName: `image-${Date.now()}.jpg`,
            fileType: file.type,
          }),
        },
      );

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
    await fetch("http://localhost:3000/post/createPost", {
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

      {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Box
          sx={{
            width: 260,
            height: 260,
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Swiper
            onSwiper={(s) => (swiperRef.current = s)}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            slidesPerView={1}
            style={{ width: "100%", height: "100%" }}
          >
            {mediaList.map((m, idx) => (
              <SwiperSlide key={m.id || idx}>
                {m.mediaType === "video" ? (
                  <video
                    src={m.url}
                    controls
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <img
                    src={m.url}
                    alt={`preview-${idx}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(255,255,255,0.95)",
              px: 1,
              py: 0.4,
              borderRadius: 2,
              fontSize: 12,
              fontWeight: 700,
              zIndex: 10,
            }}
          >
            {activeIndex + 1}/{mediaList.length}
          </Box>
        </Box>
      </Box> */}
      <PostWithSwiper
        mediaList={mediaList}
        carouselDots={true}
        imageCountLabel={true}
      />
      {/* custom pagination dots below the preview */}

      {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 1, gap: 1 }}>
        {mediaList.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => swiperRef.current?.slideTo(idx)}
            sx={{
              width: 8,
              height: 8,
              bgcolor: activeIndex === idx ? "#000" : "#ccc",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        ))}
      </Box> */}

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
