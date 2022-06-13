const express = require("express");
const router = express.Router();

const {
    addrefer_earn,
    allrefer_earn,
  viewoneplan,
  deleteplan,
  editplan,
} = require("../controllers/refer_earn");

router.post("/user/addrefer_earn", addrefer_earn);
router.get("/user/allrefer_earn", allrefer_earn);
  module.exports = router;
