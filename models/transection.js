const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transection = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "user" },
    amount: {
      type: Number,
    },
    transectionId: { type: String, generated: true },
    plan_id: { type: Schema.Types.ObjectId, ref: "plan" },
    paymenyt_id: { type: String },
  },

  { timestamps: true }
);

module.exports = mongoose.model("transection", transection);
