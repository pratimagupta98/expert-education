const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    room_id: {
      type: String,
      require: true,
    },
    sender: { type: Schema.Types.ObjectId, ref: "user" },
    receiver: { type: Schema.Types.ObjectId, ref: "user" },
    last_msg: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chatroom", thisSchema);
