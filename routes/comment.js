const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");
const { verifyToken } = require("../functions/stafftoken");

const {
  addcommentbystudent,
  allComment,
  viewoneComment,
  addcommentbyteachar,
} = require("../controllers/comment");

router.post("/user/addcommentbystudent", tokenverify, addcommentbystudent);
//router.post("/admin/editCat/:id", editCat);
router.get("/admin/viewoneComment/:id", viewoneComment);
router.get("/user/allComment", allComment);
//router.get("/admin/deleteCat/:id", deleteCat);
router.post("/user/addcommentbyteachar", verifyToken, addcommentbyteachar);
module.exports = router;
