const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    catName: {
      type: String,
    },
    // teacher: {
    //   type: Schema.Types.ObjectId,
    //   ref: "staff",
    // },
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("category", CategorySchema);
