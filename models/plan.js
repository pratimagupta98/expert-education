const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    plantitle: {
      type: String,
      require: true,
    },
    amount: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("plan", thisSchema);
