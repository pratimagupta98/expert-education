const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const { addmembership,getmembershiplist,viewone_mem_plan,admin_membershiplist } = require("../controllers/membership");

router.post("/user/addmembership/:id/:userId", addmembership);
//router.post("/admin/editCat/:id", editCat);
//router.get("/admin/viewoneCat/:id", viewoneCat);
router.get("/user/getmembershiplist",tokenverify, getmembershiplist);
router.get("/user/viewone_mem_plan",tokenverify, viewone_mem_plan);
router.get("/admin/admin_membershiplist", admin_membershiplist);


module.exports = router;

//http://localhost:5000/api/admin/allusers
