 const ReferEarn = require("../models/refer_earn");
  const resp = require("../helpers/apiResponse");
  const User = require("../models/user");
  const Userwallet = require("../models/user_wallet");


 exports.addrefer_earn = async (req, res) => {
    const {
        refer_from_id,
        refer_to_id,
        verify_code,
        membership,
        status,
      
    } = req.body;
  
    const newReferEarn = new ReferEarn({
        refer_from_id: refer_from_id,
        refer_to_id: refer_to_id,
        verify_code:verify_code,
        status: status,
        membership:membership
       
    });
    
    const findexist = await ReferEarn.findOne({refer_to_id: refer_to_id 
      });
      if (findexist) {
        res.status(400).json({
          msg:"already"
        })
       }else{
        const findone = await User.findOne({ _id: req.body.refer_from_id });
        if(findone){
        console.log("STRING",findone)
        let  Code = findone?.referral_code
        console.log("RefereCode",Code)
        
     if(req.body.verify_code ==  Code ){ 
     newReferEarn
          .save()
         .then((data) => {
           res.status(200).json({
             status: true,
             msg: "success",
             data: data,
           });
         })
         .catch((error) => {
           res.status(200).json({
             status: false,
             msg: "error",
             error: error,
           });
         });
     }  else {
        res.status(200).json({
          status: false,
          msg: "Wrong Verify Code",
        });
      }
 
 }
}
       }
 
       exports.allrefer_earn = async (req, res) => {
        await ReferEarn.find({status:"Pending"}).populate("refer_from_id").populate("refer_to_id").populate("membership").populate({
          path: "membership",
          populate: {
            path: "userId",
          }
        })
        .populate({
          path: "membership",
          populate: {
            path: "plan_Id",
          }
        })
          .sort({ sortorder: 1 })
          .then((data) => resp.successr(res, data))
          .catch((error) => resp.errorr(res, error));
      };


      
      // exports.commission_add = async (req, res) => {
      //   const{amt} = req.body
      //   console.log(req.body)
     
      //   let currntamt=0;
      //   const getdata = await ReferEarn.findOne({_id:req.body.refer_from_id}).sort({
      //     createdAt: -1,
      //   })
      //   console.log(getdata)
      
      //   if(getdata){
      //     abc= getdata.walletId
      //     console.log(abc)
      //     let oldamt = getdata.amount
      //     console.log("amount",oldamt)
      //      reqamt = getdata.usd
      //      reqinr= getdata.inr
      //        if(reqamt !== 0){
      //         currntamt = oldamt + reqamt
      //         console.log("USD",currntamt)
      //        }
      //        else if(reqinr !==0 ){
      //         currntamt = oldamt + reqinr/75
      //         console.log("INR",currntamt)
      //        }
      
      //    // console.log("reqamt",reqamt)
      
      //     // currntamt = oldamt + reqamt
      //     // console.log(currntamt)
      //   }
      
      //   const findandUpdateEntry = await ReferEarn.findOneAndUpdate(
        
      //     { _id: req.params.id },
          
      //     { $set: {amount:currntamt,status:"Confirm"} },
          
      //   //     { amount: currntamt },
             
      //   // { $set: {status:"success"} },
      //   { new: true }
      // )
      
      // .then((data)=>{
      //   res.status(200).json({
      //       status : true,
      //       msg : "success",
      //       data : data,
      //       amount: currntamt, 
      //   })
      // }).catch((error)=>{
      //   res.status(400).json({
      //       status : false,
      //       error : "error",
      //       error : error
      //   })
      // })
      
      // }
      

      // exports.commission_add = async(req,res)=>{
        

      //  }



exports.commission_add = async (req, res) => {
  const {usd,inr} = req.body

  const getuser = await ReferEarn.findOne({ refer_from_id :req.params.id }).populate("refer_from_id")
    if(getuser){
        console.log(getuser)
     let  getwallet =getuser.refer_from_id
       
        console.log("STRING",getwallet)
       let getdata= getwallet.walletId
        console.log("ABC",getdata)
    }
    const getdata = await Userwallet.findOne({_id:req.params.id}).sort({
      createdAt: -1,

    })
    console.log("GETDATA",getdata)
    // const getd = await Userwallet.findOne({walletId :req.params.getdata})
    // console.log("aaaaa",getd)


    //  let currntamt=0;
    // if(getd){
    //    let oldamt = getd.amount
    //   console.log("amount",oldamt)
    //    reqamt = getdata.usd
    //    reqinr= getdata.inr
    //      if(reqamt !== 0){
    //       currntamt = oldamt + reqamt
    //       console.log("USD",currntamt)
    //      }
    //     }
  //   const findandUpdateEntry = await Userwallet.findOneAndUpdate(
    
  //     { _id: req.params.id },
      
  //     { $set: {amount:currntamt,status:"Confirm"} },
      
  //   //     { amount: currntamt },
         
  //   // { $set: {status:"success"} },
  //   { new: true }
  // )
 
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


