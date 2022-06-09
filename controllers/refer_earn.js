 const ReferEarn = require("../models/refer_earn");
//  const resp = require("../helpers/apiResponse");


 exports.addrefer_earn = async (req, res) => {
    const {
        refer_fromid,
        refer_to_id,
        refer_amount,
        refer_reedam_status,
        
       
    } = req.body;
  
    const newRole = new Role({
        refer_fromid: refer_fromid,
        refer_to_id: refer_to_id,
        refer_amount:refer_amount,
        refer_reedam_status: refer_reedam_status
       
    });
   
      newRole
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
  