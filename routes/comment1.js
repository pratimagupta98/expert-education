const express = require("express");
const router = express.Router();

const { addcomm } = require("../controllers/comment1");

router.post("/admin/addcomm", addcomm);
//router.post("/admin/editCat/:id", editCat);
//router.get("/admin/viewoneCat/:id", viewoneCat);
//router.get("/admin/allCat", allCat);
//router.get("/admin/deleteCat/:id", deleteCat);

module.exports = router;

//http://localhost:5000/api/admin/allusers
