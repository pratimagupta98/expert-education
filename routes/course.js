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
module.exports = router;
