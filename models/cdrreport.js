const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cdrSchema = new Schema(
  {
    id: {
      type: String,
    },
    caller_id_name: {
      type: String,
    },
    destination_number: {
      type: String,
    },
    context: {
      type: String,
    },
    start_stamp: {
      type: String,
    },
    answer_stamp: {
      type: String,
    },
    end_stamp: {
      type: String,
    },
    duration: {
      type: String,
    },
    billsec: {
      type: String,
    },
    hangup_cause: {
      type: String,
    },
    uuid: {
      type: String,
    },
    created_time: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cdrreport", cdrSchema);
