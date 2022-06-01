const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");


const {
    withdrawal,
   
} = require("../controllers/withdrawal");

router.post("/user/withdrawal",tokenverify, withdrawal);
 

module.exports = router;
