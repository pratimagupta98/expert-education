const User = require("../models/user");
const Batch = require("../models/studentBatch");
const resp = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const { uploadFile } = require("../helpers/awsuploader");
const key = "verysecretkey";
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const {
    fullname,
    email,
    mobile,
    password,
    cnfmPassword,
    userimg,
    status,
    code,
    user_type,
    batge_id,
    verify_code,
    refer_fromid
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  create_random_string(6);
  function create_random_string(string_length) {
    (random_string = ""),
      (characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz");
    for (var i, i = 0; i < string_length; i++) {
      random_string += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return random_string;
  }

  const newuser = new User({
    fullname: fullname,
    email: email,
    mobile: mobile,
    password: hashPassword,
    cnfmPassword: hashPassword,
    userimg: userimg,
    status: status,
    user_type: user_type,
    batge_id: batge_id,
    refer_fromid:refer_fromid,
    referral_code:random_string ,

  });

  const findexist = await User.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    if (req.files) {
      console.log(req.files);
      if (req.files.userimg) {
        const geturl = await uploadFile(
          req.files.userimg[0]?.path,
          req.files.userimg[0]?.filename,
          "jpg"
        );
        if (geturl) {
          newuser.userimg = geturl.Location;
          //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
        }
      }
    }
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
    } 
    const findone = await User.findOne({ _id: req.body.refer_fromid });
      if(findone){
      console.log("STRING",findone)
      let  Code = findone?.referral_code
      console.log("RefereCode",Code)

      create_random_string(6);
      function create_random_string(string_length) {
        (random_string = ""),
          (characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz");
        for (var i, i = 0; i < string_length; i++) {
          random_string += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
        return random_string;
      }
      if(req.body.verifycode ==  Code ){
        const newuser = new User({
          fullname: fullname,
          email: email,
          mobile: mobile,
          password: hashPassword,
          cnfmPassword: hashPassword,
          userimg: userimg,
          status: status,
          user_type: user_type,
          batge_id: batge_id,
          refer_fromid:refer_fromid,
          referral_code:random_string ,
      
        })
        const findexist = await User.findOne({
          $or: [{ email: email }, { mobile: mobile }],
        });
        if (findexist) {
          resp.alreadyr(res);
        } else {
          if (req.files) {
            console.log(req.files);
            if (req.files.userimg) {
              const geturl = await uploadFile(
                req.files.userimg[0]?.path,
                req.files.userimg[0]?.filename,
                "jpg"
              );
              if (geturl) {
                newuser.userimg = geturl.Location;
                //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
              }
            }
          }
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
          } 
      }
      // else{
      //   res.status(400).json({
      //     status:false,
      //     msg:"wrong referal code"
      //   })
      // }
}
}




exports.login = async (req, res) => {
  const { mobile, email, password } = req.body;
  const user = await User.findOne({
    $or: [{ mobile: mobile }, { email: email }],
  });
  console.log("user", user);
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
  const {
    fullname,
    email,
    mobile,
    password,
    
    userimg,
    status,
    
 
  } = req.body;
  console.log("uuuuu",req.body)
  if (password) {
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
  }
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

  if (status) {
    data.status = status;
  }
 

  if (req.files) {
    console.log(req.files);
    if (req.files.userimg) {
      const geturl = await uploadFile(
        req.files.userimg[0]?.path,
        req.files.userimg[0]?.filename,
        "jpg"
      );
      if (geturl) {
        data.userimg = geturl.Location;
        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }
  }
  await User.findOneAndUpdate(
    { _id: req.userId },
    { $set: data },
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
  //await User.remove();
  await User.find().populate("refer_fromid")
    .sort({ createdAt: 1 }).populate("refer_fromid")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.enrollusers = async (req, res) => {
  await User.find({ status: "Enroll" })
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

// exports.editusertoken = async (req, res) => {
//   await User.findOneAndUpdate(
//     { _id: req.userId },
//     { $set: req.body },
//     { new: true }
//   )
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };


exports.editusertoken = async (req, res) => {
   const {fullname,email,mobile,password,cnfmPassword,status,user_type,batge_id}=req.body

   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(password, salt);

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
     data.password = hashPassword;
   }
   if (cnfmPassword) {
     data.cnfmPassword = cnfmPassword;
   }
   if (status) {
     data.status = status;
   }
   if (user_type) {
     data.user_type = user_type;
   }
   if (batge_id) {
     data.batge_id = batge_id;
   }
    
   if (req.files) {
     console.log(req.files);
     if (req.files.userimg) {
       const geturl = await uploadFile(
         req.files.userimg[0]?.path,
         req.files.userimg[0]?.filename,
         "jpg"
       );
       if (geturl) {
         data.userimg = geturl.Location;
         //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
       }
     }

    }
    await User.findOneAndUpdate(
      {
        _id: req.userId,
      },
      { $set: data },
      { new: true }
    )
  
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };


  
// exports.verify_referal = async (req, res) => {
//   const {referral_code}   = req.body
//    const findone = await User.findOne({verify_user: req.params.id }) 
//   // console.log(findone)
   
//       // console.log("coupon valid");
//       if(findone){
//        res.status(200).json({
//          status: true,
//          msg: "coupon valid",
//          data:findone,
// //discount_amount: findone?.amount,
//        });
//      }  else {
//       res.status(400).json({
//         status: false,
//         msg: "error",
//         error: "error",
//       });
//     }
// }

// exports.checkverify_code = async (req, res) => {
//   const {
//     refer_fromid,
     
//     fullname,
//     email,
//     mobile,
//     password,
//     cnfmPassword,
//     userimg,
//     status,
//     code,
//     verifyCode,
    
//   } = req.body;

//   const salt = await bcrypt.genSalt(10);
//   const hashPassword = await bcrypt.hash(password, salt);
//   create_random_string(6);
//   function create_random_string(string_length) {
//     (random_string = ""),
//       (characters =
//         "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz");
//     for (var i, i = 0; i < string_length; i++) {
//       random_string += characters.charAt(
//         Math.floor(Math.random() * characters.length)
//       );
//     }
//     return random_string;
//   }
//   const findone = await User.findOne({ _id: req.body.refer_fromid });
//   if(findone){
//     console.log("STRING",findone)
//     let  Code = findone?.referral_code
//     console.log("RefereCode",Code)
   
// if(req.body.verifycode ==  Code ){
//   const newuser = new User({
//     refer_fromid:refer_fromid,
    
//     fullname: fullname,
//     email: email,
//     mobile: mobile,
//     password: hashPassword,
//     cnfmPassword: hashPassword,
//     userimg: userimg,
//     status: status,
//     referral_code:random_string ,
//     //verifycode:verifycode
//   });

//   const findexist = await User.findOne({
//     $or: [{ email: email }, { mobile: mobile }],
//   });
//   if (findexist) {
//     resp.alreadyr(res);
//   } else {
//     if (req.files) {
//       console.log(req.files);
//       if (req.files.userimg) {
//         const geturl = await uploadFile(
//           req.files.userimg[0]?.path,
//           req.files.userimg[0]?.filename,
//           "jpg"
//         );
//         if (geturl) {
//           newuser.userimg = geturl.Location;
//           //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
//         }
//       }
//     }
//     }
//     newuser
//       .save()
//       .then((result) => {
//         const token = jwt.sign(
//           {
//             userId: result._id,
//           },
//           key,
//           {
//             expiresIn: 86400000,
//           }
//         );
//         res.header("user-token", token).status(200).json({
//           status: true,
//           token: token,
//           msg: "success",
//           user: result,
//         });
//       })
//       .catch((error) => resp.errorr(res, error))
//   }else{
//     res.status(400).json({
//       status:false,
//       msg:"wrong referal code",
//       error:"errorr"
//     })
//   }
// };
// }

exports.checkverify_code = async (req, res) => {
  const {refer_fromid,verifyCode} = req.body;
  const findone = await User.findOne({ _id: req.body.refer_fromid });
    if(findone){
      console.log("STRING",findone)
      let  Code = findone?.referral_code
      console.log("RefereCode",Code)


      if(req.body.verifycode ==  Code ){
        res.status(200).json({
          status:true,
          msg:"Verified"
        })
      }else{
        res.status(400).json({
          status:false,
          msg:"wrong referal code"
        })
      }
    }
}