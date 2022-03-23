const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    inquiry: { type: Schema.Types.ObjectId, ref: "inquiry" },
    product: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("followup", thisSchema);
