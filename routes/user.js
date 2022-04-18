const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");
const { adminToken } = require("../functions/adminToken");
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

let multipleUpload = uploads.fields([{ name: "userimg", maxCount: 1 }]);
const {
  signup,
  adminlogin,
  login,
  setting,
  changepass,
  changepassid,
  viewoneuser,
  edituser,
  allusers,
  enrollusers,
  deleteuser,
  myprofile,
  countuser,
  addbatch,
  allbatch,
  viewonebatch,
  deletebatch,
  updatebatch,
  viewonebatchUser,
  changepassidUser,
  editadmin,
} = require("../controllers/user");

router.post("/user/signup", signup);
router.post("/user/login", login);
//router.post("/user/adminlogin", adminlogin);

router.post("/user/setting", tokenverify, multipleUpload, setting);
//router.post("/admin/editadmin", adminToken,multipleUpload, editadmin);
router.post("/user/changepass", tokenverify, changepass);
router.get("/user/myprofile", tokenverify, myprofile);
router.post("/admin/edituser/:id", edituser);
router.post("/user/changepassid/:id", changepassid);
router.post("/admin/changepassidUser", tokenverify, changepassidUser);
router.get("/admin/viewoneuser/:id", viewoneuser);
router.get("/admin/allusers", allusers);
router.get("/admin/enrollusers", enrollusers);
router.get("/admin/deleteuser/:id", deleteuser);
router.get("/admin/countuser", countuser);
router.post("/admin/addbatch", addbatch);
router.get("/admin/allbatch", allbatch);
router.get("/admin/viewonebatc/:id", viewonebatch);
router.get("/user/viewonebatchUser", tokenverify, viewonebatchUser);
router.get("/admin/deletebatch/:id", deletebatch);
router.post("/user/updatebatch/:id", updatebatch);

module.exports = router;

//http://localhost:5000/api/admin/allusers
