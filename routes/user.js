const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");
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

let multipleUpload = uploads.fields([{ name: "userimg", maxCount: 1 }]);

const {
  signup,
  adminlogin,
  login,
  edituserbytoken,
  changepass,
  changepassid,
  viewoneuser,
  edituser,
  allusers,
  enrollusers,
  deleteuser,
  myprofile,
  countuser,
  allbatch,
  addbatchn,
  viewonebatch,
  deletebatch,
  updatebatch,
  editusertoken,
} = require("../controllers/user");

router.post("/user/signup", multipleUpload, signup);
router.post("/user/login", login);
//router.post("/user/adminlogin", adminlogin);

router.post(
  "/user/edituserbytoken",
  tokenverify,
  multipleUpload,
  edituserbytoken
);
router.post("/user/changepass", tokenverify, changepass);
router.get("/user/myprofile", tokenverify, myprofile);
router.post("/user/edituser/:id", edituser);
router.post("/user/changepassid/:id", changepassid);
router.get("/admin/viewoneuser/:id", viewoneuser);
router.get("/admin/allusers", allusers);
router.get("/admin/enrollusers", enrollusers);
router.get("/admin/deleteuser/:id", deleteuser);
router.get("/admin/countuser", countuser);
router.get("/user/allbatch", allbatch);
router.post("/user/addbatchn", addbatchn);
router.post("/user/editusertoken", tokenverify, editusertoken);
router.post("/user/updatebatch/:id", updatebatch);

router.get("/user/deletebatch/:id", deletebatch);
router.get("/user/viewonebatch/:id", viewonebatch);
module.exports = router;

//http://localhost:5000/api/admin/allusers
