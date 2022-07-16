const Chatroom = require("../models/chatroom");
const { v4: uuidv4 } = require("uuid");

exports.addchatroom = async (req, res) => {
  const uniqueroom = uuidv4();
  const newChatroom = new Chatroom({
    sender: req.userId,
    receiver: req.params.id,
    room_id: uniqueroom,
  });

  const findexist = await Chatroom.findOne({
    $or: [
      { $and: [{ sender: req.userId }, { receiver: req.params.id }] },
      { $and: [{ sender: req.params.id }, { receiver: req.userId }] },
    ],
  });
  
  if (findexist) {
    console.log(findexist.room);
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: findexist,
    });
  } else {
    newChatroom
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
  }
};

exports.mychatroom = async (req, res) => {
  const findall = await Chatroom.find({
    $or: [{ sender: req.userId }, { receiver: req.userId }],
  })
    .populate("sender")
    .populate("receiver")

    .sort({
      updatedAt: -1,
    });
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

exports.deletechatroom = async (req, res) => {
  try {
    const deleteentry = await Otpapi.Chatroom({ _id: req.params.id });
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
