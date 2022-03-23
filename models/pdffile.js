const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pdffileSchema = new Schema(
  {
    pdf_title: {
      type: String,
    },

    pdf: [
      {
        pdf_image: String,
        pdf_file: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("pdffile", pdffileSchema);
