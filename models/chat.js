const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    roomid: { type: Schema.Types.ObjectId, ref: "chatroom" },
    msg_receiver: { type: Schema.Types.ObjectId, ref: "staff" },
    userid: { type: Schema.Types.ObjectId, ref: "user" },
    msg_receiver: { type: Schema.Types.ObjectId, ref: "staff" },
    msg: {
      type: String,
    },
    msgbysupport: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chat", thisSchema);
