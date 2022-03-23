const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    ipnumber: {
      type: String,
    },
    title: {
      type: String,
    },
    activestatus: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("providedip", thisSchema);
