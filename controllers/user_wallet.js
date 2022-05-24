const Userwallet = require("../models/user_wallet");
 const resp = require("../helpers/apiResponse");
 const User = require("../models/user");

exports.req_amount = async (req, res) => {
  const {
    userId,
    usd,
    inr,
      status,
    
  } = req.body;
  let wolwt= await Userwallet.findOne({userId:req.userId})
  console.log("11",wolwt)
  if(wolwt){
    let wolId=wolwt._id
    let amt=wolwt.amount
    console.log("old amt",amt)
  
  let qur=  await Userwallet.findOneAndUpdate(
      { _id: wolId },
      
      {$set: {usd:parseInt(req.body.usd),inr:parseInt(req.body.inr),status:"Pending"}} ,
    
    //{ $set: {status:"success"} },
    { new: true }
  
  );
  res.status(200).json({
    status: true,
    msg: "success",
    data: qur,
    // data: wolwt,
  
  })
  }

  else{

  const newUserwallet = new Userwallet({
    userId: req.userId,
    usd: usd,
    inr:inr,
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
  

  exports.admin_cnfm_amt = async (req, res) => {
    const {status,usd,inr} = req.body

    const getdata = await Userwallet.findOne({userId:req.userId}).sort({
      createdAt: 1,
    })
    console.log(getdata)
 
    if(getdata){
      let oldamt = getdata.amount
      console.log("amount",oldamt)
       reqamt = getdata.usd
        // if(reqsmt !==0)

      console.log("reqamt",reqamt)

      currntamt = oldamt + reqamt
      console.log(currntamt)
    }
 
    const findandUpdateEntry = await Userwallet.findOneAndUpdate(
    
      { userId: req.userId },
      
      { $set: {amount:currntamt,status:"Confirm"} },
      
    //     { amount: currntamt },
         
    // { $set: {status:"success"} },
    { new: true }
  )
 
  .then((data)=>{
    res.status(200).json({
        status : true,
        msg : "success",
        data : data,
        amount: currntamt, 
    })
}).catch((error)=>{
    res.status(400).json({
        status : false,
        error : "error",
        error : error
    })
})

}

 
exports.req_amt_list = async (req, res) => {
  await Userwallet.find({status:"Pending"}).populate("userId")
      
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};