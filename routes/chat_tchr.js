const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");
const { verifyToken } = require("../functions/stafftoken");

const {
    add_tchrchat,
  unreadmessages,
  markasread,
   allchat,
  chatsinroom,
  deletechat,
} = require("../controllers/chat_tchr");

router.post("/user/add_tchrchat", verifyToken, add_tchrchat);
 router.get("/user/unreadmessages/:id", unreadmessages);
 router.get("/user/markasread/:id", markasread);
// router.get("/user/chatroom/:id", chatsinroom);
// router.get("/user/deletechat", deletechat);
router.get("/user/allchat", allchat);

//commit
//console
module.exports = router;
