const express = require("express");
const router = express.Router();

const multer = require("multer");
const {} = require("multer");
const fs = require("fs");

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

const { addpdf } = require("../controllers/pdffile");

router.post(
  "/admin/addpdf",
  upload.fields([
    {
      name: "pdf_file",
    },
    {
      name: "pdf_image",
    },
  ]),
  addpdf
);

module.exports = router;

//http://localhost:5000/api/admin/allusers
