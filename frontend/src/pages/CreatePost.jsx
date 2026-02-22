import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [galleryMedia, setGalleryMedia] = useState([]);

  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire actual post creation (API / redux)
    console.log("posting", { content, selectedMedia, galleryMedia });
    navigate(-1);
  };

  // Open native camera (mobile friendly) — file input with capture attribute
  const openCamera = () => {
    if (cameraInputRef.current) cameraInputRef.current.click();
  };

  const handleCameraChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const type = file.type && file.type.startsWith("video") ? "video" : "image";
    const item = { id: `${file.name}-${file.lastModified}`, url, type };
    setSelectedMedia(item);
    setGalleryMedia((prev) => [item, ...prev]);
    console.log("camera selected", item);
    console.log("selectedMedia", selectedMedia);
    console.log("galleryMedia", galleryMedia);
    e.target.value = null;
  };

  const openGallery = () => {
    if (galleryInputRef.current) galleryInputRef.current.click();
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const mapped = files.map((file, idx) => ({
      id: `${file.name}-${file.lastModified}-${idx}`,
      url: URL.createObjectURL(file),
      type: file.type && file.type.startsWith("video") ? "video" : "image",
    }));
    setGalleryMedia((prev) => [...mapped, ...prev]);
    setSelectedMedia(mapped[0]);
    e.target.value = null;
  };

  return (
    <Box>
      {/* Preview */}
      <Box
        sx={{
          width: "100%",
          mb: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* overlay controls */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 1,
            zIndex: 10,
            pointerEvents: "none",
            top: "25px",
          }}
        >
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              color: "#fff",
              pointerEvents: "auto",
              width: 32,
              height: 32,
              left: "16px",
            }}
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>

          <Button
            onClick={() =>
              navigate("/create-post/preview", {
                state: { selectedMedia, galleryMedia, content },
              })
            }
            sx={{
              pointerEvents: "auto",
              color: "#FFFFFF",
              textTransform: "none",
              borderRadius: 2,
              px: 1.5,
              fontFamily: "Karla, sans-serif",
              fontWeight: 700,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
            size="small"
          >
            Next
          </Button>
        </Box>
        {selectedMedia ? (
          selectedMedia.type === "video" ? (
            <video
              src={selectedMedia.url}
              controls
              style={{
                width: "100%",
                height: 320,
                objectFit: "cover",
                background: "#000",
                display: "block",
              }}
            />
          ) : (
            <img
              src={selectedMedia.url}
              alt="preview"
              style={{
                width: "100%",
                height: 320,
                objectFit: "cover",
                display: "block",
              }}
            />
          )
        ) : (
          <Box
            sx={{
              width: "100%",
              height: 320,
              bgcolor: "#f3f3f3",
              borderRadius: 1,
            }}
          />
        )}
      </Box>

      <form onSubmit={handleSubmit}>
        {/* <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 2 }}
        /> */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: 1,
            mb: 2,
          }}
        >
          <IconButton onClick={openGallery} aria-label="open gallery">
            <PhotoLibraryIcon />
          </IconButton>
          <IconButton onClick={openCamera} aria-label="open camera">
            <CameraAltIcon />
          </IconButton>
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleGalleryChange}
            style={{ display: "none" }}
          />

          {/* This input uses the capture attribute so mobile devices open the camera */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*,video/*"
            capture="environment"
            onChange={handleCameraChange}
            style={{ display: "none" }}
          />
        </Box>

        {/* Thumbnails */}
        {galleryMedia.length > 0 && (
          <Grid container spacing={1} sx={{ mb: 2 }}>
            {galleryMedia.map((m) => (
              <Grid item xs={4} key={m.id}>
                {m.type === "video" ? (
                  <video
                    src={m.url}
                    style={{
                      width: "100%",
                      height: 96,
                      objectFit: "cover",
                      cursor: "pointer",
                      borderRadius: 6,
                    }}
                    muted
                    playsInline
                    onClick={() => setSelectedMedia(m)}
                  />
                ) : (
                  <img
                    src={m.url}
                    alt="thumb"
                    style={{
                      width: "100%",
                      height: 96,
                      objectFit: "cover",
                      cursor: "pointer",
                      borderRadius: 6,
                    }}
                    onClick={() => setSelectedMedia(m)}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        )}

        {/* <Box sx={{ display: "flex", gap: 1 }}>
          <Button type="submit" variant="contained">
            Post
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Box> */}
      </form>
    </Box>
  );
};

export default CreatePost;
