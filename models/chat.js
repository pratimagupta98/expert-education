const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: "user" },
    msg: {
      type: String,
    },
    roomid: {
        type: Schema.Types.ObjectId, ref: "chatroom"
    },
    msgbysupport: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("chat", thisSchema);
