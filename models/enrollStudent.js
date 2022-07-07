const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const enrollStudentSchema = new Schema({
  plan_Id: {
    type: Schema.Types.ObjectId,
    ref: "plan",
    required: true,
  },
  course_Id: {
    type: Schema.Types.ObjectId,
        ref: "course",
    //  validate: [arrayLimit, "{PATH} exceeds the limit of 1"],
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "staff",
  },

  student_Id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  
  

},
 
{ timestamps: true }
);
// function arrayLimit(val) {
//   return val.length == 1;
// }
enrollStudentSchema.virtual("videolist", {
  ref: "video",
  localField: "course_Id",
  foreignField: "enrollStudent",
  justOne: false,
});

enrollStudentSchema.set("toObject", { virtuals: true });
enrollStudentSchema.set("toJSON", { virtuals: true });

enrollStudentSchema.virtual("pdflist", {
  ref: "pdffile",
  localField: "course_Id",
  foreignField: "enrollStudent",
  justOne: false,
});
 



module.exports = mongoose.model("enrollStudent", enrollStudentSchema);
