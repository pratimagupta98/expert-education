const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: "user" },
    last_msg: {
      type: String,
    },
    new_unread_msg:{
        type: Number,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("chatroom", thisSchema);
