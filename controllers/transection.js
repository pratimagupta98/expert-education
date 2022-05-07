const Transection = require("../models/transection");
const Staffnotification = require("../models/notification");
const resp = require("../helpers/apiResponse");
const Usernotification = require("../models/usernotification");

let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${date}-${month}-${year}`;
};
exports.addTransection = async (req, res) => {
  const { user_id, amount, paymenyt_id, transectionId, date } = req.body;
  let length = 6;
  let transectionid = (
    "0".repeat(length) + Math.floor(Math.random() * 10 ** length)
  ).slice(-length);
  const newTransection = new Transection({
    date: getCurrentDate(),
    user_id: user_id,
    amount: amount,
    paymenyt_id: paymenyt_id,
    paymenyt_id: paymenyt_id,
    transectionId: transectionid,
  });
  const findexist = await Transection.findOne({ paymenyt_id: paymenyt_id });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newTransection
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.allTransection = async (req, res) => {
  await Transection.find()
    .populate("user_id")

    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.allUserTransection = async (req, res) => {
  await Transection.find({ user_id: req.user_id })
    .populate("user_id")

    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
