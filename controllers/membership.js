const Membership = require("../models/membership");
const resp = require("../helpers/apiResponse");

exports.addmembership = async (req, res) => {
  
 const {userid,plan_Id} =req.body
  const newMembership = new Membership({
    userid: req.userId,
    plan_Id: req.params.id,
  });
  const findexist = await Membership.findOne({$and:[{userid:req.userId},{plan_Id:req.params.id }]});
  console.log(findexist)
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newMembership
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.getmembershiplist = async (req, res) => {
    await Membership.find({userid:req.userId})
      .populate("userid")
      .populate("plan_Id")
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

   
// exports.addmembership = async(req,res)=>{
//  const {userid,plan_Id} = req.body
//  console.log(req.body)
// }