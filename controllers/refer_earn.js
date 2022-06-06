// const ReferEarn = require("../models/refer_earn");
//  const resp = require("../helpers/apiResponse");


//  exports.addrefer_earn = async (req, res) => {
//     const {
//         refer_fromid,
//         refer_userid_level1,
//         refer_level1_amt,
//         refer_userid_level2,
//         refer_level_amt2,
//         refer_userid_level3,
//         refer_level_amt3,
//         status,
       
//     } = req.body;
  
//     const newRole = new Role({
//         refer_fromid: refer_fromid,
//         refer_userid_level1: refer_userid_level1,
//         refer_level1_amt:refer_level1_amt,
//         refer_userid_level2:refer_userid_level2,
//         refer_level_amt2:refer_level_amt2,
//         refer_userid_level3:refer_userid_level3,
//         refer_level_amt3:refer_level_amt3,
//         total_refer_amt:total_refer_amt,
//         status: status,
       
//     });
   
//       newRole
//         .save()
//         .then((data) => resp.successr(res, data))
//         .catch((error) => resp.errorr(res, error));
//     }
  