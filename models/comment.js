const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "users" },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", CommentSchema);
