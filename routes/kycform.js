const express = require("express");
const router = express.Router();
const multer = require("multer");

const { body, validationResult } = require("express-validator");
const { check } = require("express-validator");
const { tokenverify } = require("../functions/tokenverify");

const {} = require("multer");
const fs = require("fs");

const {
  addkycform,
  editkycform,
  viewonekycform,
  allkycform,
  deletekycform,
} = require("../controllers/kycform");




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

const upload = multer({ storage: storage });


//Paths
router.post("/admin/addkycform",upload.fields( [{name: "front_img"},{name: "back_img"},{name: "selfie_img"}]),tokenverify, addkycform);
router.post("/admin/editkycform/:id", editkycform);
router.get("/admin/viewonekycform/:id", viewonekycform);
router.get("/admin/allkycform", allkycform);
router.get("/admin/deletekycform/:id", deletekycform);

module.exports = router;
