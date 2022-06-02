const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const {
    req_amount,
    wallet_amount,
    admin_cnfm_amt,
    req_amt_list,
    dlt_amtlist,
    amt_cnfmlist,
    user_transaction_list
} = require("../controllers/user_wallet");

 
const multer = require("multer");
const fs = require("fs");

//cjdhjd
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploads = multer({ storage: storage });

let multipleUpload = uploads.fields([{ name: "screenshot", maxCount: 1 }]);


router.post("/admin/req_amount",multipleUpload,tokenverify, req_amount);
router.get("/admin/wallet_amount",tokenverify, wallet_amount);
router.get("/admin/admin_cnfm_amt/:id", admin_cnfm_amt);
router.get("/admin/req_amt_list", req_amt_list);
router.get("/admin/dlt_amtlist/:id", dlt_amtlist);

router.get("/admin/amt_cnfmlist", amt_cnfmlist);
router.get("/admin/user_transaction_list",tokenverify, user_transaction_list);


module.exports = router;
 