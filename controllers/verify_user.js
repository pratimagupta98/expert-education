const Verifycode =  require("../models/verify_user");
const User = require("../models/user");

exports.verify_user = async (req, res) => {
  // const {product}   = req.body
   const findone = await User.findOne({offer_code: req.params.id }).populate("product")
  // console.log(findone)
   
      // console.log("coupon valid");
      if(findone){
       res.status(200).json({
         status: true,
         msg: "coupon valid",
         data:findone,
         discount_amount: findone?.amount,
       });
     }  else {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    }
}
   
    

  //console