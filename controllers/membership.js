const Membership = require("../models/membership");
const resp = require("../helpers/apiResponse");

exports.addmembership = async (req, res) => {
  
 const { plan_Id} =req.body
  const newMembership = new Membership({
    userId: req.params.userId,
    plan_Id: req.params.id,

  });
  const findexist = await Membership.findOne({$and:[{userId:req.params.userId},{plan_Id:req.params.id }]});
  console.log(findexist)
  if (findexist) {
    await Membership.findOneAndUpdate({
      $and :[
       
        {plan_Id: req.params.id}
      ]
    },
    {new :true}
    )
     resp.alreadyr(res);

  } else {
    newMembership
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.getmembershiplist = async (req, res) => {
    await Membership.find({userId:req.userId})
      .populate("userId")
      .populate("plan_Id")
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.viewone_mem_plan = async (req, res) => {
    await Membership.findOne({userId:req.userId}).sort({ createdAt:-1 }).populate("userId") .populate("plan_Id")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
// exports.addmembership = async(req,res)=>{
//  const {userid,plan_Id} = req.body
//  console.log(req.body)
// }