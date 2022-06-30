const Userwallet = require("../models/user_wallet");
 const resp = require("../helpers/apiResponse");
 const User = require("../models/user");
 const { uploadFile } = require("../helpers/awsuploader");
 const fs = require("fs");
const { Console } = require("console");

exports.req_amount = async (req, res) => {
  const {
    screenshot,
    userId,
    usd,
    inr,
    status,
    //transectionId
  } = req.body;

  let length = 12;
  let transectionid = (
    "0".repeat(length) + Math.floor(Math.random() * 10 ** length)
  ).slice(-length);

  let wolwt= await Userwallet.findOne({userId:req.userId}).sort({createdAt:-1})
  console.log("11",wolwt)
  if(wolwt){
    let wolId=wolwt._id
    let amt=wolwt.amount
    console.log("old amt",amt)

   const newUserwallet = new Userwallet({
    userId: req.userId,
    usd: usd,
    inr:req.body.inr,
    amount:amt,
    transectionId:transectionid,
    status: status,
     screenshot:screenshot
  });
  if (req.files) {
    console.log(req.files);
    if (req.files.screenshot) {
       const geturl = await uploadFile(
        req.files.screenshot[0]?.path,
        req.files.screenshot[0]?.filename,
        "jpg"
      );
    
      if (geturl) {
        newUserwallet.screenshot = geturl.Location;
        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }
  }
  newUserwallet
      .save()
      .then((data) => resp.successr(res, data))
      //  .catch((error) => resp.errorr(res, error));
  

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
  // let qur=  await Userwallet.findOneAndUpdate(
  //     { _id: wolId },
      
  //     {$set: {usd:req.body.usd,inr:req.body.inr,status:"Pending"}} ,
    
  //   //{ $set: {status:"success"} },
  //   { new: true }
  
  // )

  // console.log(qur)
  // res.status(200).json({
  //   status: true,
  //   msg: "success",
  //   data: qur,
  //   // data: wolwt,
  
  // }) 
  // }
  

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
      //  .catch((error) => resp.errorr(res, error));
  

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
    const getdata = await Userwallet.findOne({userId:req.userId}).sort({createdAt:-1})
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
     
    let currntamt=0;
    const getdata = await Userwallet.findOne({_id:req.params.id}).sort({
      createdAt: -1,
    })
    console.log(getdata)
 
    if(getdata){
      let oldamt = getdata.amount
      console.log("amount",oldamt)
       reqamt = getdata.usd
       reqinr= getdata.inr
         if(reqamt !== 0){
          currntamt = oldamt + reqamt
          console.log("USD",currntamt)
         }
         else if(reqinr !==0 ){
          currntamt = oldamt + reqinr/75
          console.log("INR",currntamt)
         }

     // console.log("reqamt",reqamt)

      // currntamt = oldamt + reqamt
      // console.log(currntamt)
    }
  
 
    const findandUpdateEntry = await Userwallet.findOneAndUpdate(
    
      { _id: req.params.id },
      
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
  await Userwallet.find({status:"Pending"}).populate("userId").sort({
    createdAt: -1,
  })
      
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.dlt_amtlist = async (req, res) => {
  await Userwallet.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.amt_cnfmlist = async (req, res) => {
  await Userwallet.find({status:"Confirm"}).populate("userId")
      
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.user_transaction_list = async (req, res) => {
  await Userwallet.find({$and: [{ userId: req.userId }, { status: "Confirm" }],}).populate("userId")
      
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};