const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    catName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", CategorySchema);
