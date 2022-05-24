const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const {
    req_amount,
    wallet_amount,
    admin_cnfm_amt
  
} = require("../controllers/user_wallet");

router.post("/admin/req_amount",tokenverify, req_amount);
router.get("/admin/wallet_amount",tokenverify, wallet_amount);
router.get("/admin/admin_cnfm_amt",tokenverify, admin_cnfm_amt);

 

module.exports = router;
