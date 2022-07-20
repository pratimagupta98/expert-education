const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");
const { verifyToken } = require("../functions/stafftoken");

const {
  addchat,
  unreadmessages,
  markasread,
   allchat,
  chatsinroom,
  deletechat,
} = require("../controllers/chat");

router.post("/user/addchat", tokenverify, addchat);
 router.get("/user/unreadmessages/:id", unreadmessages);
 router.post("/user/markasread/:id", markasread);
// router.get("/user/chatroom/:id", chatsinroom);
// router.get("/user/deletechat", deletechat);
router.get("/user/allchat", allchat);

//commit
//console
module.exports = router;
