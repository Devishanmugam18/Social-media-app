import React, { useContext, useRef, useState } from "react";
import banner from "../assets/ProfilePage/banner.png";
import profilePic from "../assets/FeedPage/ProfilePic.jpg";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import designMeet from "../assets/ProfilePage/Design-meet.png";
import workingOnB2B from "../assets/ProfilePage/working-on-B2B.png";
import parachute from "../assets/ProfilePage/parachute.png";
import { Repeat } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { UserNameAndBioContext } from "../context/UserNameAndBio";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useEffect } from "react";
import PostWithSwiper from "../components/PostWithSwiper";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserNameAndBioContext);
  const galleryInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const [myPosts, setMyPosts] = useState([]); // Change from static array to state
  const [loading, setLoading] = useState(true); // Optional: for loading indicator
  const [error, setError] = useState(null);
  //triggers click func for hidden input elem
  const handleGalleryOpen = () => {
    galleryInputRef.current.click();
  };

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${apiBaseUrl}/post/${userInfo?._id}/getPost`,
          {
            // headers: {
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`, // If your backend requires auth
            },
            // },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setMyPosts(data); // Assuming backend returns an array of posts
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMyPosts();
  }, [userInfo._id]); // Refetch if user ID changes

  return (
    <Box>
      <Box sx={{ marginBottom: "-1.5em", position: "relative" }}>
        <ArrowBackIcon
          sx={{
            position: "absolute",
            top: "1em",
            left: "0.5em",
            color: "white",
          }}
          onClick={() => navigate(-1)}
        />
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
        <Button
          variant="outlined"
          sx={{
            color: "black",
            //   backgroundColor: "white",

            position: "absolute",
            left: "136px",
            top: { xs: "12.5em" },
            // margin: { xs: "0 0.5em" },
            // top: ,
            borderRadius: " 90px",
            border: "1px solid black",
            width: "180px",
            height: "32px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/edit-profile")}
        >
          Edit profile
        </Button>
      </Box>
      <Box>
        <Typography
          sx={{
            margin: "0 0.6em 0.6em",
            fontFamily: "karla",
            fontWeight: "800",
            fontSize: "24px",
            lineHeight: "100%",
          }}
        >
          {userInfo.name}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Kumbh Sans",
            fontWeight: "400",
            fontStyle: "Regular",
            fontSize: "14px",
            leadingTrim: "none",
            lineHeight: "100%",
            letterSpacing: "0%",
            margin: "5px 15px",
          }}
        >
          {userInfo.bio}
        </Typography>
      </Box>
      <Typography
        sx={{
          margin: "20px 16px 12px",
          fontFamily: "karla",
          fontSize: "18px",
          fontWeight: "600",
          lineHeight: "100%",
        }}
      >
        My Posts
      </Typography>
      {loading && <Typography>Loading posts...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}
      {!loading && !error && myPosts.length === 0 && (
        <Typography>No posts yet.</Typography>
      )}

      <Box
        display="grid"
        gridTemplateColumns="repeat(2,1fr)"
        gap={1}
        sx={{ margin: "15px" }}
      >
        {console.log("Rendering posts:", myPosts)}
        {myPosts.flatMap((postItem) =>
          // <Box key={postItem._id}>
          postItem.media.map((mediaItem) => {
            const { caption, likes, id, post } = mediaItem;
            console.log("Post item:", post);
            const postUrls = post.flatMap((p) => {
              return { id: p.id, url: p };
            });
            console.log("Post URLs for post", id, ":", postUrls);

            return (
              <Card key={mediaItem.id} sx={{ position: "relative" }}>
                {/* <Box sx={{ display: "flex", gap: 2, overflow: "auto" }}> */}
                <Box sx={{ width: "100%" }}>
                  <PostWithSwiper mediaList={postUrls} imageCountLabel={true} />
                  <CardContent
                    sx={{
                      position: "absolute",
                      bottom: "10",
                      color: "white",
                      padding: "0px 5px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "white", mb: 0.3 }}
                    >
                      {caption}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <FavoriteIcon fontSize="small" color="#FFFFFF" />
                      <Typography variant="caption">{likes} </Typography>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            );
          }),
        )}
        <AddCircleIcon
          onClick={() => navigate("/create-post")}
          sx={{
            position: "sticky",
            left: "5.7em",
            bottom: "0.1em",
            fontSize: "3em",
            zIndex: 99,
          }}
        />
      </Box>
    </Box>
  );
};

export default Profile;
