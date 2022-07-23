const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    staffid: { type: Schema.Types.ObjectId, ref: "staff" },
    msg: {
      type: String,
    },
    userid :
     { type: Schema.Types.ObjectId, ref: "user" },
    
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("chatroom", thisSchema);
