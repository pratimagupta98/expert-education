const express = require("express");
const router = express.Router();

const {
    verify_user,
  
} = require("../controllers/verify_user");

router.post("/admin/verify_user", verify_user);
 

module.exports = router;
