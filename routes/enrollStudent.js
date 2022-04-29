const express = require("express");
const router = express.Router();

const {
  addenrollStudent,
  allenrollStudent,
  viewoneplan,
  deleteenrollStudent,
} = require("../controllers/enrollStudent");

router.post("/admin/addenrollStudent", addenrollStudent);
//router.post("/admin/editCat/:id", editCat);
// router.get("/admin/viewoneplan/:id", viewoneplan);
router.get("/admin/allenrollStudent", allenrollStudent);
router.get("/admin/deleteenrollStudent/:id", deleteenrollStudent);

module.exports = router;
