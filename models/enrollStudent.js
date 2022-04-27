const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const enrollStudent = new Schema({
  plan_Id: {
    type: Schema.Types.ObjectId,
    ref: "plan",
    required: true,
  },
  course_Id: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "course",
      },
    ],
    //  validate: [arrayLimit, "{PATH} exceeds the limit of 1"],
  },

  student_Id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});
function arrayLimit(val) {
  return val.length == 1;
}

module.exports = mongoose.model("enrollStudent", enrollStudent);
