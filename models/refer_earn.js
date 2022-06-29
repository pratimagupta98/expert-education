const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    refer_from_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    refer_to_id:{
      type: Schema.Types.ObjectId,
      ref: "user",
    },
   
    verify_code:{
type:String
    },

    refer_redeem_status: {
      type: String,
     //redeem code
    },
    membership:{
      type: Schema.Types.ObjectId,
      ref: "membership",
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("refer_earn", thisSchema);
