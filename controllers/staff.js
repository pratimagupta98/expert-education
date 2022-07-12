const Staff = require("../models/staff");
const User = require("../models/user");

const resp = require("../helpers/apiResponse");
const { uploadFile } = require("../helpers/awsuploader");
const bcrypt = require("bcryptjs");
const key = "verysecretkey";
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const staff = require("../models/staff");

const { uploadBase64ImageFile } = require("../helpers/awsuploader");
var signatures = {
  JVBERi0: "application/pdf",
  R0lGODdh: "image/gif",
  R0lGODlh: "image/gif",
  iVBORw0KGgo: "image/png",
  "/9j/": "image/jpg"
};

function detectMimeType(b64) {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}


exports.addstaff = async (req, res) => {
  const {
    fullname,
    email,
    mobile,
    password,
    cnfmPassword,
    gender,
    dob,
    state,
    city,
    institute,
    approvedstatus,
  } = req.body;

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newStaff = new Staff({
    fullname: fullname,
    email: email,
    mobile: mobile,
    password: hashPassword,
    cnfmPassword: hashPassword,
    gender: gender,
    dob: dob,
    state: state,
    city: city,
    institute: institute,
    approvedstatus: approvedstatus,
  });

  const findexist = await Staff.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    if (req.files) {
      console.log(req.files);
      if (req.files.image) {
        const geturl = await uploadFile(
          req.files.image[0]?.path,
          req.files.image[0]?.filename,
          "jpg"
        );
        if (geturl) {
          newStaff.image = geturl.Location;
          //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
        }
      }
      newStaff
        .save()
        .then((result) => {
          const token = jwt.sign(
            {
              staffId: staff._id,
            },
            key,
            {
              expiresIn: "365d",
            }
          );
          res.header("staff-token", token).status(200).json({
            status: true,
            token: token,
            msg: "success",
            staff: result,
          });
        })
        .catch((error) => resp.errorr(res, error));
    }
  }
};

exports.staffbyadmin = async (req, res) => {
  const {
    fullname,
    email,
    mobile,
    password,
    cnfmPassword,
    image,
    gender,
    dob,
    state,
    city,
    institute,
    approvedstatus,
  } = req.body;

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newStaff = new Staff({
    fullname: fullname,
    email: email,
    mobile: mobile,
    password: hashPassword,
    cnfmPassword: hashPassword,
    image: image,
    gender: gender,
    dob: dob,
    state: state,
    city: city,
    institute: institute,
    approvedstatus: approvedstatus,
  });

  const findexist = await Staff.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    if (req.files) {
      console.log(req.files);
    }
    newStaff
      .save()
      .then((result) => {
        const token = jwt.sign(
          {
            staffId: staff._id,
          },
          key,
          {
            expiresIn: "365d",
          }
        );
        res.header("staff-token", token).status(200).json({
          status: true,
          token: token,
          msg: "success",
          user: result,
        });
      })
      .catch((error) => resp.errorr(res, error));
  }
};

// exports.stafflogin = async (req, res) => {
//   const { mobile, email, password } = req.body;

//   const staff = await Staff.findOne({
//     $or: [{ mobile: mobile }, { email: email }],
//   });
//   if (staff) {
//     console.log(staff);
//     if (staff.approvedstatus == true ) {
//       const validPass = await bcrypt.compare(password, staff.password);
//       if (validPass) {
//         const token = jwt.sign(
//           {
//             staffId: staff._id,
//           },
//           key,
//           {
//             expiresIn: "365d",
//           }
//         );
//         res.header("staff-token", token).status(200).send({
//           status: true,
//           token: token,
//           msg: "success",
//           staff: staff,
//         });
//       } else {
//         res.status(400).json({
//           status: false,
//           msg: "Incorrect Password",
//           error: "error",
//         });
//       }
//     } else {
//       res.status(400).json({
//         status: false,
//         msg: "Profile is under verification",
//         error: "error",
//       });
//     }
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "Staff Doesnot Exist",
//       error: "error",
//     });
//   }
// };

exports.stafflogin = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json(errors);
  // }

  const { mobile, email, password } = req.body;

  // if(body('mobile')){
  //   console.log(body('mobile'))
  // }

  const staff = await Staff.findOne({
    $or: [{ mobile: mobile }, { email: email }],
  });
  if (staff) {
    //console.log(staff);
    if (staff.approvedstatus == "true") {
      const validPass = await bcrypt.compare(password, staff.password);
      if (validPass) {
        const token = jwt.sign(
          {
            staffId: staff._id,
          },
          key,
          {
            expiresIn: "365d",
          }
        );
        res.header("staff-token", token).status(200).send({
          status: true,
          token: token,
          msg: "success",
          staff: staff,
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
        msg: "Profile is under verification",
        error: "error",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "Staff Doesnot Exist",
      error: "error",
    });
  }
};

exports.setting = async (req, res) => {
  await Staff.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.settingbytoken = async (req, res) => {
  const {
    fullname,
    email,
    mobile,
    password,
    cnfmPassword,
    image,
    gender,
    dob,
    state,
    city,
    institute,
    approvedstatus,
  } = req.body;
   
  data = {};
  if (fullname) {
    data.fullname = fullname;
  }
  if (email) {
    data.email = email;
  }
  
  if (mobile) {
    data.mobile = mobile;
  }
  if (password) {
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    data.password = hashPassword;
  }
  if (cnfmPassword) {
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    data.cnfmPassword = hashPassword;
  }
  if (gender) {
    data.gender = gender;
  }
  if (dob) {
    data.dob = dob;
  }
  if (state) {
    data.state = state;
  }
  if (city) {
    data.city = city;
  }
  if (institute) {
    data.institute = institute;
  }
  if (approvedstatus) {
    data.approvedstatus = approvedstatus;
  }
  if(image){
    if(image){
  const base64Data   = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""),'base64')
  detectMimeType(base64Data);
  const type = detectMimeType(image);
     // console.log(newCourse,"@@@@@");
     const geturl = await uploadBase64ImageFile(
      base64Data,
      data.id,
     type
    );
    console.log(geturl,"&&&&");
    if (geturl) {
      data.image = geturl.Location;
     
      //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
    }
  }
}
  await Staff.findOneAndUpdate(
    {
      _id: req.staffId,
    },
    { $set: data },
    { new: true }
  )

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.changepassstaff = async (req, res) => {
  await Staff.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { password: req.body.password } },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.changepassstaffUser = async (req, res) => {
  await Staff.findOneAndUpdate(
    { _id: req.params.staffId },
    { $set: { password: req.body.password } },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewonestaff = async (req, res) => {
  await Staff.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewonestaffbytoken = async (req, res) => {
  await Staff.findOne({ _id: req.staffId })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewstaffbytoken = async (req, res) => {
  await Staff.findOne({ _id: req.staffId })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allstaff = async (req, res) => {
  await Staff.find()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.countstaff = async (req, res) => {
  await Staff.countDocuments()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletestaff = async (req, res) => {
  await Staff.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.approved_staff = async (req, res) => {
  await Staff.find({ approvedstatus: "true" })
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.not_approved_staff = async (req, res) => {
  await Staff.find({ approvedstatus: "false" })
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.countstaff = async (req, res) => {
  await Staff.countDocuments()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.myprofileStaff = async (req, res) => {
  await Staff.findOne({ _id: req.staffId })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.countenrollStudent = async (req, res) => {
  await User.countDocuments({
    $and: [{ status: "Enroll" }, { _id: req.userId }],
  })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.cnfm_approved_teacher = async (req, res) => {
     
  const findandUpdateEntry = await Staff.findOneAndUpdate(
  
    { _id: req.params.id },
    
    { $set:{approvedstatus:"true"} },
    
  //     { amount: currntamt },
       
  // { $set: {status:"success"} },
  { new: true }
)
.then((data) => resp.successr(res, data))
.catch((error) => resp.errorr(res, error));
 
}