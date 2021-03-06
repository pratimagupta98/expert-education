const Userwallet = require("../models/user_wallet");
 const resp = require("../helpers/apiResponse");
 const User = require("../models/user");
 const { uploadFile } = require("../helpers/awsuploader");
 const fs = require("fs");
const { Console } = require("console");
const ReferEarn = require("../models/refer_earn");
const { uploadBase64ImageFile } = require("../helpers/awsuploader");
var signatures = {
  JVBERi0: "application/pdf",
  R0lGODdh: "image/gif",
  R0lGODlh: "image/gif",
  iVBORw0KGgo: "image.png",
  "/9j/": "image.jpg"
};

function detectMimeType(b64) {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}
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
  if (screenshot) {
    if (screenshot) {
      

      const base64Data = new Buffer.from(screenshot.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      detectMimeType(base64Data);
      const type = detectMimeType(screenshot);
      // console.log(newCourse,"@@@@@");
      const geturl = await uploadBase64ImageFile(
        base64Data,
        newUserwallet.id,
       type
      );
      console.log(geturl,"&&&&");
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



// exports.commission_dedoyrr = async (req, res) => {
//   const {usd,inr} = req.body

//   const getuser = await ReferEarn.findOne({ refer_from_id :req.params.walletId }).populate("refer_from_id")
//     if(getuser){
//         console.log(getuser)
//      let  getwallet =getuser.refer_from_id
       
//         console.log("STRING",getwallet)
//         let getdatas= getwallet.walletId
//       console.log("ABC",getdata)
//     }
// //     const getdata = await Userwallet.findOne({_id:req.params.id}).sort({
// //       createdAt: -1,
// //     })
// //     console.log("GETDATA",getdata)
// //      let currntamt=0;
// //     if(getdata){
// //        let oldamt = getdata.amount
// //       console.log("amount",oldamt)
// //        reqamt = getdata.usd
// //        reqinr= getdata.inr
// //          if(reqamt !== 0){
// //           currntamt = oldamt + reqamt
// //           console.log("USD",currntamt)
// //          }
// //         }
// //     const findandUpdateEntry = await Userwallet.findOneAndUpdate(
    
// //       { _id: req.params.id },
      
// //       { $set: {amount:currntamt,status:"Confirm"} },
      
// //     //     { amount: currntamt },
         
// //     // { $set: {status:"success"} },
// //     { new: true }
// //   )
 
// //   .then((data)=>{
// //     res.status(200).json({
// //         status : true,
// //         msg : "success",
// //         data : data,
// //         amount: currntamt, 
// //     })
// // }).catch((error)=>{
// //     res.status(400).json({
// //         status : false,
// //         error : "error",
// //         error : error
// //     })
// // })

// }



exports.commission_dedoyrr = async (req, res) => {
  const { usd} = req.body;

  // const getuser = await ReferEarn.findOne({ refer_from_id :req.params.id }).populate("refer_from_id")
  // console.log("GETUSER",getuser)
  // if(getuser){
  //     console.log(getuser)
  //  let  getwallet =getuser.refer_from_id
     
  //     console.log("STRING",getwallet)
  //    let getdatass= getwallet.walletId
  //     console.log("ABC",getdatass)


      const newnewUserwallet = new Userwallet({
         usd:usd
      })

      const getuser = await ReferEarn.findOne({ refer_from_id :req.params.id }).populate("refer_from_id")
      console.log("GETUSER",getuser)
      if(getuser){
          console.log(getuser)
       let  getwallet =getuser.refer_from_id
         
          console.log("STRING",getwallet)
         let getdatass= getwallet.walletId
          console.log("ABC",getdatass)
      if(getdatass){
        const getdata = await Userwallet.findOne({_id :req.body.walletId})
      }
    // .save()
  //     amt = getdatass.amount
  //   console.log("AMT",amt)
  // if(getdatass){
  //   console.log("datasss",getdatass)
  //   let oldamt = getdatass.amount
  //   console.log("amount",oldamt)
  //    reqamt = getdatass.usd
  //    reqinr= getdatass.inr
  //      if(reqamt !== 0){
  //       currntamt = oldamt + reqamt
  //       console.log("USD",currntamt)
  //      }
  //      else if(reqinr !==0 ){
  //       currntamt = oldamt + reqinr/75
  //       console.log("INR",currntamt)
  //      }

   // console.log("reqamt",reqamt)

    // currntamt = oldamt + reqamt
    // console.log(currntamt)
 // }
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

  // const getdata = await Userwallet.findOne({_id:req.params.id}).sort({
  //   createdAt: -1,
  // })
  // console.log("GETDATA",getdata)
  //  let currntamt=0;
  // if(getdata){
  //    let oldamt = getdata.amount
  //   console.log("amount",oldamt)
  //    reqamt = getdata.usd
  //    reqinr= getdata.inr
  //      if(reqamt !== 0){
  //       currntamt = oldamt + reqamt
  //       console.log("USD",currntamt)
  //      }
  //     }
  // const newAdminWallet = new AdminWallet({
  //   //customer: customer,
  //   walletId:walletId,
  //   //walletId: uuidv4(),
  //   add_amount: add_amount,
  //   status:status
    
    
  // });
  

  // const getdata = await ReferEarn.findOne({refer_from_id :req.params.userId})
  // console.log("Getdata",getdata)
  // let currntamt=0;

  // if(getdata){
  //   let oldamt = getdata.amount
  //     console.log("amout",oldamt)
 
  //        currntamt = parseInt(oldamt)+ parseInt(req.body.add_amount)
  //     console.log("Result",currntamt)
  //   }
  
  // const findandUpdateEntry = await Userwallet.findOneAndUpdate(
    
  //     { _id: req.body.walletId },
      
  //     { $set: {amount:currntamt,status:"success"} },
      
    //     { amount: currntamt },
         
    // { $set: {status:"success"} },
  //   { new: true }
  // );
 
//   newAdminWallet.save().then((data)=>{
//     res.status(200).json({
//         status : true,
//         msg : "success",
//         data : data,
//         amount: currntamt, 
//     })
// }).catch((error)=>{
//     res.status(400).json({
//         status : false,
//         error : "error",
//         error : error
//     })
// })


