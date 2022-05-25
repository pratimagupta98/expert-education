const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: "user" },
    gender: {
      type: String,
    },
    dob: {
      type: String,
    },
    nationality: {
      type: String,
    },
    aadhar_num: {
      type: String,
    },

    aadhar_front_img: {
      type: String,
    },
    aadhar_back_img: {
      type: String,
    },
    front_img: {
      type: String,
    },
    back_img: {
      type: String,
    },
    selfie_img: {
      type: String,
    },
    driving_l_img: {
      type: String,
    },
    passport_img: {
      type: String,
    },
    selfie: {
      type: String,
    },
    status: {
      type: Boolean,
    },

    photo: {
      type: Array,
    },
    front: {
      type: Array,
    },
    back: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("kycform", thisSchema);
