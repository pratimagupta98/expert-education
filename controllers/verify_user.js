const Verifycode =  require("../models/verify_user");
const User = require("../models/user");

// exports.verify_user = async (req, res) => {
//     const { verify_user, verify_code } = req.body;
//     const dealerDetail = await User.findOne({ verify_user: verify_user });
//     console.log(dealerDetail)
//     if (dealerDetail) {
//       if (otp == "123456") {
//         if (dealerDetail.userverified) {
//           const token = jwt.sign(
//             {
//               dealerId: dealerDetail._id,
//             },
//             key,
//             {
//               expiresIn: "365d",
//             }
//           );
//           await Dealershipform.findOneAndUpdate(
//             {
//               _id: req.params.id,
//             },
//             { $set: { userverified: true } },
//             { new: true }
//           ).then((data) => {
//             res.json({
//               status: "success",
//               token: token,
//               msg: "Welcome Back",
//               otpverified: true,
//               redirectto: "dashboard",
//               data: data,
//             });
//           });
//         } else {
//           if (!dealerDetail.userverified) {
//             const token = jwt.sign(
//               {
//                 dealerId: dealerDetail._id,
//               },
//               key,
//               {
//                 expiresIn: "365d",
//               }
//             );
//             res.json({
//               status: "success",
//               token: token,
//               msg: "Continue signup",
//               otpverified: true,
//               redirectto: "signupdetail",
//             });
//           }
//         }
//       } else {
//         res.json({
//           status: "failed",
//           msg: "Incorrect OTP",
//         });
//       }
//     } else {
//       res.json({
//         status: "error",
//         msg: "User doesnot exist",
//       });
//     }
//   };
  

  //console