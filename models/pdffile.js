const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pdffileSchema = new Schema(
  {

    course: {
      type: Schema.Types.ObjectId,
      ref: "course",
    },
    pdf_title: {
      type: String,
    },

    teacher: {
      type: Schema.Types.ObjectId,
      ref: "staff",
    },

    pdf_image: {
      type: Array
    },
    pdf_file: {
      type: Array
    },

  },

  { timestamps: true }
);


module.exports = mongoose.model("pdffile", pdffileSchema);
