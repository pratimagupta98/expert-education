const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");


const {
    withdrawal,
    withdrawal_list,
    usdt_withdrawal
   
} = require("../controllers/withdrawal");

router.post("/user/withdrawal",tokenverify, withdrawal);
router.get("/user/withdrawal_list", withdrawal_list);
router.post("/user/usdt_withdrawal",tokenverify, usdt_withdrawal);


module.exports = router;
