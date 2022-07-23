const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    
   // msg_receiver: { type: Schema.Types.ObjectId, ref: "staff" },
    userid: { type: Schema.Types.ObjectId, ref: "user" },
    msg: {
      type: String,
    },

    roomid: { type: Schema.Types.ObjectId, ref: "chatroom" },
    msgbysupport: {
      type: Boolean,
      default: false,
    },
    msg_receiver: { type: Schema.Types.ObjectId, ref: "staff" },
   
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("chat", thisSchema);
