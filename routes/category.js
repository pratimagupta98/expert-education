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
    { name: "icon", maxCount: 1 },
   
  ]);
  
const {addCat,editCat,viewoneCat,allCat,deleteCat,addlavel, deletelavel,allLavel
   
} = require("../controllers/category");

router.post("/admin/addCat",multipleUpload ,addCat);
router.post("/admin/addlavel",multipleUpload ,addlavel);
router.post("/admin/editCat/:id", editCat);
router.get("/admin/viewoneCat/:id", viewoneCat);
router.get("/admin/allCat", allCat);
router.get("/admin/deleteCat/:id", deleteCat);
router.get("/admin/deletelavel/:id", deletelavel);
router.get("/admin/allLavel", allLavel);

 

module.exports = router;


//http://localhost:5000/api/admin/allusers