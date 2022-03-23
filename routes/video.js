const express = require("express")
const router = express.Router();
const fs = require("fs");
const multer = require("multer");

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
  

const {addvideo,getvideo} = require("../controllers/video");


//PATHS

router.post("/admin/addvideo",upload.fields([
    {
        name :"video_file"
    },
    {
        name : "video_image"
    }
]),addvideo)

router.get("/admin/getvideo", getvideo);



module.exports  = router

 