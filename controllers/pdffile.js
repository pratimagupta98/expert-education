const Pdffile = require("../models/pdffile");
const resp = require("../helpers/apiResponse");
const { uploadFile } = require("../helpers/awsuploader");
const { uploadBase64ImageFile } = require("../helpers/awsuploader");

const fs = require("fs");
var signatures = {
  JVBERi0: "application/pdf",
  R0lGODdh: "image/gif",
  R0lGODlh: "image/gif",
  iVBORw0KGgo: "image.png",
  "/9j/": "image.jpg"
};

function detectMimeType(b64) {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}

exports.addpdf = async (req, res) => {
  const { pdf_title, course,pdf_image } = req.body;

  // const newPdffile = new Pdffile({
  //   pdf_title: pdf_title,
  //  pdf_file : pdf_file

  // });

  const findexist = await Pdffile.findOne({
    pdf_title: pdf_title,

    // pdf_file: pdf_file,
    // pdf_image: pdf_image,
  });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    const newPdffile = new Pdffile({
      pdf_title: pdf_title,
      course: course,
      teacher: req.staffId,
      // pdf_file: pdf_file,
      pdf_image: pdf_image,

      //category: categoryId,
    });

    // if (req.files) {
    //   console.log(req.files);
    //   if (req.files.pdf_image) {
    //     const geturl = await uploadFile(
    //       req.files.pdf_image[0]?.path,
    //       req.files.pdf_image[0]?.filename,
    //       "jpg"
    //     );
    //     if (geturl) {
    //       newPdffile.pdf_image = geturl.Location;
    //       //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
    //     }
    //   }
    if (pdf_image) {
      if (pdf_image) {
        

        const base64Data = new Buffer.from(pdf_image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        detectMimeType(base64Data);
        const type = detectMimeType(pdf_image);
        // console.log(newCourse,"@@@@@");
        const geturl = await uploadBase64ImageFile(
          base64Data,
          newPdffile.id,
         type
        );
        console.log(geturl,"&&&&");
        if (geturl) {
          newPdffile.pdf_image = geturl.Location;
         
          //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
        }
      }

    
      if (req.files.pdf_file && req.files.pdf_image) {
        for (let i = 0; i < req.files.pdf_file.length; i++) {
          const getpdfurl = await uploadFile(
            req.files.pdf_file[i]?.path,
            req.files.pdf_file[i]?.filename,
            "pdf"
          );
          newPdffile.pdf_file[i] = getpdfurl.Location;
          // let pdfObj = new Object();
          // if (getpdfurl) {
          //   pdfObj.pdf_file = getpdfurl.Location;
          //   //fs.unlinkSync(`../uploads/${req.files.pdf_file[i]?.filename}`);
          // }
          const getimgurl = await uploadFile(
            req.files.pdf_image[i]?.path,
            req.files.pdf_image[i]?.filename,
            "jpg"
          );
          // if (getimgurl) {
          //   pdfObj.pdf_image = getimgurl.Location;
          //   //fs.unlinkSync(`../uploads/${req.files.pdf_image[i]?.filename}`);
          // }
          newPdffile.pdf_image[i] = getimgurl.Location;
        }
      }

      // } else {

      //   if(req.files){
      //       console.log(req.files);
      // //       // cloudinary.uploader.upload("my_picture.jpg", function(error, result) { console.log(result) });
      //    }

      newPdffile
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
  }
};

exports.addpdfbyadmin = async (req, res) => {
  const { pdf_title, course, teacher } = req.body;

  // const newPdffile = new Pdffile({
  //   pdf_title: pdf_title,
  //  pdf_file : pdf_file

  // });

  const findexist = await Pdffile.findOne({
    pdf_title: pdf_title,

    // pdf_file: pdf_file,
    // pdf_image: pdf_image,
  });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    const newPdffile = new Pdffile({
      pdf_title: pdf_title,
      course: course,
      teacher: teacher,
      // pdf_file: pdf_file,
      //pdf_image: pdf_image,

      //category: categoryId,
    });

    if (req.files) {
      console.log(req.files);
      if (req.files.pdf_image) {
        const geturl = await uploadFile(
          req.files.pdf_image[0]?.path,
          req.files.pdf_image[0]?.filename,
          "jpg"
        );
        if (geturl) {
          newPdffile.pdf_image = geturl.Location;
          //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
        }
      }
      if (req.files.pdf_file && req.files.pdf_image) {
        for (let i = 0; i < req.files.pdf_file.length; i++) {
          const getpdfurl = await uploadFile(
            req.files.pdf_file[i]?.path,
            req.files.pdf_file[i]?.filename,
            "pdf"
          );

          let pdfObj = new Object();
          if (getpdfurl) {
            pdfObj.pdf_file = getpdfurl.Location;
            //fs.unlinkSync(`../uploads/${req.files.pdf_file[i]?.filename}`);
          }
          const getimgurl = await uploadFile(
            req.files.pdf_image[i]?.path,
            req.files.pdf_image[i]?.filename,
            "jpg"
          );
          if (getimgurl) {
            pdfObj.pdf_image = getimgurl.Location;
            //fs.unlinkSync(`../uploads/${req.files.pdf_image[i]?.filename}`);
          }
          newPdffile.pdf[i] = pdfObj;
        }
      }

      // } else {

      //   if(req.files){
      //       console.log(req.files);
      // //       // cloudinary.uploader.upload("my_picture.jpg", function(error, result) { console.log(result) });
      //    }

      newPdffile
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
  }
};

exports.getpdf = async (req, res) => {
  await Pdffile.find()
    .populate("course")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletepdf = async (req, res) => {
  await Pdffile.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.viewonepdf = async (req, res) => {
  const findall = await Pdffile.findOne({ _id: req.params.id })
     
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};