const Membership = require("../models/membership");
const resp = require("../helpers/apiResponse");
const Userwallet = require("../models/user_wallet");

const Plan = require("../models/plan");
exports.addmembership = async (req, res) => {
  
 const { plan_Id} =req.body
  const newMembership = new Membership({
    userId: req.params.userId,
    plan_Id: req.params.id,
     
  });

  
  const findexist = await Membership.findOne({$and:[{userId:req.params.userId},{plan_Id:req.params.id }]}).sort({createdAt:-1}).populate("plan_Id");
  console.log(findexist)
  
  if (findexist) {
  
//     const getamt =  await Plan.findOne({_id: req.params.id})
//     let planamt =getamt.amount
//     console.log("PLAN amt",planamt)
//     if(amt-planamt <=0 ){
//       resp.status( 401).json({
//         status:false,
//         msg:"Insufficient balance"
//       })
//     }else{
// let dedmucat=  await Userwallet.findOneAndUpdate(
//     {userId : req.params.userId},{
//       $set : {amount:amt-planamt}
//     },
  
//   {new :true}
//   ).sort({createdAt:-1})
//   console.log("Deducted",dedmucat)
//     }
//     await Membership.findOneAndUpdate({
//       _id:findexist._id
//     },{$set:{plan_Id:req.params.id}},
//     {new :true}
//     ).sort({createdAt:-1})
     resp.alreadyr(res);

  } else {
    
 
   
    const getdetails = await Userwallet.findOne({userId : req.params.userId}).sort({createdAt:-1})
    if(getdetails == null){
    res.status(401).json({
      status : false,
      message :"Insufficient balance"
    })
    }else{
             

      const getdetails = await Userwallet.findOne({userId : req.params.userId}).sort({createdAt:-1})
    
    console.log("Value",getdetails)
    let amt = getdetails.amount
    console.log("Wallet Amt",amt) 
    const getamt =  await Plan.findOne({_id: req.params.id})
    let planamt =getamt.amount
    console.log("PLAN amt",planamt)
    if(amt-planamt <=0 ){
            res.status( 401).json({
              status:false,
              message:"Insufficient balance"
            })
          }else{
      let dedmucat=  await Userwallet.findOneAndUpdate(
          {userId : req.params.userId},{
            $set : {amount:amt-planamt}
          },
        
        {new :true}
        ).sort({createdAt:-1})

  console.log("Deducted",dedmucat)
  
let qur = await Membership.findOne({userId:req.params.userId}).sort({createdAt:-1})
if(qur){
  await Membership.findOneAndUpdate({
    userId:req.params.userId
  },{$set:{plan_Id:req.params.id}},
  {new :true}
  ).sort({createdAt:-1})
  .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
}else{
    newMembership
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
}
  }
}
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

exports.admin_membershiplist = async (req, res) => {
  await Membership.find()
    .populate("userId")
    .populate("plan_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};