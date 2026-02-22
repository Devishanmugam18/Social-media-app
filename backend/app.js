var createError = require("http-errors");
require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
let mathRouter = require("./routes/math");
// const ProductsRouter = require("./routes/products");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const profileRouter = require("./routes/profile");
const feedRouter = require("./routes/feed");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/SocialMedia")
  .then(() => console.log("Mongodb connected"));

var app = express();
// app.use("/math", mathRouter);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors(),
  // cors({
  //   origin: "http://localhost:5173",
  //   credentials: true,
  //   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  //   allowedHeaders: ["Content-Type", "Authorization"],
  // }),
);
app.options("*", cors());

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/profile", profileRouter);
(app.use("/feed", feedRouter),
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  }));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
