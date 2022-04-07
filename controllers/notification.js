const Notification = require("../models/notification");
const resp = require("../helpers/apiResponse");
const Usernotification = require("../models/usernotification");


exports.addNotification = async(req,res)=>{
    const{usertype,userid,staffid,noti_title,desc} = req.body

    const newNotification = new Notification({
        usertype :usertype,
        userid :userid,
        staffid :staffid,
        noti_title :noti_title,
        desc : desc
    })
const findexist = await Notification.findOne({noti_title :noti_title})
if(findexist){
    resp.alreadyr(res);
}else{
    newNotification
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }

}
 
exports.viewonenotification = async (req, res) => {
    await Notification.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  exports.viewoneNot_bytoken = async (req, res) => {
    await Notification.findOne({ staff: req.staffId })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.allNotification = async (req, res) => {
    await Notification.find().populate("userid").populate("staffid")
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.noti_bytype = async (req, res) => {
    await Notification.find({usertype:req.params.id})
    .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.noti_bytypebytoken = async (req, res) => {
    await Notification.find({usertype:req.params.id})
    .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };


  exports.allstaffNotification = async (req, res) => {
    await Notification.find({staffid: req.staffId})
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.all_userNotification = async (req, res) => {
    await Notification.find({userid: req.userId})
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };


  // exports.all_userNotification = async (req, res) => {
  //   await Notification.find({userid: req.userId})
  //     .sort({ sortorder: 1 })
  //     .then((data) => resp.successr(res, data))
  //     .catch((error) => resp.errorr(res, error));
  // };
  // exports.alluserNotification = async (req, res) => {
  //   //const getuser = await User.findOne({ _id: req.userId });

  //   await Notification.find({userid: req.userId})
  //     .sort({ sortorder: 1 })
  //     .then((data) => resp.successr(res, data))
  //     .catch((error) => resp.errorr(res, error));
  // };

  exports.del_notification = async (req, res) => {
    await Notification.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  
  exports.clrnotification = async (req, res) => {
    await Notification.deleteMany()
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.addUserNotification = async(req,res)=>{
    const{userid,noti_title,desc} = req.body

    const newUserNotification = new Usernotification({
       userid :userid,
       noti_title :noti_title,
        desc : desc
    })
const findexist = await Usernotification.findOne({noti_title :noti_title})
if(findexist){
    resp.alreadyr(res);
}else{
  newUserNotification
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }

}


exports.viewoneNotificationUser = async (req, res) => {
  await Usernotification.findOne({ _id: req.params.id }).populate('userid')
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.del_NotificationUser = async (req, res) => {
  await Usernotification.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.all_NotificationUser = async (req, res) => {
  await Usernotification.find().populate('userid')
    .sort({ createdAt: -1})
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.allUserNotification = async (req, res) => {
  await Usernotification.find({userid: req.userId}).populate('userid')
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewone_NotificationUser = async (req, res) => {
  await Usernotification.findOne({userid: req.userId}).populate('userid')
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};