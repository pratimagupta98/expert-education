const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    sortorder: {
      type: Number,
    },
    status: {
      type: String,
      default: "Active",
    },
    permissions: [{
      type: String,
      default: ["canAdd", "canDelete", "canEdit", "canRead"],
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("role", thisSchema);
