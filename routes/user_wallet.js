const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const {
    reqInr_amount,
    wallet_amount
  
} = require("../controllers/user_wallet");

router.post("/admin/reqInr_amount",tokenverify, reqInr_amount);
router.get("/admin/wallet_amount",tokenverify, wallet_amount);

 

module.exports = router;
