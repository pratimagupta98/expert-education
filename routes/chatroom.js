const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");
const { verifyToken } = require("../functions/stafftoken");


const {
    add_tchr_chat,
  mychatroom,
  deletechatroom,
} = require("../controllers/chatroom");

router.post("/user/add_tchr_chat", verifyToken, add_tchr_chat);
router.get("/user/mychatroom/:id", verifyToken, mychatroom);
router.get("/user/deletechatroom/:id", deletechatroom);

module.exports = router;
