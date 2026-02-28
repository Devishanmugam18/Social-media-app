import { useContext, useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import GoogleSignUpButton from "./mui_components/googleSignUpButton";
import SimpleDialogDemo from "./mui_components/SharePostModal";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Feed from "./pages/Feed.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import CreatePostPreview from "./pages/CreatePostPreview.jsx";
import UserNameAndBioContext from "./context/UserNameAndBio.jsx";
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UserNameBioProvider from "./context/UserNameAndBio.jsx";
// import Login from "./components/Login.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostWithSwiper from "./components/PostWithSwiper.jsx";
import CarouselDots from "./components/CarouselDots.jsx";
// import orderDetails from "../components/orderDetails.jsx";

function App() {
  const [hasError, setHasError] = useState(false);
  // const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  // console.log("isLoggedIn ", isLoggedIn);

  // const { userInfo, setUserInfo } = useContext(userNameAndBioContext);

  return (
    <>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
      >
        {/* <GoogleSignUpButton onClick={() => setHasError(true)} /> */}
        {/* <BuggyComponent shouldThrow={hasError} /> */}
        {/*<SimpleDialogDemo /> */}

        <UserNameBioProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route
              path="/create-post/preview"
              element={<CreatePostPreview />}
            />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/carousel-dots" element={<CarouselDots />} />
          </Routes>
        </UserNameBioProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
