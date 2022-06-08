const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const withdrawalSchema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
     ref: "user",
   },
    
   upi_Id : {
        type : String,
        default:0
    },
 amount : {
     type : Number
 },
 crpto_id:{
   type:String,
   default:0
 },

 
 usd: {
  type : Number,
  default:0
  },
  inr:{
    type:Number,
    default:0
  },
 status:{
   type: String,
   default:"Pending"
 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("withdrawal", withdrawalSchema);
