const express = require("express");
const router = express.Router();

const multer = require("multer");
const {} = require("multer");
const fs = require("fs");

const { verifyToken } = require("../functions/stafftoken");

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

const {
  addpdf,
  addpdfbyadmin,
  getpdf,
  deletepdf,
  viewonepdf
} = require("../controllers/pdffile");

router.post(
  "/admin/addpdf",verifyToken,
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

router.post(
  "/admin/addpdfbyadmin",
  upload.fields([
    {
      name: "pdf_file",
    },
    {
      name: "pdf_image",
    },
  ]),
  addpdfbyadmin
);
router.get("/admin/getpdf", getpdf);
router.get("/admin/deletepdf/:id", deletepdf);
router.get("/admin/viewonepdf/:id", viewonepdf);

module.exports = router;

//http://localhost:5000/api/admin/allusers
 