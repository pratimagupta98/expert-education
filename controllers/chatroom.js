const Chatroom = require("../models/chatroom");
const { v4: uuidv4 } = require("uuid");
const resp = require("../helpers/apiResponse");

// exports.addchatroom = async (req, res) => {
//  // const uniqueroom = uuidv4();
//   const newChatroom = new Chatroom({
//     sender: req.staffId,
//     receiver: req.params.id,
//    //room_id: uniqueroom,
//   });

//   const findexist = await Chatroom.findOne({
//     $or: [
//       { $and: [{ sender: req.userId }, { receiver: req.params.id }] },
//       { $and: [{ sender: req.params.id }, { receiver: req.userId }] },
//     ],
//   });
  
//   if (findexist) {
//     console.log(findexist.room);
//     res.status(400).json({
//       status: false,
//       msg: "Already Exists",
//       data: findexist,
//     });
//   } else {
//     newChatroom
//       .save()
//       .then((data) => {
//         res.status(200).json({
//           status: true,
//           msg: "success",
//           data: data,
//         });
//       })
//       .catch((error) => {
//         res.status(400).json({
//           status: false,
//           msg: "error",
//           error: error,
//         });
//       });
//   }
// };


exports.add_tchr_chat = async (req, res) => {
    const uniqueroom = uuidv4();
    const {staffid,userid,msg} = req.body;
  
    const newChatroom= new Chatroom({
        staffid:req.staffId,
        userid: userid,
      msg: msg,
       
     
    });
  
     
    newChatroom
        .save()
        .then((data) => {
            res.status(200).json({
              status: true,
             // msg:msg,
            //  msg_receiver:req.params.id,
     
     
            data: [{  msg:req.body.msg},{staffid: req.staffId,
            }],
            userid:userid,
            });
          })
          .catch((error) => {
            res.status(200).json({
              status: false,
              msg: "error",
              error: error,
            });
          });
        // .then((data) => resp.successr(res, data))
        // .catch((error) => resp.errorr(res, error));
    } 
      
  
  
          // .then((data) => resp.successr(res, data))
          // .catch((error) => resp.errorr(res, error));
    
// exports.mychatroom = async (req, res) => {
//   const findall = await Chatroom.find({
//     $or: [{ staff: req.staffId }, { userid: req.params.id }],
//   })
//     // .populate("sender")
//     // .populate("receiver")

//     .sort({
//       updatedAt: -1,
//     });
//   if (findall) {
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: findall,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: "error",
//     });
//   }
// };




exports.mychatroom = async (req, res) => {
    const findall = await Chatroom.find({ $and :[{staffid: req.staffId},{userid: req.params.id }]})
     .populate("staffid")
     .populate("userid")
      // .sort({ createdAt: 1 })
   if(findall){
     res.status(200).json({
       status: true,
       //msg: "success",
      // msg_receiver:req.staffId,
       //msg:msg,
      // userid:req.params.id,
      data :findall,
      //userid:req.params.id,
     //  data: [{findall:findall}]
       
     });
   }
   
       // .then((data) => resp.successr(res, data))
       // .catch((error) => resp.errorr(res, error));
   };






exports.deletechatroom = async (req, res) => {
  try {
    const deleteentry = await Otpapi.Chatroom({ _id: req.params.id });
    res.status(200).json({
      status: true,
      msg: "success",
      data: deleteentry,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
};
