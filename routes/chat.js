
 const express = require("express");
 const router = express.Router();
 const { verifyToken } = require("../functions/tokenverify");
 
 const {
   addchat,
   readreceipt,
   allchat,
   chatsinroom,
   deletechat,
 } = require("../controllers/chat");
 
// router.post("/user/addchat/:id/:rid", verifyToken, addchat);
 router.get("/user/readreceipt", readreceipt);
 router.get("/user/allchat", allchat);
 router.get("/user/chatroom/:id", chatsinroom);
 router.get("/user/deletechat", deletechat);
 
 module.exports = router;
 