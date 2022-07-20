const TChat = require("../models/chat_tchr");
const ChatroomTchr = require("../models/chatroom_tchr");
const resp = require("../helpers/apiResponse");
const { v4: uuidv4 } = require("uuid");

exports.add_tchrchat = async (req, res) => {
  const uniqueroom = uuidv4();
  const { staffid, msg, msgbysupport ,msg_receiver} = req.body;

  const newTChat = new TChat({
    staffid: req.staffId,
    msg: msg,
    roomid: uniqueroom,
    msg_receiver :msg_receiver,
    msgbysupport: msgbysupport,
  });

  const newChatroomTchr = new ChatroomTchr({
    userid: req.userId,
    last_msg: msg,
    msg_receiver :msg_receiver,

    new_unread_msg: 1,
  });
  const findchatroom = await ChatroomTchr.findOne({ staffid: req.staffId });
  if (findchatroom) {
    newTChat.roomid = findchatroom._id;
    let data = {
      new_unread_msg: parseInt(findchatroom.new_unread_msg) + 1,
    };
    if (!msgbysupport) {
      data.last_msg = msg;
    }
    console.log(data);
    const updatechat = await ChatroomTchr.findOneAndUpdate(
      { staffid: req.userId },
      {
        $set: data,
      },
      { new: true }
    );
    newTChat
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  } else {
    const savechat = await newChatroomTchr.save();
    if (savechat) {
        newTChat.roomid = savechat._id;
        newTChat
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
  }
};

exports.allchat = async (req, res) => {
  await Chat.find().populate("userid").populate("msg_receiver")
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allchatwithuser = async (req, res) => {
  await Chat.find({ userid: req.params.id })
    .populate("userid")
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.unreadmessages = async (req, res) => {
  await Chatroom.findOne({ userid: req.params.id })
    .populate("userid")
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getallchatrooms = async (req, res) => {
  await Chatroom.find()
    .populate("userid")
    .sort({ updatedAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.markasread = async (req, res) => {
  await Chatroom.findOneAndUpdate(
    { userid: req.params.id },
    {
      $set: { new_unread_msg: 0 },
    },
    { new: true }
  )
    .populate("userid")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletechat = async (req, res) => {
  await Chat.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteallchat = async (req, res) => {
  await Chatroom.deleteOne({ userid: req.params.id });
  await Chat.deleteMany({ userid: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.clearchat = async (req, res) => {
  await Chat.deleteMany({ userid: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


 