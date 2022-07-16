const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    chatroom: { type: Schema.Types.ObjectId, ref: "chatroom" },
    msg_sender: { type: Schema.Types.ObjectId, ref: "user" },
    msg_receiver: { type: Schema.Types.ObjectId, ref: "user" },
    msg: {
      type: String,
    },
    read_receipt: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chat", thisSchema);
