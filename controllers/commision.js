const Commission = require("../models/commision");
const resp = require("../helpers/apiResponse");
const Membership = require("../models/membership");
const ReferEarn = require("../models/refer_earn");


exports.add_commision = async (req, res) => {
    const {
        refer_earn,
        amount
    } = req.body;
    console.log(req.body)
    const getmembership = await ReferEarn.findOne({ id: req.body.refer_earn });
    if(getmembership){
        console.log(getmembership)
        refer_to =getmembership.refer_to_id
        console.log("STRING",refer_to)
    }
    const newCommission = new Commission({
        refer_earn: refer_earn,
        amount: amount,
    });

    
    // if(findone){
    // console.log("STRING",findone)
    // let  Code = findone?.referral_code
    // console.log("RefereCode",Code)
     
//}
}