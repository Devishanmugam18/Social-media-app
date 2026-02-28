import { React, useContext, useEffect, useState } from "react";
// import profilePic from "../assets/FeedPage/ProfilePic.jpg";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import user1ProfilePic from "../assets/FeedPage/user1.png";
import user2ProfilePic from "../assets/FeedPage/user2.jpg";
import user1PostImg1 from "../assets/FeedPage/user1PostImg1.png";
import user1PostImg2 from "../assets/FeedPage/user1PostImg2.png";
import user2PostImg1 from "../assets/FeedPage/user2PostImg1.jpg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import SharePostModal from "../mui_components/SharePostModal";
import CloseIcon from "@mui/icons-material/Close";
//social media icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import RedditIcon from "@mui/icons-material/Reddit";
import SmartToyIcon from "@mui/icons-material/SmartToy"; //dicord icon- NA
import WhatsApp from "@mui/icons-material/WhatsApp";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt"; // messager icon - NA
import Telegram from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import { blue } from "@mui/material/colors";
import {
  ContentCopy,
  ContentCopyOutlined,
  CopyAll,
  CopyAllOutlined,
  CopyAllRounded,
  CopyAllSharp,
  CopyAllTwoTone,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { UserNameAndBioContext } from "../context/UserNameAndBio";
import { formatDistanceToNow } from "date-fns";
import PostWithSwiper from "../components/PostWithSwiper";
import CarouselDots from "../components/CarouselDots";

const socialMedia = [
  {
    name: "Twitter",
    icon: (
      <TwitterIcon
        sx={{
          fontSize: 30,
          color: blue[600],
        }}
      />
    ),
    bgColor: blue[100],
  },
  {
    name: "Facebook",
    icon: <FacebookIcon sx={{ fontSize: 30, color: "#1877F2" }} />,
    bgColor: blue[100],
  },
  {
    name: "Reddit",
    icon: <RedditIcon sx={{ fontSize: 30, color: "#FF5722" }} />,
    bgColor: "#FDECE7",
  },
  {
    name: "Discord",
    icon: <SmartToyIcon sx={{ fontSize: 30, color: "#6665D2" }} />,
    bgColor: "#ECF5FA",
  },
  {
    name: "WhatsApp",
    icon: <WhatsApp sx={{ fontSize: 30, color: "#67C15E" }} />,
    bgColor: "#E7FBF0",
  },
  {
    name: "Messenger",
    icon: <OfflineBoltIcon sx={{ fontSize: 30, color: "#1E88E5" }} />,
    bgColor: "#E5F3FE",
  },
  {
    name: "Telegram",
    icon: <Telegram sx={{ fontSize: 30, color: "#1B92D1" }} />,
    bgColor: "#E6F3FB",
  },
  {
    name: "Instagram",
    icon: (
      <InstagramIcon
        sx={{
          fontSize: 30,
          background: "linear-gradient(to bottom,#FFDD55,#FF543E,#C837AB )",
        }}
      />
    ),
    bgColor: "#FF40C617",
    // bgColor: "linear-gradient(to right,#FFDD55,#FF543E,#C837AB )",
  },
];

// const postsDetails = [
//   {
//     id: 0,
//     name: "Arav",
//     profilePic: user1ProfilePic,
//     postedTime: "2 hours ago",
//     caption:
//       "Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽",
//     hashTags: "#NYC #Travel",
//     likes: 67,
//     postedMedia: [
//       {
//         id: "media0",
//         url: user1PostImg1,
//       },
//       {
//         id: "media1",
//         url: user1PostImg2,
//       },
//     ],
//   },
//   {
//     id: 1,
//     name: "Sneha",
//     profilePic: user2ProfilePic,
//     postedTime: "1 day ago",
//     caption:
//       "Taking a moment to slow down, breathe, and focus on myself. 🌿✨ Self-care isn’t selfish – it’s necessary. 💕",
//     hashTags: "#SelfCare #MeTime #Wellness",
//     likes: 68,
//     postedMedia: [
//       {
//         id: "media0",
//         url: user2PostImg1,
//       },
//     ],
//   },
// ];

function Feed() {
  const [feedData, setFeedData] = useState([]);
  const [profileDetails, setProfileDetails] = useState([]);
  const [user, setUser] = useState([]);
  // const [userInfo, setUserInfo] = useContext(UserNameAndBioContext);

  // console.log("feed data state", feedData);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function fetchAllFeeds() {
      const token = localStorage.getItem("token");

      const userInfo = localStorage.getItem("userInfo");
      // setUser(JSON.parse(userInfo));
      try {
        const response = await fetch(`${apiBaseUrl}/feed/getAllFeed`, {
          // body: JSON.stringify({ userName, password }),
          // headers: { "Content-Type": "application/json" },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFeedData(data.post);
        console.log("get al feed", data.post);
      } catch (err) {
        console.log("getAllFeed error", err);
      }

      // return response;
    }

    // console.log("getallfeed", );
    fetchAllFeeds();
  }, []);

  useEffect(() => {
    async function fetchProfileDetails() {
      try {
        const res = await fetch(`${apiBaseUrl}/user/profile-details`, {
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`Error:${res.status}`);
        }
        const data = await res.json();
        console.log("profile details res", data);
        setProfileDetails(data);
      } catch (err) {
        console.log("error", err);
      }
    }
    fetchProfileDetails();
    // console.log("profile details", profileDetails);
  }, []);

  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [copyState, setCopyState] = useState(null);
  const [url, setUrl] = useState(null);
  // const url = "www.arav.feed/";
  // const router = useRouter();
  const navigate = useNavigate();

  //context name
  const { userInfo, setUserInfo } = useContext(UserNameAndBioContext);
  // console.log("userInfo.name", userInfo.name);

  const handleCopyClipborad = async (url, index) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyState(index);
      setTimeout(() => {
        setCopyState(null);
      }, 1500);
    } catch (err) {
      console.error("failed to copy", err);
    }
  };

  const handleShare = () => {};

  return (
    <Box sx={{ p: 2 }}>
      <Box
        onClick={() => navigate("/profile")}
        sx={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "flexStart",
          gap: "0.5em",
          mb: 4,
          // ml: "14%",
        }}
      >
        <Avatar src={userInfo.avatar} />
        <Box>
          <Typography variant="p" sx={{ fontSize: "12px", color: "gray" }}>
            Welcome Back,
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                fontSize: "1.3em",
                color: "black",
              }}
            >
              {userInfo.name}
            </Typography>
          </Typography>
        </Box>
      </Box>

      {/* feeds */}
      <Typography variant="h5" sx={{ mb: 1 }}>
        Feeds
      </Typography>
      <Box
        sx={{
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          // flexDirection: "column",
          // gap: 1,
          width: "100%",

          // minHeight: "15vh",
        }}
      >
        {feedData.map((doc, index) => {
          const profile = profileDetails.find((p) => {
            return p._id === doc.userId;
          });
          console.log("profile found after find", profile);

          const uiItem = {
            id: doc._id,
            userId: doc.userId,
            name: profile?.name || "User", // adapt based on your schema
            profilePic: profile?.avatar || "/defaultProfile.png",
            postedTime: formatDistanceToNow(new Date(doc.createdAt), {
              addSuffix: true,
            }),
            // caption: doc.content,
            // hashTags: doc.hashTags,
            postedMedia: doc.media.map((item, i) => ({
              id: `${doc._id}-${i}`,
              item,
            })),

            likes: doc.likes,
          };
          {
            console.log("posted media after map transform", uiItem.postedMedia);
            console.log("uiItem", uiItem);
          }
          const postUrls = uiItem.postedMedia.flatMap((media) => {
            return media.item.post.map((url, idx) => ({
              id: `${media.id}-${idx}`,
              url,
            }));
          });
          console.log("postUrls", postUrls);
          return (
            <Box key={doc._id} sx={{ mb: 1.5 }}>
              <Card
                sx={{
                  maxWidth: 345,
                  minHeight: 340,
                  // maxHeight: 400,
                  backgroundColor: "#F7EBFF",
                }}
              >
                {/* <CardHeader
                  avatar={<Avatar src={doc.profilePic} />}
                  title={uiItem.name}
                  subheader={uiItem.postedTime}
                  // sx={{ p: 0 }}
                ></CardHeader>
                {console.log("posted time", uiItem.postedTime)}
                <CardContent sx={{ padding: "0 16px" }}>
                  <Typography variant="body2">{uiItem.caption}</Typography>
                  <Typography variant="body2" sx={{ color: "#42a5f5" }}>
                    {uiItem.hashTags}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5em",
                      padding: "0.8em 0",
                      // sm:{{"padding": "0.8em 0",}}
                    }}
                  > */}
                {uiItem.postedMedia.map((media) => {
                  return (
                    <Box key={media.id}>
                      <CardHeader
                        avatar={<Avatar src={profile?.avatar} />}
                        title={uiItem.name}
                        subheader={uiItem.postedTime}
                        // sx={{ p: 0 }}
                      ></CardHeader>
                      <Box sx={{ padding: "0 16px" }}>
                        <Typography variant="body2">
                          {media.item.caption}
                        </Typography>
                        {/* <Typography variant="body2" sx={{ color: "#42a5f5" }}>
                          {uiItem.hashTags}
                        </Typography> */}
                      </Box>
                      <CardContent>
                        {/* <Grid container spacing={1}> */}
                        {/* {media.item.post.map((url, index) => {
                            // return (
                              // <Grid item xs={6} key={index}>
                              //   <Box
                              //     sx={
                              //       {
                              //         display: "flex",
                              //         alignItems: "center",
                              //         justifyContent: "center",
                              //         gap: "0.5em",
                              //         padding: "0.8em 0",
                              //         flex: 1,

                              //       }
                              //     }
                              //   >
                              //   <CardMedia
                              //     component="img"
                              //     // key={index}
                              //     image={url}
                              //     sx={{
                              //       // maxWidth: "304px",
                              //       // maxHeight: "168px",
                              //       width: "100%",
                              //       height: "200px",
                              //       borderRadius: "12px",
                              //     }}
                              //   ></CardMedia>
                              //   </Box>
                              // </Grid>
                              // );
                              })} */}
                        {/* </Grid> */}
                        <PostWithSwiper
                          mediaList={postUrls}
                          carouselDots={true}
                        />
                        {/* <CarouselDots mediaList={postUrls} /> */}
                      </CardContent>
                      {/* <CardFooter> */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0px 16px 16px",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            // padding: " 0px 16px 16px",
                            // justifyContent: "spaceBetween",
                          }}
                        >
                          {/* <FavoriteBorderIcon color="red" /> */}
                          <FavoriteIcon sx={{ color: "#D95B7F" }} />
                          <Typography variant="body2">
                            {media.item.likes}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            // variant="contained"
                            onClick={() => {
                              const url = `https://www.${uiItem.name}/feed/`;
                              // return (
                              setModalIsOpen(true);
                              setUrl(url);
                              // )
                            }}
                            sx={{
                              borderRadius: 10,
                              backgroundColor: "#00000012",
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              // justifyContent: "space-between",
                              textTransform: "none",
                            }}
                          >
                            {" "}
                            <ShareIcon
                              // fontSize="small"
                              variant="rounded"
                              sx={{
                                color: "black",
                                fontSize: 17,

                                // Style
                                // SemiBold
                              }}
                            />
                            <Typography
                              sx={{
                                color: "black",
                                fontFamily: "Karla",
                                fontWeight: "600",
                                fontSize: "14px",
                              }}
                            >
                              Share
                            </Typography>
                          </Button>
                        </Box>

                        {/* modal */}
                        <Modal
                          open={ModalIsOpen}
                          // hideBackdrop

                          // anchorOrigin={{ horizontal: "50%", vertical: "30%" }}
                        >
                          <Paper
                            sx={{
                              color: "white",

                              m: { xs: " 7em 1em", sm: "5em 15em" },
                              // margin: "auto",
                              // position: "absolute",
                              // top: "27%",
                              // // left: "20%",
                              // transform: "translate(50%, 50%)",
                              // width: 300,
                              backgroundColor: "white",
                              color: "black",
                              // border: "2px solid blue",
                              boxShadow: 24,
                              p: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                // borderRadius: "20px",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: "Karla",
                                  fontWeight: "800",
                                  fontSize: "22px",
                                }}
                              >
                                Share Post
                              </Typography>
                              <CloseIcon
                                sx={{
                                  backgroundColor: "#F5F5F5",
                                  borderRadius: "15px",
                                  p: 0.7,
                                  fontSize: 18,
                                }}
                                onClick={() => setModalIsOpen(false)}
                              />
                            </Box>

                            <Grid
                              container
                              spacing={2}
                              rowGap={2}
                              sx={{
                                p: "1.5em 0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              // sx={{ border: "2px solid black" }}
                            >
                              {socialMedia.map((item, name) => (
                                <Grid
                                  key={name}
                                  size={3}
                                  // sx={{ border: "2px solid blue" }}
                                >
                                  <Avatar
                                    sx={{
                                      p: 1.3,
                                      backgroundColor: `${item.bgColor}`,
                                    }}
                                  >
                                    {item.icon}
                                  </Avatar>
                                  <Typography
                                    sx={{
                                      fontSize: "0.8em",
                                      textAlign: "center",
                                    }}
                                  >
                                    {item.name}
                                  </Typography>
                                </Grid>
                              ))}
                            </Grid>
                            {/* {postsDetails.map((item, index) => { */}
                            {/* return ( */}
                            <Box
                              // key={item.id}
                              sx={{
                                position: "relative",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography variant="body1">
                                  Page Link
                                </Typography>
                                {copyState === index && (
                                  <Typography
                                    sx={{
                                      color: "gray",
                                      fontSize: "1em",
                                      // fontFamily: "monospace",
                                    }}
                                  >
                                    Copied to clipboard
                                  </Typography>
                                )}
                              </Box>

                              <TextField
                                value={url}
                                size="small"
                                // sx={{ fontSize: "1em" }}
                                fullWidth
                                slotProps={{
                                  input: {
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          onClick={() => {
                                            handleCopyClipborad(url, index);
                                          }}
                                        >
                                          <ContentCopy
                                            sx={{ cursor: "pointer" }}
                                          />
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  },
                                }}
                              />
                            </Box>
                            {/* ); */}
                            {/* })} */}
                          </Paper>
                        </Modal>
                      </Box>
                    </Box>
                  );
                })}

                {/* ))} */}
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Feed;
