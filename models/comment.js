const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "user" },
    comment: {
      type: String,
    },
    cource_Id: { type: Schema.Types.ObjectId, ref: "course" },
    staff_id: { type: Schema.Types.ObjectId, ref: "staff" },
  },

  { timestamps: true }
);

module.exports = mongoose.model("comment", CommentSchema);
