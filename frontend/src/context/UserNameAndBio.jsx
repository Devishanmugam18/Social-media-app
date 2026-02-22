import { createContext, useEffect, useState } from "react";
import profilePic from "../assets/FeedPage/ProfilePic.jpg";
import banner from "../assets/ProfilePage/banner.png";

export const UserNameAndBioContext = createContext();

const UserNameBioProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || {},
  );

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <div>
      <UserNameAndBioContext.Provider value={{ userInfo, setUserInfo }}>
        {children}
      </UserNameAndBioContext.Provider>
    </div>
  );
};

export default UserNameBioProvider;
