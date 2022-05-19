const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const {
  addenrollStudent,
  allenrollStudent,
  viewoneplan,
  deleteenrollStudent,
  Studentenroll_couses
} = require("../controllers/enrollStudent");

router.post("/admin/addenrollStudent", addenrollStudent);
//router.post("/admin/editCat/:id", editCat);
// router.get("/admin/viewoneplan/:id", viewoneplan);
router.get("/admin/allenrollStudent", allenrollStudent);
router.get("/admin/deleteenrollStudent/:id", deleteenrollStudent);
router.get("/admin/Studentenroll_couses",tokenverify, Studentenroll_couses);


module.exports = router;
 