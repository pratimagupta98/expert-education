const express = require("express");
const router = express.Router();
const { verifyToken } = require("../functions/stafftoken");
const { tokenverify } = require("../functions/tokenverify");



const {addNotification,viewonenotification,viewoneNot_bytoken,allNotification,allstaffNotification,all_userNotification,del_notification,clrnotification,noti_bytype,
   
} = require("../controllers/notification");

router.post("/admin/addNotification", addNotification);
router.get("/admin/viewonenotification/:id", viewonenotification);
router.get("/admin/viewoneNot_bytoken",verifyToken, viewoneNot_bytoken);
router.get("/admin/allNotification", allNotification);
router.get("/admin/noti_bytype/:id", noti_bytype);
//router.get("/admin/noti_bytypebytoken/:id",tokenverify,verifyToken, noti_bytypebytoken);


router.get("/admin/allstaffNotification",verifyToken, allstaffNotification);
router.get("/admin/all_userNotification",tokenverify, all_userNotification);
//router.get("/admin/all_userNotification",tokenverify, all_userNotification);


router.get("/admin/del_notification/:id", del_notification);
router.get("/admin/clrnotification", clrnotification);


 
 
 module.exports = router;

//console



//http://localhost:5000/api/admin/allusers