const express = require("express");
const router = express.Router();

const {
    addrefer_earn,
    allrefer_earn,
  viewoneplan,
  deleteplan,
  commission_add,

} = require("../controllers/refer_earn");

router.post("/user/addrefer_earn", addrefer_earn);
router.get("/admin/allrefer_earn", allrefer_earn);
router.post("/admin/commission_add/:id", commission_add);

  module.exports = router;
