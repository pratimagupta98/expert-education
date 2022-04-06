const Category = require("../models/category");
const Lavel = require("../models/lavel");
const resp = require("../helpers/apiResponse");
const fs = require("fs");
const { uploadFile } = require("../helpers/awsuploader");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addCat = async (req, res) => {
  const { catName } = req.body;

  const newCategory = new Category({
    catName: catName,
   });
  const findexist = await Category.findOne({ catName: catName });
  if (findexist) {
    resp.alreadyr(res);
  } else {
   
    if (req.files) {
      console.log(req.files);
      if (req.files.icon) {
        const geturl = await uploadFile(
          req.files.icon[0]?.path,
          req.files.icon[0]?.filename,
          "jpg"
        );
        if (geturl) {
          newCategory.icon = geturl.Location;
          //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
        }
      }
    newCategory
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}
};

exports.editCat = async (req, res) => {
  const{catName}=req.body
  data = {};
  if (catName) {
    data.catName = catName;
  }
  if (req.files) {
    console.log(req.files);
    if (req.files.icon) {
      const geturl = await uploadFile(
        req.files.icon[0]?.path,
        req.files.icon[0]?.filename,
        "jpg"
      );
      if (geturl) {
        data.icon = geturl.Location;
        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }
  }
  if (data) {
    console.log("data",data);
 let findandUpdateEntry = await Category.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    
    if (findandUpdateEntry) {
      res.status(200).json({
        status: true,
        msg: "success",
        data: findandUpdateEntry,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    }
  }
}




exports.viewoneCat = async (req, res) => {
  await Category.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allCat = async (req, res) => {
  await Category.find() .sort({ createdAt: -1 })

    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteCat = async (req, res) => {
  await Category.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.addCat = async (req, res) => {
  const { catName } = req.body;

  const newCategory = new Category({
    catName: catName,
   });
  const findexist = await Category.findOne({ catName: catName });
  if (findexist) {
    resp.alreadyr(res);
  } else {
   
    if (req.files) {
      console.log(req.files);
      if (req.files.icon) {
        const geturl = await uploadFile(
          req.files.icon[0]?.path,
          req.files.icon[0]?.filename,
          "jpg"
        );
        if (geturl) {
          newCategory.icon = geturl.Location;
          //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
        }
      }
    newCategory
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}
};




exports.addlavel = async (req, res) => {
  const { level } = req.body;

  const newlavel = new Lavel({
    
    level: level,
    ///fonk
   });
  const findexist = await Lavel.findOne({ level: level });
  if (findexist) {
    resp.alreadyr(res);
  } else {
   
    if (req.files) {
      console.log(req.files);
      if (req.files.icon) {
        const geturl = await uploadFile(
          req.files.icon[0]?.path,
          req.files.icon[0]?.filename,
          "jpg"
        );
        if (geturl) {
          newlavel.icon = geturl.Location;
          //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
        }
      }
      newlavel
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}
};

exports.deletelavel = async (req, res) => {
  await Lavel.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.allLavel = async (req, res) => {
  await Lavel.find() .sort({ createdAt: -1 })

    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};