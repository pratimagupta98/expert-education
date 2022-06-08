const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");


const {
    withdrawal,
    withdrawal_list,
    usdt_withdrawal,
    pending_withdrwal,
    confrm_withdrawal,
    cnfrm_withdrawal,
    dltwithdrwal,
    withdrawal_listbytoken
} = require("../controllers/withdrawal");

router.post("/user/withdrawal",tokenverify, withdrawal);
router.get("/admin/withdrawal_list", withdrawal_list);
router.post("/user/usdt_withdrawal",tokenverify, usdt_withdrawal);
router.get("/user/pending_withdrwal", pending_withdrwal);
router.get("/admin/confrm_withdrawal", confrm_withdrawal);
router.get("/admin/cnfrm_withdrawal/:id", cnfrm_withdrawal);

router.get("/user/dltwithdrwal/:id", dltwithdrwal);
router.get("/user/withdrawal_listbytoken",tokenverify, withdrawal_listbytoken);

module.exports = router;
