const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserWalletSchema = new Schema(
  {
    userId: {
         type: Schema.Types.ObjectId,
      ref: "user",
    },
    usd: {
     type : Number,
     default:0
     },
     inr: {
      type : Number,
      default:0
      },

  status : {
    type: String,
    default:"Pending"
    //Confirm,Pending
  },
  amount:{
      type:Number,
      default:0
  },
  screenshot:{
    type: Array,
  },
  transectionId: { type: String, generated: true },
},
  { timestamps: true }
);

module.exports = mongoose.model("user_wallet", UserWalletSchema);
