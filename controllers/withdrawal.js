const Withdrawal = require("../models/withdrawal");
const resp = require("../helpers/apiResponse");
  

exports.withdrawal = async(req,res)=>{
    const { upi_Id,amount,status}  = req.body


    let length = 12;
    let transectionid = (
      "0".repeat(length) + Math.floor(Math.random() * 10 ** length)
    ).slice(-length);
    const newWithdrawal = new Withdrawal({
        userId:req.userId,
        transaction_Id:transectionid,
        upi_Id:upi_Id,
        amount:amount,
        status:status
    })

    newWithdrawal.save()
      .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
}

exports.withdrawal_list = async (req, res) => {
    await Withdrawal.find()
      .sort({ sortorder: 1 }).populate("userId")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.usdt_withdrawal = async(req,res)=>{
    const { userId,crpto_id,usdt_amt,status}  = req.body

    const newWithdrawal = new Withdrawal({
        userId:req.userId,
        crpto_id :crpto_id,
        usdt_amt:usdt_amt,
        status:status
         
    })

    newWithdrawal.save()
      .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
}


exports.pending_withdrwal = async (req, res) => {
  await  Withdrawal.find({status:"Pending"}).populate("userId")
      
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.confrm_withdrawal = async (req, res) => {
  await  Withdrawal.find({status:"Confirm"}).populate("userId")
      
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.cnfrm_withdrawal = async (req, res) => {
 
      await Withdrawal.findOneAndUpdate(
    
      { _id: req.params.id },
      
      { $set: {status:"Confirm"} },
      {new : true}
      
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.dltwithdrwal = async (req, res) => {
  await Withdrawal.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};