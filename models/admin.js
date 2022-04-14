const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
   adminimg: {
      type: Array,
     
    },
    adminname: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    password: {
      type: String,
    },
    cnfmPassword: {
      type: String,
    },
   
    // status: {
    //   type: String,
    //   default: "Unenroll",

    //   //Enroll,Unenroll
    // // },
    // user_type: {
    //   type: String,
    //   // default: "u",
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("admin", thisSchema);
