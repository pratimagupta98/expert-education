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
}

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
  coursebytitle,
   
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
      name: "pdf_image",
    },
    {
      name: "pdf_file",
    },
    {
      name: "video_image",
    },
    {
      name: "video_file",
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
      name: "pdf_image",
    },
    {
      name: "pdf_file",
    },
    {
      name: "video_image",
    },
    {
      name: "video_file",
    },
  ]),
  addcoursebyadmin
);
router.post("/admin/editcourse/:id", editcourse);
router.get("/admin/viewonecourse/:id", viewonecourse);
router.get("/admin/viewonecoursep/:id", viewonecoursep);
router.get("/admin/allcourse", allcourse);
router.get("/admin/mycourses", verifyToken, mycourses);
router.get("/admin/allcoursebyrecent", allcoursebyrecent);
router.get("/admin/deletecourse/:id", deletecourse);
router.get("/admin/countcourse", countcourse);
router.get("/admin/coursebytitle/:id", coursebytitle);
module.exports = router;
