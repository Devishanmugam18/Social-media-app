import {
  Button,
  ImageList,
  ImageListItem,
  Paper,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import GoogleSignUpButton from "../mui_components/googleSignUpButton";
import { useContext, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
// import { LoginContext } from "../context/LoginContext";
// import Login from "../components/login";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
// import { BuggyComponent } from "../App";
import gridImg1 from "../assets/LoginPage/grid_img1.jpg";
import gridImg2 from "../assets/LoginPage/grid_img2.jpg";
import gridImg3 from "../assets/LoginPage/grid_img3.jpg";
import gridImg4 from "../assets/LoginPage/grid_img4.jpg";
import gridImg5 from "../assets/LoginPage/grid_img5.jpg";
import gridImg6 from "../assets/LoginPage/grid_img6.jpg";
import gridImg7 from "../assets/LoginPage/grid_img7.jpg";
import gridImg8 from "../assets/LoginPage/grid_img8.jpg";
import gridImg9 from "../assets/LoginPage/grid_img9.jpg";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { GoogleLogin } from "@react-oauth/google";

const galleryImages = [
  {
    url: gridImg1,
  },
  {
    url: gridImg2,
  },
  {
    url: gridImg3,
  },
  {
    url: gridImg4,
  },
  {
    url: gridImg5,
  },
  {
    url: gridImg6,
  },
  {
    url: gridImg7,
  },
  {
    url: gridImg8,
  },
  {
    url: gridImg9,
  },
];

//error boundary practice

export function BuggyComponent({ shouldThrow }) {
  const navigate = useNavigate();
  return (
    <>
      <p>"oops somthing went wrong"</p>
    </>
  );
}

const LoginPage = () => {
  const [count, setCount] = useState(0);

  if (count > 3) {
    return new Error("oops, something went wrong!");
  }
  const gridCont = {
    backgroundColor: "blue",
  };
  const gridItem = {
    backgroundColor: "orange",
  };
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

      const res = await fetch(`${apiBaseUrl}/user/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data.user));

      navigate("/feed");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Box>
      {/* image gallery */}
      <ImageList variant="masonry" cols={3} gap={8} sx={{ mt: 0, mb: 0 }}>
        {galleryImages.map((image, index) => (
          <ImageListItem key={image.url}>
            <img src={image.url} alt="" />
          </ImageListItem>
        ))}
      </ImageList>
      <Box
        sx={{
          backgroundColor: "#fff",
          height: "45vh",
          mt: "-99px",
          textAlign: "center",
          position: "relative",
          zIndex: "99",
          borderRadius: "35px 35px 0 0",
          marginTop: "-94px",
          // position: "absolute",
          // top: "505px",
          // width: "100%",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" component="h1" sx={{ color: "black" }}>
            Vibesnap
          </Typography>
          <Typography variant="p" sx={{ color: "black", mt: 5 }}>
            Moments That Matter, Shared Forever.
          </Typography>
        </Box>
        {/* <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          sx={{ borderRadius: 9, backgroundColor: "black" }}
          onClick={handleClick}
        >
          Continue with Google
        </Button> */}
        <GoogleLogin
          clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
          onSuccess={handleGoogleSuccess}
          onError={() => console.log("Login failed")}
        />

        {/* error boundary practice */}
        {/* <ErrorBoundary fallback={<BuggyComponent />}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1em",
            }}
          >
            <Button onClick={() => setCount(count + 1)}>+</Button>
            <Typography>{count}</Typography>
            <Button onClick={() => setCount(count - 1)}>-</Button>
          </Box>
        </ErrorBoundary> */}
      </Box>
    </Box>
  );
};

export default LoginPage;
