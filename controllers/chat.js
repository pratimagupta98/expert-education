const Chat = require("../models/chat");
const Chatroom = require("../models/chatroom");
const resp = require("../helpers/apiResponse");
const TChat = require("../models/chat_tchr");

const { v4: uuidv4 } = require("uuid");

exports.addchat = async (req, res) => {
  const uniqueroom = uuidv4();
  const { userid, msg, msgbysupport ,msg_receiver} = req.body;

  const newChat = new Chat({
    userid: req.userId,
    msg: msg,
    roomid: uniqueroom,
    msg_receiver :msg_receiver,
    msgbysupport: msgbysupport,
  });

  const newChatroom = new Chatroom({
    userid: req.userId,
    last_msg: msg,
    msg_receiver :msg_receiver,

    new_unread_msg: 1,
  });
  const findchatroom = await Chatroom.findOne({ userid: req.userId });
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
      { userid: req.userId },
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
  await Chat.find().populate("userid").populate("msg_receiver")
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.mychatwith_tchr = async (req, res) => {
  await Chat.find({ $and :[{userid: req.userId},{msg_receiver: req.params.id }]})
    .populate("userid").populate("msg_receiver")
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


exports.add_tchrchat = async (req, res) => {
  //const uniqueroom = uuidv4();
  const { msg_receiver,userid, msg, msgbysupport } = req.body;

  const newChat= new Chat({
     
    msg_receiver :req.staffId,
    userid: req.params.id,
    msg: msg, //staff
    
  });
   
  newChat
      .save() .then(( ) => {
        res.status(200).json({
          status: true,
          msg: "success",
          msg_receiver:req.staffId,
          userid:req.params.id,
          msg:msg
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });

}
      // .then((data) => resp.successr(res, data))
      // .catch((error) => resp.errorr(res, error));
  
 

exports.tcher_student_allchat = async (req, res) => {
  await Chat.find({ $or :[{msg_receiver: req.staffId},{userid: req.params.id }]})
  .populate("msg_receiver").populate("userid") 
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};