const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commision = new Schema(
  {
    refer_earn: {
        type: Schema.Types.ObjectId,
        ref: "refer_earn",
    },
    membership: {
      type: String,
     //redeem code
    },
    amount:{
        type:Number
    },
   
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("commision", commision);
