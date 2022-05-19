const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const { addmembership,getmembershiplist } = require("../controllers/membership");

router.post("/user/addmembership/:id",tokenverify, addmembership);
//router.post("/admin/editCat/:id", editCat);
//router.get("/admin/viewoneCat/:id", viewoneCat);
router.get("/user/getmembershiplist",tokenverify, getmembershiplist);
//router.get("/admin/deleteCat/:id", deleteCat);

module.exports = router;

//http://localhost:5000/api/admin/allusers
