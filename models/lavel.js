const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lavelSchema = new Schema(
  {
    lavel: {
      type: String,
    },
    // teacher: {
    //   type: Schema.Types.ObjectId,
    //   ref: "staff",
    // },

  icon : {
    type: Array,
  },
},
  { timestamps: true }
);

module.exports = mongoose.model("lavel", lavelSchema);
