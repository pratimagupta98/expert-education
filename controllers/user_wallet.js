const Userwallet = require("../models/user_wallet");
 const resp = require("../helpers/apiResponse");
 const User = require("../models/user");

exports.reqInr_amount = async (req, res) => {
  const {
    userId,
    reqInramount,
      status,
    
  } = req.body;

  const newUserwallet = new Userwallet({
    userId: req.userId,
    reqInramount: reqInramount,
    status: status,
     
  });
  
  newUserwallet
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  

      let wolwt1= await User.findOne({_id:req.userId}).sort({createdAt:-1})
      console.log('cccc',wolwt1)
      if(wolwt1)
      {
    
        let wolwt= await Userwallet.findOne({userId:req.userId}) 
        let wolId=wolwt._id
        console.log(wolId)
        console.log("ttttt",wolwt)
      let qur=  await User.findOneAndUpdate(
          { _id: req.userId },
          
          {$set: {walletId:wolId}} ,
        
        //{ $set: {status:"success"} },
        { new: true }
      
      )
      }
};


exports.wallet_amount = async (req, res) => {
    const getdata = await Userwallet.findOne({userId:req.userId})
    .populate("userId")
    console.log(getdata)
   if(getdata){
  
  //    let oldamt = getdata.amount
  //    console.log("amout",oldamt)
    
  //     currntbalance = parseInt(oldamt)+ parseInt(req.body.amount)
  //    console.log("Result",currntbalance)
   
  
      
     // console.log(sum);
      //console.log(findone)
      res.status(200).json({
        status: true,
        msg: "success",
        data: getdata,
         // total: sum,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    }
  };
  