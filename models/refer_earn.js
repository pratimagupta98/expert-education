const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    refer_fromid: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    refer_userid_level1: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    refer_level1_amt:{
      type :Number
    },
    refer_userid_level2 :{
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    refer_level_amt2:{
      type :Number
    },
    refer_userid_level3:{
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    refer_level_amt3:{
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    status: {
      type: String,
     //redeem code
    },
    total_refer_amt: {
      type: Number,
       
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("refer_earn", thisSchema);
