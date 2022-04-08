const mongoose = require("mongoose")
const Schema = mongoose.Schema

const VideoSchema = new Schema(
  {
    videoTitle: {
      type: String
    },
    //    video_image :{
    //        type:String
    //    },
    //    video_file : {
    //        type : String
    //    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "course",
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "staff",
    },
    video_image: {
      type: String
    },
    video_file: {
      type: String
    },

  },
  { timestamps: true }
)

module.exports = mongoose.model("video", VideoSchema)
