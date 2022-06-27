const Commission = require("../models/commision");
const resp = require("../helpers/apiResponse");
const Membership = require("../models/membership");
const ReferEarn = require("../models/refer_earn");


exports.add_commision = async (req, res) => {
    const {
        refer_earn,
        amount
    } = req.body;

    const newReferEarn = new Commission({
        refer_earn: refer_earn,
        amount: amount,
    });

    const getmembership = await ReferEarn.findOne({ refer_to_id: req.body.refer_earn });
    if(getmembership){
        console.log(getmembership)
    }
    if(findone){
    console.log("STRING",findone)
    let  Code = findone?.referral_code
    console.log("RefereCode",Code)
     
}
}