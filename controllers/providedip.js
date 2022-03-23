const Providedip = require("../models/providedip");
const resp = require("../helpers/apiResponse");

exports.addprovidedip = async (req, res) => {
  const { ipnumber, title, activestatus } = req.body;

  const newProvidedip = new Providedip({
    ipnumber: ipnumber,
    title: title,
    activestatus: activestatus,
  });
  const findexist = await Providedip.findOne({
    ipnumber: ipnumber,
  });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newProvidedip
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.editprovidedip = async (req, res) => {
  await Providedip.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewoneprovidedip = async (req, res) => {
  await Providedip.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allprovidedip = async (req, res) => {
  await Providedip.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteprovidedip = async (req, res) => {
  await Providedip.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
