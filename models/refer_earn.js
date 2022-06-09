const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    refer_fromid: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    refer_to_id:{
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    refer_amount:{
      type:Number
    },


   refer_reedam_status: {
      type: String,
     //redeem code
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("refer_earn", thisSchema);
