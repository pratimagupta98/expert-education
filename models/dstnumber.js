const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dstNumberSchema = new Schema(
  {
    did_no: {
      type: String,
    },
    ip: { type: Schema.Types.ObjectId, ref: "providedip" },
    alottedtouser: { type: Schema.Types.ObjectId, ref: "user" },
    plan: { type: Schema.Types.ObjectId, ref: "plan" },
    ivr: { type: String },
    extensions: { type: String },
    is_used: { type: String },
    voice_channel: { type: String  },
    itsp_name: { type: String  },
    service_type: { type: String  },
    giventolevel1: { type: Schema.Types.ObjectId, ref: "staff"  },
    giventolevel2: { type: Schema.Types.ObjectId, ref: "staff"  },
    giventolevel3: { type: Schema.Types.ObjectId, ref: "staff"  },
    giventolevel4: { type: Schema.Types.ObjectId, ref: "staff"  },
    giventolevel5: { type: Schema.Types.ObjectId, ref: "staff"  },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("dstnum", dstNumberSchema);



// "itsp_name": "Tata",
//             "service_type": "Open",
//             "is_used": "f",
//             "did_no": "61212599",
//             "voice_channel": "",
//             "used_by": null