const express = require("express");
const router = express.Router();

const {
  addenrollStudent,
  allplan,
  viewoneplan,
  deleteplan,
} = require("../controllers/enrollStudent");

router.post("/admin/addenrollStudent", addenrollStudent);
//router.post("/admin/editCat/:id", editCat);
// router.get("/admin/viewoneplan/:id", viewoneplan);
// router.get("/admin/allplan", allplan);
// router.get("/admin/deleteplan/:id", deleteplan);

module.exports = router;
