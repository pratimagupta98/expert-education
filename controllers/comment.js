const Comment = require("../models/comment");
const resp = require("../helpers/apiResponse");

exports.addcommentbystudent = async (req, res) => {
  const { comment, user_id, cource_Id } = req.body;

  // const salt = await bcrypt.genSalt(10);
  //const hashPassword = await bcrypt.hash(password, salt);

  const newComment = new Comment({
    comment: comment,
   // cource_Id: req.params.id,
   cource_Id:cource_Id,
    user_id: req.userId,
  });

  //const findexist = await User.findOne({ comment: comment });

  newComment
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.allComment = async (req, res) => {
  await Comment.find({cource_Id: req.params.id})
    .populate("cource_Id")
    .populate("user_id")
    .populate("staff_id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.viewoneComment = async (req, res) => {
  await Comment.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.addcommentbyteachar = async (req, res) => {
  const { comment, staff_id, cource_Id } = req.body;

  // const salt = await bcrypt.genSalt(10);
  //const hashPassword = await bcrypt.hash(password, salt);

  const newComment = new Comment({
    comment: comment,
    cource_Id: cource_Id,
    staff_id: req.staffId,
  });

  //const findexist = await User.findOne({ comment: comment });

  newComment
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.getcommentby_student = async (req, res) => {
  await Comment.find({$and: [{ user_id: req.userId }, { cource_Id: req.params.id }], })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

 