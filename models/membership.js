const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MembershipSchema = new Schema(
  {

     
    userid: { type: Schema.Types.ObjectId, ref: "user" },
    
     plan_Id: {
    type: Schema.Types.ObjectId,
    ref: "plan",
    required: true,
  },
},
  { timestamps: true }
);

module.exports = mongoose.model("membership", MembershipSchema);
