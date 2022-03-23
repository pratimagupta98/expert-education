const Chat = require("../models/chat");
const Chatroom = require("../models/chatroom");
const resp = require("../helpers/apiResponse");
const { v4: uuidv4 } = require("uuid");

exports.addchat = async (req, res) => {
  const uniqueroom = uuidv4();
  const { userid, msg, msgbysupport } = req.body;

  const newChat = new Chat({
    userid: userid,
    msg: msg,
    roomid: uniqueroom,
    msgbysupport: msgbysupport,
  });

  const newChatroom = new Chatroom({
    userid: userid,
    last_msg: msg,
    new_unread_msg: 1,
  });
  const findchatroom = await Chatroom.findOne({ userid: userid });
  if (findchatroom) {
    newChat.roomid = findchatroom._id;
    let data = {
      new_unread_msg: parseInt(findchatroom.new_unread_msg) + 1,
    };
    if (!msgbysupport) {
      data.last_msg = msg;
    }
    console.log(data);
    const updatechat = await Chatroom.findOneAndUpdate(
      { userid: userid },
      {
        $set: data,
      },
      { new: true }
    );
    newChat
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  } else {
    const savechat = await newChatroom.save();
    if (savechat) {
      newChat.roomid = savechat._id;
      newChat
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
  }
};

exports.allchat = async (req, res) => {
  await Chat.find()
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
