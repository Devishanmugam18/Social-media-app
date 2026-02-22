// import { Box, Button, TextField, Typography } from "@mui/material";
// import React, { useContext, useState } from "react";
// // import { LoginContext } from "../context/LoginContext";
// import { useNavigate } from "react-router-dom";
// import Paper from "@mui/material/Paper";
// import { Store } from "@mui/icons-material";

// const Login = () => {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   //   const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("user", userName);
//     console.log("password", password);

//     const response = await fetch("http://localhost:3000/user/loginn", {
//       method: "POST",
//       body: JSON.stringify({ userName, password }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.status === 404) {
//       alert("user not found");
//     } else if (response.status === 401) {
//       alert("incorrect password");
//     } else {
//       const token = await response.text();
//       localStorage.setItem("token", token);
//       localStorage.setItem("isLoggedin", true);
//       //   setIsLoggedIn(true);
//       navigate("/feed");
//     }

//     //     if (userName === "admin" && password === "admin") {
//     //       localStorage.setItem("isLoggedIn", true);
//     //       //   setIsLoggedIn(true);
//     //       // store.dispatch(isLoggedIn());
//     //       //   console.log("isLoggedIn", isLoggedIn);
//     //       navigate("/feed");
//     //     } else {
//     //       alert("wrong credentials");
//     //     }
//   };

//   return (
//     // <Box
//     // sx={{
//     //   border: "2px solid red",
//     //   display: "flex",
//     //   flexDirection: "column",
//     //   alignItems: "center",
//     //   justifyContent: "center",
//     //   height: "100vh",
//     //   gap: "0.7em",
//     //   maxWidth: "50vh",
//     //   margin: "auto",
//     // }}
//     // >
//     <Box
//       sx={{
//         // p: 5,
//         pt: 17,
//         margin: "auto",
//         maxWidth: "50vh",
//         maxHeight: "100vh",
//       }}
//     >
//       <form
//         onSubmit={handleSubmit}
//         // sx={{ maxWidth: "50vh", maxHeight: "100vh" }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "1rem",
//             justifyContent: "center",
//             p: 3,
//           }}
//         >
//           <Typography variant="h5">Login</Typography>
//           <TextField
//             placeholder="User name"
//             type="text"
//             onChange={(e) => {
//               setUserName(e.target.value);
//             }}
//           />
//           <TextField
//             placeholder="password"
//             type="password"
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//           />
//           <Button type="submit" variant="contained">
//             Login
//           </Button>
//         </Paper>
//       </form>
//     </Box>
//     // {/* </Box> */}
//   );
// };

// export default Login;
