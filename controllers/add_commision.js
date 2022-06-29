const Commission = require("../models/add_commision");
const resp = require("../helpers/apiResponse");
const Membership = require("../models/membership");
const ReferEarn = require("../models/refer_earn");


// exports.add_commision = async (req, res) => {
//     const {
//         refer_earn,
//         amount
//     } = req.body;
//     console.log(req.body)
//     const getmembership = await ReferEarn.findOne({ id: req.body.refer_earn });
//     if(getmembership){
//         console.log(getmembership)
//         refer_to =getmembership.refer_to_id
//         console.log("STRING",refer_to)
//     }
//     const newCommission = new Commission({
//         refer_earn: refer_earn,
//         amount: amount,
//     });

    
//     // if(findone){
//     // console.log("STRING",findone)
//     // let  Code = findone?.referral_code
//     // console.log("RefereCode",Code)
     
// //}
// }



exports.add_commision = async (req, res) => {
  const {add_amount,refer_to_id } = req.body;

  const newCommission = new Commission({
    //customer: customer,
   // walletId:walletId,
    //walletId: uuidv4(),
    add_amount: add_amount,
    refer_to_id:refer_to_id
    
  });
  const getmembership = await ReferEarn.findOne({ refer_to_id: req.body.refer_to_id });
      if(getmembership){
          console.log("AAAA",getmembership)
         refer_to =getmembership.walletId
          console.log("STRING",refer_to)
      }
  const getdata = await Wallet.findOne({_id :req.body.walletId})
  console.log("Getdata",getdata)
  if(getdata){
    let oldamt = getdata.amount
      console.log("amout",oldamt)
     
         currntamt = parseInt(oldamt)+ parseInt(req.body.add_amount)
      console.log("Result",currntamt)
    }
  
  const findandUpdateEntry = await Wallet.findOneAndUpdate(
    
      { _id: req.body.walletId },
      
      { $set: {amount:currntamt,status:"success"} },
      
    //     { amount: currntamt },
         
    // { $set: {status:"success"} },
    { new: true }
  );
 
  newCommission.save().then((data)=>{
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