const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserNotification = new Schema(
  {

   
    userid: { type: Schema.Types.ObjectId, ref: "user" },
   
    noti_title: {
      type: String,
    },
    desc:{
        type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserNotification", UserNotification);
