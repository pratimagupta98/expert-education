const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { check } = require("express-validator");
//const { verifyToken } = require("../functions/stafftoken");
const { verifyToken } = require("../functions/stafftoken");

const multer = require("multer");
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

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploads = multer({ storage: storage });

let multipleUpload = uploads.fields([
  { name: "image", maxCount: 1 },
 
]);
const {
  addstaff,
  changepassstaff,
  editprofile,
  stafflogin,
  setting,
  settingbytoken,
  viewonestaff,
  viewonestaffbytoken,
  viewstaffbytoken,
  allstaff,
  deletestaff,
  approved_staff,
  countstaff,
} = require("../controllers/staff");

//paths

router.post("/admin/addstaff",multipleUpload, addstaff);
router.post("/admin/stafflogin", stafflogin);
router.post("/admin/changepassstaff/:id", changepassstaff);
router.post("/admin/setting/:id", multipleUpload, setting);
router.post(
  "/admin/settingbytoken",
  verifyToken,
  multipleUpload,
  settingbytoken
);

router.get("/admin/viewonestaff/:id", viewonestaff);
router.get("/admin/viewonestaffbytoken", verifyToken, viewonestaffbytoken);

router.get("/admin/viewstaffbytoken", verifyToken, viewstaffbytoken);
router.get("/admin/allstaff", allstaff);
router.get("/admin/deletestaff/:id", deletestaff);
router.get("/admin/approved_staff", approved_staff);
router.get("/admin/countstaff", countstaff);

module.exports = router;
//console
