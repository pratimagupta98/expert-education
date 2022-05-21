const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserWalletSchema = new Schema(
  {
    userId: {
         type: Schema.Types.ObjectId,
      ref: "user",
    },
    reqInramount: {
     type : Number
     },

  status : {
    type: String,
    default:"Pending"
  },
  amount:{
      type:Number,
      default:0
  }
},
  { timestamps: true }
);

module.exports = mongoose.model("user_wallet", UserWalletSchema);
