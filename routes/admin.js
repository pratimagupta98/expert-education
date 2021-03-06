const express = require("express");
const router = express.Router();
const { adminToken } = require("../functions/admintoken");
const multer = require("multer");
const fs = require("fs");

//cjdhjd
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

let multipleUpload = uploads.fields([{ name: "adminimg", maxCount: 1 }]);
const {
  signup,
  adminlogin,
  editAdmin,
  viewoneAdmin,
  deleteAdmin,
  getAdmin,
  countteacher,
  countteacherAprove,
  countUser,
  countUserEnroll,
  councours,
   
} = require("../controllers/admin");
router.post("/admin/signup", multipleUpload, signup);
router.post("/admin/adminlogin", adminlogin);
router.post("/admin/editAdmin", adminToken, multipleUpload, editAdmin);
router.get("/admin/viewoneAdmin", adminToken, viewoneAdmin);
router.get("/admin/deleteAdmin", adminToken, deleteAdmin);
router.get("/admin/countteacher", countteacher);
router.get("/admin/countteacherAprove", countteacherAprove);
router.get("/admin/countUser", countUser);
router.get("/admin/countUserEnroll", countUserEnroll);
router.get("/admin/councours", councours);
router.get("/admin/getAdmin", getAdmin);
 
module.exports = router;
