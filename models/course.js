const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    course_title: {
      type: String,
    },
    course_image: {
      type: String,
    },
    desc: {
      type: String,
    },
    long_desc: {
      type: String,
    },
    // video_id:[{
    //       video_id1:[{type:Schema.Types.ObjectId,
    //         ref: "staff",}],
    //   }],
    // pdf: [
    //   {
    //     pdf_image: String,
    //     pdf_file: String,
    //   },
    // ],

    // video_link: [
    //   {
    //     video_image: String,
    //     video_file: String,
    //   },
    // ],
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "staff",
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    video_id: {
      type: Schema.Types.ObjectId,
      ref: "video",
    },
    pdf_id: {
      type: Schema.Types.ObjectId,
      ref: "pdffile",
    },

    popularity: {
      type: Number,
      default: 0,
    },
    available: {
      type: String,
    },
  },
  { timestamps: true }
);

thisSchema.virtual("videolist", {
  ref: "video",
  localField: "_id",
  foreignField: "course",
  justOne: false,
});

thisSchema.set("toObject", { virtuals: true });
thisSchema.set("toJSON", { virtuals: true });

thisSchema.virtual("pdflist", {
  ref: "pdffile",
  localField: "_id",
  foreignField: "course",
  justOne: false,
});

module.exports = mongoose.model("course", thisSchema);
