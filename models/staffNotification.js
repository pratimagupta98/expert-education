const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffNotification = new Schema(
  {

   
    staffid: { type: Schema.Types.ObjectId, ref: "staff" },
   
    noti_title: {
      type: String,
    },
    desc:{
        type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("StaffNotification", StaffNotification);
