const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const withdrawalSchema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
     ref: "user",
   },
    
   upi_Id : {
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
