const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

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

router.post("/user/signup", signup);
router.post("/user/login", login);
//router.post("/user/adminlogin", adminlogin);

router.post("/user/edituserbytoken", tokenverify, edituserbytoken);
router.post("/user/changepass", tokenverify, changepass);
router.get("/user/myprofile", tokenverify, myprofile);
router.post("/admin/edituser/:id", edituser);
router.post("/user/changepassid/:id", changepassid);
router.get("/admin/viewoneuser/:id", viewoneuser);
router.get("/admin/allusers", allusers);
router.get("/admin/enrollusers", enrollusers);
router.get("/admin/deleteuser/:id", deleteuser);
router.get("/admin/countuser", countuser);
router.get("/user/allbatch", allbatch);
router.post("user/addbatchn", addbatchn);
router.post("user/editusertoken", tokenverify, editusertoken);
router.post("user/updatebatch/:id", updatebatch);

router.get("/user/deletebatch/:id", deletebatch);
router.get("/user/viewonebatch/:id", viewonebatch);
module.exports = router;

//http://localhost:5000/api/admin/allusers
