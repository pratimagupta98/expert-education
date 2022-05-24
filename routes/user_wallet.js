const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const {
    req_amount,
    wallet_amount,
    admin_cnfm_amt,
    req_amt_list,
    dlt_amtlist
} = require("../controllers/user_wallet");

router.post("/admin/req_amount",tokenverify, req_amount);
router.get("/admin/wallet_amount",tokenverify, wallet_amount);
router.get("/admin/admin_cnfm_amt/:id", admin_cnfm_amt);
router.get("/admin/req_amt_list", req_amt_list);
router.get("/admin/dlt_amtlist/:id", dlt_amtlist);

 

module.exports = router;
 