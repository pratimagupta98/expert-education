const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const { check } = require("express-validator");
const { tokenverify } = require("../functions/tokenverify");
const multer = require("multer");
const fs = require("fs");

const {
  addkycform,
  editkycform,
  viewonekycform,
  allkycform,
  deletekycform,
} = require("../controllers/kycform");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //console.log(file);
    let path = `./uploads`;
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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

let multipleUpload = uploads.fields([
  { name: "frount", maxCount: 1 },
  { name: "back", maxCount: 1 },
  { name: "photo", maxCount: 1 },

  //   { name: "storepan_img", maxCount: 5 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);
//Paths
router.post("/user/addkycform", multipleUpload, tokenverify, addkycform);
router.post("/user/editkycform", tokenverify, multipleUpload, editkycform);
router.get("/user/viewonekycform/:id", tokenverify, viewonekycform);
router.get("/user/allkycform", tokenverify, allkycform);
router.get("/user/deletekycform", tokenverify, deletekycform);

module.exports = router;
