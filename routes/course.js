const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { check } = require("express-validator");
const { verifyToken } = require("../functions/stafftoken");
const multer = require("multer");
const {} = require("multer");
const fs = require("fs");

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
  const base64 = fs.readFileSync("./uploads/foo.img", "base64");
// Convert base64 to buffer => <Buffer ff d8 ff db 00 43 00 ...
const buffer = Buffer.from(base64, "base64");

fs.writeFileSync("./uploads/foo.img", buffer);
}

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return  Buffer.from(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
  // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
  var bitmap =  Buffer.from(base64str, 'base64');
  // write buffer to file
  fs.writeFileSync(file, bitmap);
  console.log('******** File created from base64 encoded string ********');
}

// convert image to base64 encoded string
var base64str = base64_encode('./uploads/foo.img');
console.log(base64str);
// convert base64 string back to image 
base64_decode(base64str, './uploads/foo.img');
 
 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });
//let multipleUpload = upload.fields([{ name: "course_image", maxCount: 1 }]);

const {
  addcourse,
  addcoursebyadmin,
  editcourse,
  viewonecourse,
  viewonecoursep,
  mycourses,
  allcourse,
  allcoursebyrecent,
  deletecourse,
  countcourse,
  //coursebytitle,
  updatecourse,
  coursebytitle,
  allcoursefree,
  searchcourse,
  editcoursebystaff,
 } = require("../controllers/course");

//Paths
router.post(
  "/admin/addcourse",
  verifyToken,
  upload.fields([
    {
      name: "course_image",
    },

    {
      name: "posterimg",
    },
  ]),
  addcourse
);

router.post(
  "/admin/addcoursebyadmin",
  upload.fields([
    {
      name: "course_image",
    },
    {
      name: "posterimg",
    },
  ]),
  addcoursebyadmin
);
router.post(
  "/admin/editcourse/:id",
  upload.fields([
    {
      name: "course_image",
    },
    {
      name: "posterimg",
    },
  ]),
  editcourse
);
router.post(
  "/user/editcoursebystaff/:id",
  upload.fields([
    {
      name: "course_image",
    },
    {
      name: "posterimg",
    },
  ]),
  verifyToken,
  editcoursebystaff
);
router.get("/admin/viewonecourse/:id", verifyToken, viewonecourse);
router.get("/admin/viewonecoursep/:id", viewonecoursep);
router.get("/admin/allcourse", allcourse);
router.get("/admin/mycourses", verifyToken, mycourses);
router.get("/admin/allcoursebyrecent", allcoursebyrecent);
router.get("/admin/deletecourse/:id", deletecourse);
router.get("/user/countcourse", verifyToken, countcourse);
//router.get("/admin/coursebytitle/:id", coursebytitle);
router.post("/user/updatecourse/:id", updatecourse);
router.get("/admin/coursebytitle/:id", coursebytitle);
router.get("/user/allcoursefree", allcoursefree);
 
router.post("/user/searchcourse", searchcourse);
module.exports = router;
 