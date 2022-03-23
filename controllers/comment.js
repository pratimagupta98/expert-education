const Comment = require("../models/Comment");
const resp = require("../helpers/apiResponse");

exports.addcomment = async (req, res) => {
  const { comment, user_id } = req.body;

  // const salt = await bcrypt.genSalt(10);
  //const hashPassword = await bcrypt.hash(password, salt);

  const newComment = new Comment({
    comment: comment,
    user_id: user_id,
  });

  //const findexist = await User.findOne({ comment: comment });

  newComment
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.allComment = async (req, res) => {
  await Comment.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.viewoneComment = async (req, res) => {
  await Comment.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
