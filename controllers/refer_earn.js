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

      const getdata = await Userwallet.findOne({userId:req.body.refer_from_id}).sort({
        createdAt: -1,
      }).populate("userId")
      console.log("GET DATA",getdata)
      if(getdata){
       let  userid = getdata.userId
       console.log("USER",userid)
       let user_wallet = userid.walletId
       console.log("USER WALLET",user_wallet)


      
        let amt=getdata.amount
        console.log("old amt Mil Gya",amt)

        if(amt){
          let addamt = 2
          currntamt = amt + parseInt(addamt)
          console.log("CURRENT AMT",currntamt)
         }

         const getdatas = await Userwallet.findOne({userId:req.body.refer_from_id}).sort({
          createdAt: -1,
        }).populate("userId").sort({createdAt:-1})

         const findandUpdateEntry = await Userwallet.findOneAndUpdate(
    
          {userId: req.body.refer_from_id },
          
          {$set: {amount:currntamt}},
          
      
        { new: true }
      ).sort({createdAt:-1})
     console.log("Update Ho Gya",findandUpdateEntry)
     //console.log("paisa",findandUpdateEntry.amount)

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
     }
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


      
     

      exports.commission_add = async (req, res) => {
        const {usd} = req.body
        const newUserwallet = new Userwallet({
          usd:usd,
        });
        
        // const getuser = await ReferEarn.findOne({ refer_from_id :req.params.id }).populate("refer_from_id")
      
        //   if(getuser){
        //       console.log(getuser)
        //    let  getwallet =getuser.refer_from_id
             
        //       console.log("STRING",getwallet)
        //      let getdata= getwallet.walletId
        //       console.log("ABC",getdata)
        //   }
          const getdata = await Userwallet.findOne({userId:req.params.id}).sort({
            createdAt: -1})
          console.log("GETDATA",getdata)
                                                                                                        
          if(getdata){
            let oldamt = getdata.amount
              console.log("amout",oldamt)
             
                 currntamt = parseInt(oldamt)+parseInt(req.body.usd)
              console.log("Result",currntamt)
            }
          
          const findandUpdateEntry = await Userwallet.findOneAndUpdate(
            
              { userId: req.params.id },
              
              { $set: {amount:currntamt} },
              
            //     { amount: currntamt },
                 
            // { $set: {status:"success"} },
            { new: true }
          );
         console.log("updated",findandUpdateEntry)
          newUserwallet.save().then((data)=>{
            res.status(200).json({
                status : true,
                msg : "success",
                data : data,
                current_amt: currntamt, 
                wallet_amt:getdata.amount,
                userId :findandUpdateEntry.userId,
               
            })
        }).catch((error)=>{
            res.status(400).json({
                status : false,
                error : "error",
                error : error
            })
        })
        
        }

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
 
//   .then((data)=>{
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

// }


