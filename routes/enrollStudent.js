const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const {
  addenrollStudent,
  allenrollStudent,
  viewoneplan,
  deleteenrollStudent,
  Studentenroll_couses,
  viewone_enroll_course,
  enrollstudent_incourse
    
} = require("../controllers/enrollStudent");

router.post("/admin/addenrollStudent",tokenverify, addenrollStudent);
//router.post("/admin/editCat/:id", editCat);
// router.get("/admin/viewoneplan/:id", viewoneplan);
router.get("/admin/allenrollStudent", allenrollStudent);
router.get("/admin/deleteenrollStudent/:id", deleteenrollStudent);
router.get("/admin/Studentenroll_couses",tokenverify, Studentenroll_couses);

router.get("/admin/viewone_enroll_course/:id",tokenverify, viewone_enroll_course);
router.get("/admin/enrollstudent_incourse/:id",enrollstudent_incourse);


 

module.exports = router;
 