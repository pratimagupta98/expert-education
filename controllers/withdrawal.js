const Withdrawal = require("../models/withdrawal");
const resp = require("../helpers/apiResponse");
  

exports.withdrawal = async(req,res)=>{
    const { bank_name,account_no,ifsc_code,amount,status}  = req.body

    const newWithdrawal = new Withdrawal({
        userId:req.userId,
        bank_name :bank_name,
        account_no:account_no,
        ifsc_code:ifsc_code,
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