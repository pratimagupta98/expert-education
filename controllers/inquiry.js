const Inquiry = require("../models/inquiry");
const resp = require("../helpers/apiResponse");

exports.addinquiry = async (req, res) => {
  const { name, product,email,mobile, desc } = req.body;

  const newInquiry = new Inquiry({
    name: name,
    product: product,
    email: email,
    mobile: mobile,
    desc: desc,
  });
  const findexist = await Inquiry.findOne({ name: name });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newInquiry
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.editinquiry = async (req, res) => {
  await Inquiry.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewoneinquiry = async (req, res) => {
  await Inquiry.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allinquiry = async (req, res) => {
  await Inquiry.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteinquiry = async (req, res) => {
  await Inquiry.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
