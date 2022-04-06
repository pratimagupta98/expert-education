const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentBatchSchema = new Schema(
  {
    student_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    // teacher: {
    //   type: Schema.Types.ObjectId,
    //   ref: "staff",
    // },

  lavel_Id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "lavel",
  },
},
  { timestamps: true }
);

module.exports = mongoose.model("studentBatch", studentBatchSchema);
