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
  add_tchrchat,
  all_tchrchat,
  mychatwith_tchr
} = require("../controllers/chat");

router.post("/user/addchat", tokenverify, addchat);
 router.get("/user/unreadmessages/:id", unreadmessages);
 router.get("/user/markasread/:id", markasread);
// router.get("/user/chatroom/:id", chatsinroom);
// router.get("/user/deletechat", deletechat);
router.get("/user/allchat", allchat);

// TEACHER CHAT API
router.post("/user/add_tchrchat", verifyToken, add_tchrchat);
router.get("/user/all_tchrchat",   all_tchrchat);
router.get("/user/mychatwith_tchr/:id", tokenverify,  mychatwith_tchr);

//commit
//console
module.exports = router;
