const express = require("express");
const router = express.Router();
const { verifyToken } = require("../functions/stafftoken");
const { tokenverify } = require("../functions/tokenverify");



const {addNotification,viewonenotification,viewoneNot_bytoken,allNotification,allstaffNotification,all_userNotification,del_notification,clrnotification,noti_bytype,
    addUserNotification,viewoneNotificationUser,del_NotificationUser,all_NotificationUser,allUserNotification,
    viewone_NotificationUser
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

///userId Admin
router.post("/admin/addUserNotification", addUserNotification);
router.get("/admin/viewonenotificationUser/:id", viewoneNotificationUser);
router.get("/admin/del_notificationUser/:id", del_NotificationUser);
router.get("/admin/all_NotificationUser", all_NotificationUser);

////userId user
router.get("/user/allUserNotification",tokenverify, allUserNotification);
router.get("/user/viewone_NotificationUser",tokenverify, viewone_NotificationUser);

 module.exports = router;

//console



//http://localhost:5000/api/admin/allusers