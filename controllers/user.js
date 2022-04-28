const User = require("../models/user");
const Batch = require("../models/studentBatch");
const resp = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const key = "verysecretkey";
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const {
    fullname,
    email,
    mobile,
    password,
    cnfmPassword,

    status,
    user_type,
    batge_id,
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newuser = new User({
    fullname: fullname,
    email: email,
    mobile: mobile,
    password: hashPassword,
    cnfmPassword: hashPassword,
    kyc_form: kyc_form,
    status: status,
    user_type: user_type,
    batge_id: batge_id,
  });

  const findexist = await User.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newuser
      .save()
      .then((result) => {
        const token = jwt.sign(
          {
            userId: result._id,
          },
          key,
          {
            expiresIn: 86400000,
          }
        );
        res.header("user-token", token).status(200).json({
          status: true,
          token: token,
          msg: "success",
          user: result,
        });
      })
      .catch((error) => resp.errorr(res, error));
  }
};

exports.login = async (req, res) => {
  const { mobile, email, password } = req.body;
  const user = await User.findOne({
    $or: [{ mobile: mobile }, { email: email }],
  });
  if (user) {
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        key,
        {
          expiresIn: 86400000,
        }
      );
      res.header("user-token", token).status(200).send({
        status: true,
        token: token,
        msg: "success",
        user: user,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "Incorrect Password",
        error: "error",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "User Doesnot Exist",
      error: "error",
    });
  }
};

exports.editadmin = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.adminId },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.edituserbytoken = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.userId },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.changepass = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.userId },
    { $set: { password: req.body.password } },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.changepassid = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { password: req.body.password } },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.changepassidUser = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: { password: req.body.password } },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.edituser = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allusers = async (req, res) => {
  await User.find()
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.enrollusers = async (req, res) => {
  await User.find({ status: "enroll" })
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewoneuser = async (req, res) => {
  await User.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.countuser = async (req, res) => {
  await User.countDocuments()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.myprofile = async (req, res) => {
  await User.findOne({ _id: req.userId })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteuser = async (req, res) => {
  await User.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.addbatchn = async (req, res) => {
  const { student_Id, lavel_Id } = req.body;

  const newbatch = new Batch({
    student_Id: student_Id,
    lavel_Id: lavel_Id,
  });
  newbatch
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allbatch = async (req, res) => {
  await Batch.find()
    .populate("student_Id")
    .populate("lavel_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewonebatch = async (req, res) => {
  await Batch.findOne({ _id: req.params.id })
    .populate("student_Id")
    .populate("lavel_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewonebatchUser = async (req, res) => {
  await Batch.findOne({ student_Id: req.userId })
    .populate("student_Id")
    .populate("lavel_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletebatch = async (req, res) => {
  await Batch.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updatebatch = async (req, res) => {
  await Batch.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  )
    .populate("student_Id")
    .populate("lavel_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.editusertoken = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.userId },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
