const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

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
  viewonebatchUser
} = require("../controllers/user");

router.post("/user/signup", signup);
router.post("/user/login", login);
router.post("/user/adminlogin", adminlogin);

router.post("/user/setting", tokenverify, setting);
router.post("/user/changepass", tokenverify, changepass);
router.get("/user/myprofile", tokenverify, myprofile);
router.post("/admin/edituser/:id", edituser);
router.post("/user/changepassid/:id", changepassid);
router.get("/admin/viewoneuser/:id", viewoneuser);
router.get("/admin/allusers", allusers);
router.get("/admin/enrollusers", enrollusers);
router.get("/admin/deleteuser/:id", deleteuser);
router.get("/admin/countuser", countuser);
router.post("/admin/addbatch", addbatch);
router.get("/admin/allbatch", allbatch);
router.get("/admin/viewonebatc/:id", viewonebatch);
router.get("/user/viewonebatchUser",tokenverify, viewonebatchUser);
router.get("/admin/deletebatch/:id", deletebatch);
router.post("/user/updatebatch/:id", updatebatch);

module.exports = router;

//http://localhost:5000/api/admin/allusers
