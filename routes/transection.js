const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");
const {
  addTransection,
  allTransection,
  allUserTransection,
  deleteenrollStudent,
} = require("../controllers/transection");

router.post("/admin/addTransection", addTransection);
//router.post("/admin/editCat/:id", editCat);
// router.get("/admin/viewoneplan/:id", viewoneplan);
router.get("/admin/allTransection", allTransection);
router.get("/user/allUserTransection", tokenverify, allUserTransection);

module.exports = router;
