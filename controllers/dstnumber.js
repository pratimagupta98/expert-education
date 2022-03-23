const Dstnumber = require("../models/dstnumber");
const resp = require("../helpers/apiResponse");
const fs = require("fs");

exports.adddstnumber = async (req, res) => {
  const { did_no, ip, alottedtouser, plan, ivr, extensions, is_used ,giventolevel1} =
    req.body;

  const newDstnumber = new Dstnumber({
    did_no: did_no,
    ip: ip,
    alottedtouser: alottedtouser,
    plan: plan,
    ivr: ivr,
    extensions: extensions,
    is_used: is_used,
    giventolevel1:giventolevel1
  });
  const findexist = await Dstnumber.findOne({ did_no: did_no });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newDstnumber
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.editdstnumber = async (req, res) => {
  console.log(req.body);
  const checkif = await Dstnumber.findOne({ _id: req.params.id })
  console.log(checkif);
  // req.body.giventolevel1 = req.body.assign;
  // delete req.body.assign
  // console.log(req.body);
  if(checkif.giventolevel1 == null || checkif.giventolevel1 == undefined){
    req.body.giventolevel1 = req.body.assign;
    delete req.body.assign
    console.log(req.body);
  }
  await Dstnumber.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewonedstnumber = async (req, res) => {
  await Dstnumber.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.alldstnumber = async (req, res) => {
  await Dstnumber.find()
    .sort({ sortorder: 1 })
    .populate("ip").populate('giventolevel1').populate('giventolevel2').populate('giventolevel3').populate('giventolevel4').populate('giventolevel5')
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletedstnumber = async (req, res) => {
  await Dstnumber.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.addlldidno = async (req, res) => {
  const getnumbers = require("../data.json");
  console.log(getnumbers);
  res.send(getnumbers.numbers)
  await Dstnumber.insertMany(getnumbers.numbers)
  .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.mydstnumbers = async (req, res) => {
  await Dstnumber.find({giventolevel1:req.staffId})
    .sort({ sortorder: 1 })
    .populate("ip").populate('giventolevel1').populate('giventolevel2').populate('giventolevel3').populate('giventolevel4').populate('giventolevel5')
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};