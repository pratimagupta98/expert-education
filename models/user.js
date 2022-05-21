const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userimg: {
      type: Array,
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    password: {
      type: String,
    },
    cnfmPassword: {
      type: String,
    },
    // kyc_form: {
    //   type: Schema.Types.ObjectId,
    //   ref: "kycform",
    // },
    status: {
      type: String,
      default: "Unenroll",

      //Enroll,Unenroll
    },
    user_type: {
      type: String,
      // default: "u",
    },
    batge_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studentBatch",
    },
    student_Id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    walletId :{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_wallet",
    },
  }
  // { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
