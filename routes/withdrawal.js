const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");


const {
    withdrawal,
    withdrawal_list
   
} = require("../controllers/withdrawal");

router.post("/user/withdrawal",tokenverify, withdrawal);
router.get("/user/withdrawal_list", withdrawal_list);


module.exports = router;
