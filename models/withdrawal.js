const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const withdrawalSchema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
     ref: "user",
   },
    bank_name: {
      type: String,
    },
    account_no : {
        type:Number
    },
    ifsc_code : {
        type : String
    },
 amount : {
     type : Number
 },
 crpto_id:{
   type:String
 },
 usdt_amt:{
  type : Number
 },
 status:{
   type: String,
   default:"Pending"
 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("withdrawal", withdrawalSchema);
