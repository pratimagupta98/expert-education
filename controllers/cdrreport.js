const Cdrreport = require("../models/cdrreport");
const resp = require("../helpers/apiResponse");
var cron = require("node-cron");

var task = cron.schedule("00 47 11 * * *", () => {
  console.log("Job excuted at 11:47am sharp in the morning");
  console.log(new Date());
});

task.start();

exports.addcdrreport = async (req, res) => {
  const { Cdrreport, ip, alottedtouser, plan, ivr, extensions, inusestatus } =
    req.body;

  const newCdrreport = new Cdrreport({
    Cdrreport: Cdrreport,
    ip: ip,
    alottedtouser: alottedtouser,
    plan: plan,
    ivr: ivr,
    extensions: extensions,
    inusestatus: inusestatus,
  });
  const findexist = await Cdrreport.findOne({ Cdrreport: Cdrreport });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newCdrreport
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.viewonecdrreport = async (req, res) => {
  await Cdrreport.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allcdrreport = async (req, res) => {
  await Cdrreport.find()
    .sort({ caller_id_name: 1 })
    .limit(2000)
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletecdrreport = async (req, res) => {
  await Cdrreport.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewreportsfromneronserver = async (req, res) => {
  var request = require("request");
  var options = {
    method: "GET",
    url: `http://103.8.43.14/onyx/api/cdr?start_date=2021-10-25&end_date=2021-10-25`,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    form: {},
  };

  request(options, function (error, response, body) {
    if (response) {
      var toparse = response.body;
      res.status(200).send(toparse);
    }
    if (error) {
      res.status(200).send(error);
    }
  });
};

exports.addreportstomongodb = async (req, res) => {
  var request = require("request");
  var options = {
    method: "GET",
    url: `http://103.8.43.14/onyx/api/cdr?start_date=2021-12-07&end_date=2021-12-07`,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    form: {},
  };

  request(options, function (error, response, body) {
    if (response) {
      var toparse = response.body;
      var tojson = JSON.parse(toparse);

      var toinsertarray = [];
      console.log(tojson.message[0]);

      for (let i = 0; i < tojson.message.length; i++) {
        toinsertarray[i] = tojson.message[i];
      }
      console.log(toinsertarray);

      const toupload = async () => {
        await Cdrreport.insertMany(toinsertarray)
          .then((data) => {
            res.status(200).json("Data added Successfully!!");
            console.log(data);
          })
          .catch((error) => {
            res.status(200).json(error);
            console.log(error);
          });
      };
      toupload();
    }
  });
};

exports.getdetailofonenumber = async (req, res) => {
  await Cdrreport.find({ caller_id_name: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.outgoingcallcount = async (req, res) => {
  await Cdrreport.count({ caller_id_name: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getdetailincoming = async (req, res) => {
  await Cdrreport.find({ destination_number: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.incomingcallcount = async (req, res) => {
  await Cdrreport.count({ destination_number: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.totalcallcount = async (req, res) => {
  await Cdrreport.count({
    $or: [
      { destination_number: req.params.id },
      { caller_id_name: req.params.id },
    ],
  })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.totalcalldetails = async (req, res) => {
  await Cdrreport.find({
    $or: [
      { destination_number: req.params.id },
      { caller_id_name: req.params.id },
    ],
  })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.regexsearch = async (req, res) => {
  const { searchinput } = req.body;
  await Cdrreport.find({
    $or: [
      { caller_id_name: { $regex: searchinput, $options: "i" } },
      { destination_number: { $regex: searchinput, $options: "i" } },
    ],
  })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.missedcalls = async (req, res) => {
  await Cdrreport.find({
    $and: [{ caller_id_name: req.params.id }, { billsec: "0" }],
  })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.missedcallcount = async (req, res) => {
  await Cdrreport.count({
    $and: [{ caller_id_name: req.params.id }, { billsec: "0" }],
  })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getreceivedcalls = async (req, res) => {
  await Cdrreport.find({ destination_number: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getcalleridofall = async (req, res) => {
  var totalextensionarray = [];
  await Cdrreport.find()
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        totalextensionarray.push(data.caller_id_name[i]);
      }
      console.log(totalextensionarray);
      resp.successr(res, totalextensionarray);
    })
    .catch((error) => resp.errorr(res, error));
};

exports.allcalldetails = async (req, res) => {
  console.log(req.params.id);
  const total = await Cdrreport.count({
    $or: [
      { destination_number: req.params.id },
      { caller_id_name: req.params.id },
    ],
  });
  if (total) {
    const outgoing = await Cdrreport.count({ caller_id_name: req.params.id });

    const incoming = await Cdrreport.count({
      destination_number: req.params.id,
    });

    const missedcall = await Cdrreport.count({
      $and: [{ caller_id_name: req.params.id }, { billsec: "0" }],
    });
    res.status(200).json({
      total: total,
      outgoing: outgoing,
      incoming: incoming,
      missedcall: missedcall,
    });
  }
};

exports.getweekdaywisedata = async (req, res) => {
  let today = new Date();
  console.log(today);
  console.log(today.getDay());

  let onedayago = today.setDate(today.getDate() - 1);
  console.log(new Date(onedayago));
  console.log(new Date(onedayago).getDay());

  let twodayago = today.setDate(today.getDate() - 1);
  console.log(new Date(twodayago));
  console.log(new Date(twodayago).getDay());

  let threedayago = today.setDate(today.getDate() - 1);
  console.log(new Date(threedayago));
  console.log(new Date(threedayago).getDay());

  let fourdayago = today.setDate(today.getDate() - 1);
  console.log(new Date(fourdayago));
  console.log(new Date(fourdayago).getDay());

  let fivedayago = today.setDate(today.getDate() - 1);
  console.log(new Date(fivedayago));
  console.log(new Date(fivedayago).getDay());

  let sixdayago = today.setDate(today.getDate() - 1);
  console.log(new Date(sixdayago));
  console.log(new Date(sixdayago).getDay());

  let sevendayago = today.setDate(today.getDate() - 1);
  console.log(new Date(sevendayago));
  console.log(new Date(sevendayago).getDay());

  let onedayagocount = await Cdrreport.count({
    $and: [
      { caller_id_name: "2581" },
      {
        createdAt: {
          $gte: new Date(onedayago),
        },
      },
    ],
  });

  let twodayagocount = await Cdrreport.count({
    $and: [
      { caller_id_name: "2581" },
      {
        createdAt: {
          $gte: new Date(twodayago),
          $lt: new Date(onedayago),
        },
      },
    ],
  });

  let threedayagocount = await Cdrreport.count({
    $and: [
      { caller_id_name: "2581" },
      {
        createdAt: {
          $gte: new Date(threedayago),
          $lt: new Date(twodayago),
        },
      },
    ],
  });

  let fourdayagocount = await Cdrreport.count({
    $and: [
      { caller_id_name: "2581" },
      {
        createdAt: {
          $gte: new Date(fourdayago),
          $lt: new Date(threedayago),
        },
      },
    ],
  });

  let fivedayagocount = await Cdrreport.count({
    $and: [
      { caller_id_name: "2581" },
      {
        createdAt: {
          $gte: new Date(fivedayago),
          $lt: new Date(fourdayago),
        },
      },
    ],
  });

  let sixdayagocount = await Cdrreport.count({
    $and: [
      { caller_id_name: "2581" },
      {
        createdAt: {
          $gte: new Date(sixdayago),
          $lt: new Date(fivedayago),
        },
      },
    ],
  });

  let sevendayagocount = await Cdrreport.count({
    $and: [
      { caller_id_name: "2581" },
      {
        createdAt: {
          $gte: new Date(sevendayago),
          $lt: new Date(sixdayago),
        },
      },
    ],
  });

  res.json({
    onedayagoweekday: new Date(onedayago).getDay(),
    onedayagocalls: onedayagocount,
    twodayagoweekday: new Date(twodayago).getDay(),
    twodayagocalls: twodayagocount,
    threedayagoweekday: new Date(threedayago).getDay(),
    threedayagocalls: threedayagocount,
    fourdayagoweekday: new Date(fourdayago).getDay(),
    fourdayagocalls: fourdayagocount,
    fivedayagoweekday: new Date(fivedayago).getDay(),
    fivedayagocalls: fivedayagocount,
    sixdayagoweekday: new Date(sixdayago).getDay(),
    sixdayagocalls: sixdayagocount,
    sevendayagoweekday: new Date(sevendayago).getDay(),
    sevendayagocalls: sevendayagocount,
  });

  // let year = "2021";
  // let month = "12";
  // let day = "08";
  // let inputdate = `${year}-${month}-${day} 22:50:20`
  // var k = new Date("2021-12-07 22:50:20");
  // day = k.getDay();

  // //dateto

  // await Cdrreport.count({
  //   $and: [
  //     { caller_id_name: "2581" },
  //     {
  //       created_time: {
  //         $gte: "2021-12-07 22:50:20",
  //         $lt: "2021-12-08 22:50:20"
  //       },
  //     },
  //   ],
  // })
  //   .then((data) => res.json({
  //     "Total":data,
  //     "Tuesday":day
  //   }))
  //   .catch((error) => resp.errorr(res, error));
};

exports.allcdrcount = async (req, res) => {
  await Cdrreport.count()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
