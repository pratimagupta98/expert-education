 const ReferEarn = require("../models/refer_earn");
  const resp = require("../helpers/apiResponse");
  const User = require("../models/user");


 exports.addrefer_earn = async (req, res) => {
    const {
        refer_from_id,
        refer_to_id,
        verify_code,
        membership,
        refer_redeem_status,
      
    } = req.body;
  
    const newReferEarn = new ReferEarn({
        refer_from_id: refer_from_id,
        refer_to_id: refer_to_id,
        verify_code:verify_code,
        refer_redeem_status: refer_redeem_status,
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
        await ReferEarn.find().populate("refer_from_id").populate("refer_to_id").populate("membership").populate({
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