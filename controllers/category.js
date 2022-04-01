const Category = require("../models/category");
const resp = require("../helpers/apiResponse");

exports.addCat = async (req, res) => {
  const { catName } = req.body;

  const newCategory = new Category({
    catName: catName,
   });
  const findexist = await Category.findOne({ catName: catName });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newCategory
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.editCat = async (req, res) => {
  await Category.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewoneCat = async (req, res) => {
  await Category.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allCat = async (req, res) => {
  await Category.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteCat = async (req, res) => {
  await Category.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
