const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const { adminToken } = require("../functions/admintoken");

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
  addvideo,
  getvideo,
  deletevideo,
  videobycourse,
  addvideobyadmin,
} = require("../controllers/video");

//PATHS

router.post(
  "/admin/addvideo",
  adminToken,
  upload.fields([
    {
      name: "video_file",
    },
    {
      name: "video_image",
    },
  ]),
  addvideo
);

router.get("/admin/getvideo", getvideo);
router.get("/admin/deletevideo/:id", deletevideo);
router.get("/admin/videobycourse/:id", videobycourse);
router.post(
  "/admin/addvideobyadmin",
  upload.fields([
    {
      name: "video_file",
    },
    {
      name: "video_image",
    },
  ]),
  addvideobyadmin
);

module.exports = router;
