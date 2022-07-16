const Chat = require("../models/chat");
const Chatroom = require("../models/chatroom");

exports.addchat = async (req, res) => {
  const { msg } = req.body;

  const newChat = new Chat({
    chatroom: req.params.rid,
    msg_sender: req.userId,
    msg_receiver: req.params.id,
    msg: msg,
  });

  const findexist = await Chatroom.findOneAndUpdate(
    {
      $or: [
        { $and: [{ sender: req.userId }, { receiver: req.params.id }] },
        { $and: [{ sender: req.params.id }, { receiver: req.userId }] },
      ],
    },
    { $set: { last_msg: msg } },
    { new: true }
  );
  newChat
    .save()
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
};

exports.readreceipt = async (req, res) => {
  const findandUpdateEntry = await Chat.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { read_receipt: true } },
    { new: true }
  );

  if (findandUpdateEntry) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findandUpdateEntry,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.chatsinroom = async (req, res) => {
  const findall = await Chat.find({ chatroom: req.params.id })
    .populate("msg_sender", "Photo1 _id OnlineUsers")
    .populate("msg_receiver", "Photo1 _id OnlineUsers");
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.allchat = async (req, res) => {
  const findall = await Chat.find().populate("user").sort({ createdAt: -1 });
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.deletechat = async (req, res) => {
  try {
    const deleteentry = await Chat.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: true,
      msg: "success",
      data: deleteentry,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
};
