
const express = require("express");
const router = express.Router();

const {
    add_commision,
   
} = require("../controllers/commision");

router.post("/user/add_commision", add_commision);
//router.get("/admin/allrefer_earn", allrefer_earn);
  module.exports = router;















 