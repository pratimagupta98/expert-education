var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//other requirements
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

var indexRouter = require("./routes/index");
//var usersRouter = require("./routes/users");
//Require
const user = require("./routes/user");
const staff = require("./routes/staff");
const kycform = require("./routes/kycform");
const course = require("./routes/course");
const category = require("./routes/category");
const video = require("./routes/video");
const notification = require("./routes/notification");
const comment = require("./routes/comment");
const comment1 = require("./routes/comment1");
const pdffile = require("./routes/pdffile");
const admin = require("./routes/admin");
const plan = require("./routes/plan");
const enrollStudent = require("./routes/enrollStudent");
const transection = require("./routes/transection");
const membership = require("./routes/membership");
const user_wallet = require("./routes/user_wallet");
const withdrawal = require("./routes/withdrawal");
const verify_user = require("./routes/verify_user");

const refer_earn = require("./routes/refer_earn");
const add_commision = require("./routes/add_commision");
const chat = require("./routes/chat");
 


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

//Use
app.use("/", indexRouter);
app.use("/api", user);
app.use("/api", staff);
app.use("/api", kycform);
app.use("/api", course);
app.use("/api", category);
app.use("/api", video);
app.use("/api", notification);
app.use("/api", pdffile);
app.use("/api", comment);
app.use("/api", comment1);
app.use("/api", admin);
app.use("/api", plan);
app.use("/api", enrollStudent);
app.use("/api", transection);
app.use("/api", membership);
app.use("/api", user_wallet);
app.use("/api", withdrawal);
app.use("/api", verify_user);
app.use("/api", refer_earn);
app.use("/api", add_commision);

app.use("/api", chat);

 
 
 const fs = require("fs");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log(error);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 5000);
  res.render("error");
});

module.exports = app;

app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

//console.log(process.env.DATABASE);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCEFULLY");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log("Example app listening on port 5000");
});

//    http://localhost:5000/admin
