import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { UserNameAndBioContext } from "../context/UserNameAndBio";

function EditProfile() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserNameAndBioContext);
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);

  //banner pic edit
  const bannerInputRef = useRef(null);

  const handleBannerClick = () => {
    bannerInputRef.current?.click();
  };

  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setCoverImageFile(file);
    setUserInfo((prev) => ({
      ...prev,
      coverImage: previewUrl,
    }));
  };

  //profile pic edit
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setAvatarFile(file);
    setUserInfo((prev) => ({
      ...prev,
      avatar: previewUrl,
    }));
  };

  useEffect(() => {
    const saved = localStorage.getItem("userInfo");
    if (saved) {
      setUserInfo(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const token = localStorage.getItem("token");

        console.log("Token from localStorage:", token ? "exists" : "missing");

        const formData = new FormData();
        formData.append("name", userInfo.name);
        formData.append("bio", userInfo.bio);

        // Append actual File objects, not blob URLs
        if (avatarFile) {
          formData.append("avatar", avatarFile);
          console.log("Avatar file added to FormData");
        }
        if (coverImageFile) {
          formData.append("coverImage", coverImageFile);
          console.log("Cover image file added to FormData");
        }

        console.log(
          "Submitting profile update with FormData to:",
          `${apiBaseUrl}/user/updateProfile`,
        );
        const res = await fetch(`${apiBaseUrl}/user/updateProfile`, {
          method: "PUT",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: formData,
        });

        console.log("Response status:", res.status);

        if (!res.ok) {
          const text = await res.text();
          console.error("Error response:", text);
          return;
        }

        const data = await res.json();
        setUserInfo((prev) => ({
          ...prev,
          name: data.user.name,
          bio: data.user.bio,
          avatar: data.user.avatar,
          coverImage: data.user.coverImage,
        }));

        try {
          localStorage.setItem("userInfo", JSON.stringify(data.user));
        } catch (err) {
          console.error("localStorage update error:", err);
        }

        alert("Profile updated successfully!");
        navigate("/profile");
      } catch (err) {
        console.error("Profile update error", err);
        alert("Failed to update profile. Please try again.");
      }
    })();
  };

  return (
    <Box>
      <Box sx={{ marginBottom: "-1.5em", position: "relative" }}>
        <img
          src={userInfo.coverImage}
          alt=""
          style={{
            width: "100%",
            height: "28vh",
            objectFit: "cover",
            borderRadius: "0 0 20px 20px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.8em",
            position: "absolute",
            top: "0.5em",
            margin: "0.8em",
            color: "white",
          }}
        >
          <ArrowBackIcon onClick={() => navigate(-1)} />
          <Typography
            variant="button"
            sx={{
              textTransform: "capitalize",
              // fontFamily: "karla",
              fontWeight: "800",
              fontSize: "1.25rem",
            }}
          >
            Edit Profile
          </Typography>
        </Box>
        <Avatar
          sx={{
            position: "absolute",
            right: "1em",
            top: "6em",
            width: "30px",
            height: "30px",
            bgcolor: "#F4F4F4",
            border: "#F4F4F4",
          }}
          onClick={handleBannerClick}
        >
          <EditIcon sx={{ fontSize: "1rem", color: "#000000" }} />
          <input
            type="file"
            accept="image/*"
            ref={bannerInputRef}
            style={{ display: "none" }}
            onChange={handleBannerChange}
          />
        </Avatar>

        <Avatar
          alt={`${userInfo.name}'s DP `}
          src={userInfo.avatar}
          sx={{
            height: 112,
            width: 112,
            top: { xs: "-2.5em" },
            left: { xs: "0.7em" },
          }}
        />

        <Box sx={{ mt: "-1em" }}>
          <Avatar
            sx={{
              position: "absolute",
              left: "5em",
              top: "10em",
              width: "32px",
              height: "32px",
              bgcolor: "#F4F4F4",
              border: "#F4F4F4",
            }}
            onClick={handleAvatarClick}
          >
            <EditIcon sx={{ fontSize: "1rem", color: "#000000" }} />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </Avatar>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box sx={{ m: "0 1.2em" }}>
            <TextField
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  name: e.target.value,
                })
              }
              variant="standard"
              label="Name"
              // defaultValue={"Sakshi Agarwal"}
              fullWidth
            />
            <TextField
              value={userInfo.bio}
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  bio: e.target.value,
                })
              }
              variant="standard"
              label="Bio"
              // defaultValue={
              //   "Just someone who loves designing, sketching, and finding beauty in the little things 💕"
              // }
              fullWidth
              sx={{ mt: "1em" }}
              multiline
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "9em auto",
              width: "90%",
              borderRadius: "5em",
              bgcolor: "black",
            }}
          >
            Save
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default EditProfile;
