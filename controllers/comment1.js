const Comment1 = require("../models/comment1");
const resp = require("../helpers/apiResponse");

exports.addcomm = async (req, res) => {
  const { comment } = req.body;

  const newComment1 = new Comment1({
    comment: comment,
  });
  //const findexist = await Comment1.findOne({ comment: comment });
  // if (findexist) {
  //  resp.alreadyr(res);
  // } else {
  newComment1
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  // }
};
//zz
//nfdngb
