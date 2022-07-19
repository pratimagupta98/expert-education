const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");
const { verifyToken } = require("../functions/stafftoken");

const {
  addenrollStudent,
  allenrollStudent,
  viewoneplan,
  deleteenrollStudent,
  Studentenroll_couses,
  viewone_enroll_course,
  enrollstudent_incourse,
  enrollStudentbytoken,
  total_enroll_user,
  chat_techr_list
} = require("../controllers/enrollStudent");

router.post("/admin/addenrollStudent",tokenverify, addenrollStudent);
//router.post("/admin/editCat/:id", editCat);
// router.get("/admin/viewoneplan/:id", viewoneplan);
//router.get("/admin/allenrollStudent", allenrollStudent);
router.get("/admin/enrollStudentbytoken",verifyToken, enrollStudentbytoken);
  
router.get("/admin/deleteenrollStudent/:id", deleteenrollStudent);
router.get("/admin/Studentenroll_couses",tokenverify, Studentenroll_couses);

router.get("/admin/viewone_enroll_course/:id",tokenverify, viewone_enroll_course);
router.get("/admin/enrollstudent_incourse/:id",enrollstudent_incourse);
router.get("/admin/chat_techr_list",tokenverify, chat_techr_list);

//router.get("/admin/enroll_token",verifyToken,enroll_token);
router.get("/admin/total_enroll_user",verifyToken, total_enroll_user);

 

module.exports = router;
 