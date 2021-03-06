const Kycform = require("../models/kycform");
const resp = require("../helpers/apiResponse");
const { uploadFile } = require("../helpers/awsuploader");
const fs = require("fs");

exports.addkycform = async (req, res) => {
  const {
    userid,
    gender,
    dob,
    nationality,
    aadhar_num,
    // aadharImg,
    photo,
    front,
    back,
  } = req.body;

  const newKycform = new Kycform({
    userid: req.userId,
    gender: gender,
    dob: dob,
    nationality: nationality,
    aadhar_num: aadhar_num,
    front: front,
    back: back,
    photo: photo,
     
  });
  if (req.files) {
    if (req.files.back) {
      const geturl = await uploadFile(
        req.files.back[0]?.path,
        req.files.back[0]?.filename,
        "jpg"
      );
      if (geturl) {
        newKycform.back = geturl.Location;
        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }
    if (req.files.front) {
      const geturl = await uploadFile(
        req.files.front[0]?.path,
        req.files.front[0]?.filename,
        "jpg"
      );
      if (geturl) {
        newKycform.front = geturl.Location;
        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }
    if (req.files.photo) {
      const geturl = await uploadFile(
        req.files.photo[0]?.path,
        req.files.photo[0]?.filename,
        "jpg"
      );
      if (geturl) {
        newKycform.photo = geturl.Location;
        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }
  }
  newKycform
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.verifykyc = async (req, res) => {
  await Kycform.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: { status: true } },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.editkycform = async (req, res) => {
  const {
    userid,
    gender,
    dob,
    nationality,
    aadhar_num,

    photo,
    front,
    back,
  } = req.body;
  data = {};

  if (userid) {
    data.userid = userid;
  }
  if (gender) {
    data.gender = gender;
  }
  if (dob) {
    data.dob = dob;
  }
  if (nationality) {
    data.nationality = nationality;
  }
  if (aadhar_num) {
    data.aadhar_num = aadhar_num;
  }
  if (req.files) {
    if (req.files.back) {
      const geturl = await uploadFile(
        req.files.back[0]?.path,
        req.files.back[0]?.filename,
        "jpg"
      );
      if (geturl) {
        data.back = geturl.Location;
        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }

    if (req.files.photo) {
      const geturl = await uploadFile(
        req.files.photo[0]?.path,
        req.files.photo[0]?.filename,
        "jpg"
      );
      if (geturl) {
        data.photo = geturl.Location;
        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }

    if (req.files.front) {
      const geturl = await uploadFile(
        req.files.front[0]?.path,
        req.files.front[0]?.filename,
        "jpg"
      );
      if (geturl) {
        data.front = geturl.Location;
        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }
  }
  if (data) {
    const findandUpdateEntry = await Kycform.findOneAndUpdate(
      {
        userid: req.userId,
      },
      { $set: data },
      { new: true }
    ).populate("userid");

    if (findandUpdateEntry) {
      res.status(200).json({
        status: true,
        msg: "success",
        data: findandUpdateEntry,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    }
  }
};

exports.viewonekycform = async (req, res) => {
  await Kycform.findOne({ _id: req.params.id })
    .populate("userid")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allkycform = async (req, res) => {
  await Kycform.find({ userid: req.userId })
    .populate("userid")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletekycform = async (req, res) => {
  await Kycform.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getkycform = async (req, res) => {
  await Kycform.find()
    .populate("userid")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};