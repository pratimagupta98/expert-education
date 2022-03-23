const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    datafetchdate: { type: String },
    fetchstarttime: {
      type: String,
    },
    fetchendtime: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cdrfetch", thisSchema);
