const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    staffimg: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png",
    },
    firstname: {
      type: String,
    },
    lastname: {
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
    approvedstatus: {
      type: Boolean,
      default: true,
    },
    role: { type: Schema.Types.ObjectId, ref: "role" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("agent", thisSchema);
