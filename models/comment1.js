const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommSchema = new Schema(
  {
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment1", CommSchema);
