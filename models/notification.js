const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {

    usertype:{
        type: String,
        //Student,Teacher
    },
    userid: { type: Schema.Types.ObjectId, ref: "user" },
    staffid :{ type: Schema.Types.ObjectId, ref: "staff" },
    noti_title: {
      type: String,
    },
    desc:{
        type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("notification", NotificationSchema);
