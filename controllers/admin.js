const Admin = require("../models/admin");
const resp = require("../helpers/apiResponse");
const Staff = require("../models/staff");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const { uploadFile } = require("../helpers/awsuploader");
const User = require("../models/user");
const Course = require("../models/course");
const key = "verysecretkey";
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { adminname, adminimg, email, mobile, password, cnfmPassword } =
    req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newAdmin = new Admin({
    adminname: adminname,
    password: hashPassword,
    cnfmPassword: hashPassword,
    email: email,
    mobile: mobile,
    adminimg: adminimg,
  });

  const findexist = await Admin.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    if (req.files) {
      console.log(req.files);
      if (req.files.adminimg) {
        const geturl = await uploadFile(
          req.files.adminimg[0]?.path,
          req.files.adminimg[0]?.filename,
          "jpg"
        );
        if (geturl) {
          newAdmin.adminimg = geturl.Location;
          //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
        }
      }
    }
    newAdmin
      .save()
      .then((result) => {
        const token = jwt.sign(
          {
            adminId: result._id,
          },
          key,
          {
            expiresIn: 86400000,
          }
        );
        res.header("ad-token", token).status(200).json({
          status: true,
          token: token,
          msg: "success",
          admin: result,
        });
      })
      .catch((error) => resp.errorr(res, error));
  }
};

exports.adminlogin = async (req, res) => {
  const { mobile, email, password } = req.body;
  const admin = await Admin.findOne({
    $or: [{ mobile: mobile }, { email: email }],
  });
  if (admin) {
    const validPass = await bcrypt.compare(password, admin.password);
    if (validPass) {
      const token = jwt.sign(
        {
          adminId: admin._id,
        },
        key,
        {
          expiresIn: 86400000,
        }
      );
      res.header("ad-token", token).status(200).send({
        status: true,
        token: token,
        msg: "success",
        Admin: admin,
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
      msg: "admin Doesnot Exist",
      error: "error",
    });
  }
};

exports.editAdmin = async (req, res) => {
  const { adminname, email, mobile, password, cnfmPassword } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  data = {};
  if (adminname) {
    data.adminname = adminname;
  }
  if (email) {
    data.email = email;
  }
  if (mobile) {
    data.mobile = mobile;
  }
  if (mobile) {
    data.mobile = mobile;
  }
  if (password) {
    data.password = hashPassword;
  }
  if (req.files) {
    console.log(req.files);
    if (req.files.adminimg) {
      const geturl = await uploadFile(
        req.files.adminimg[0]?.path,
        req.files.adminimg[0]?.filename,
        "jpg"
      );
      if (geturl) {
        data.adminimg = geturl.Location;
        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }

    if (data) {
      const findandUpdateEntry = await Admin.findOneAndUpdate(
        {
          _id: req.adminId,
        },
        { $set: data },
        { new: true }
      );

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
  }
};

//     await Admin.findOneAndUpdate(
//       { _id: req.adminId },
//       { $set: req.body },
//       { new: true }
//     )
//       .then((data) => resp.successr(res, data))
//       .catch((error) => resp.errorr(res, error));
//   };

exports.viewoneAdmin = async (req, res) => {
  await Admin.findOne({ _id: req.adminId })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteAdmin = async (req, res) => {
  await Admin.deleteOne({ _id: req.adminId })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getAdmin = async (req, res) => {
  await Admin.find()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.countteacher = async (req, res) => {
  await Staff.countDocuments()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.countteacherAprove = async (req, res) => {
  await Staff.countDocuments({ approvedstatus: true })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.countteacherAprove = async (req, res) => {
  await Staff.countDocuments({ approvedstatus: true })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.countUser = async (req, res) => {
  await User.countDocuments()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.countUserEnroll = async (req, res) => {
  await User.countDocuments({ status: "Enroll" })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.councours = async (req, res) => {
  await Course.countDocuments()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
