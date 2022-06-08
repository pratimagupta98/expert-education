const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VerifycodeSchema = new Schema(
  {
    verify_user: {
        type: Schema.Types.ObjectId,
     ref: "user",
   },
    verify_code:{
type:String
    },
   verify_refferal : {
        type : String
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("verify_user", VerifycodeSchema);
