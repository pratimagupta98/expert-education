const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
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

    gender: {
      type: String,
    },
    dob: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    institute: {
      type: String,
    },
    image: {
      type: String,
      //   default:
      //     "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png",
    },
    approvedstatus: {
      type: Boolean,
      //type: String,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("staff", thisSchema);
