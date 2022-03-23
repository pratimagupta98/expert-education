const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    userimg: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png",
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
    kyc_form: {
      type: Schema.Types.ObjectId,
      ref: "kycform",
    },
    status: {
      type: String,
      default: "Unenroll",

      //Enroll,Unenroll
    },
    user_type: {
      type: String,
      // default: "u",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", thisSchema);
