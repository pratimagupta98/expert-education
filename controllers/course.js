const Course = require("../models/course");
const resp = require("../helpers/apiResponse");
const { uploadFile } = require("../helpers/awsuploader");
const fs = require("fs");

exports.addcourse = async (req, res) => {
  const { course_title, desc, long_desc, category_id, video_id, pdf_id } =
    req.body;

  const findexist = await Course.findOne({ course_title: course_title });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    const newCourse = new Course({
      course_title: course_title,
      desc: desc,
      long_desc: long_desc,
      teacher: req.staffId,
      category_id: category_id,
      video_id: video_id,
      pdf_id: pdf_id,
    });

    if (req.files) {
      console.log(req.files);
      if (req.files.course_image) {
        const geturl = await uploadFile(
          req.files.course_image[0]?.path,
          req.files.course_image[0]?.filename,
          "jpg"
        );
        if (geturl) {
          newCourse.course_image = geturl.Location;
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
          newCourse.pdf[i] = pdfObj;
        }
      }
      if (req.files.video_file && req.files.video_image) {
        for (let i = 0; i < req.files.video_file.length; i++) {
          const getpdfurl = await uploadFile(
            req.files.video_file[i]?.path,
            req.files.video_file[i]?.filename,
            "mp4"
          );

          let videoObj = new Object();
          if (getpdfurl) {
            videoObj.video_file = getpdfurl.Location;
            //fs.unlinkSync(`../uploads/${req.files.video_file[i]?.filename}`);
          }
          const getimgurl = await uploadFile(
            req.files.video_image[i]?.path,
            req.files.video_image[i]?.filename,
            "jpg"
          );
          if (getimgurl) {
            videoObj.video_image = getimgurl.Location;
            //fs.unlinkSync(`../uploads/${req.files.video_image[i]?.filename}`);
          }
          newCourse.video_link[i] = videoObj;
        }
      }
      newCourse
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    } else {
      newCourse
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
  }
};

exports.addcoursebyadmin = async (req, res) => {
  const { course_title, desc, teacher, category } = req.body;

  const findexist = await Course.findOne({ course_title: course_title });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    const newCourse = new Course({
      course_title: course_title,
      desc: desc,

      teacher: teacher,
      category: category,
    });

    if (req.files) {
      console.log(req.files);
      if (req.files.course_image) {
        const geturl = await uploadFile(
          req.files.course_image[0]?.path,
          req.files.course_image[0]?.filename,
          "jpg"
        );
        if (geturl) {
          newCourse.course_image = geturl.Location;
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
          newCourse.pdf[i] = pdfObj;
        }
      }
      if (req.files.video_file && req.files.video_image) {
        for (let i = 0; i < req.files.video_file.length; i++) {
          const getpdfurl = await uploadFile(
            req.files.video_file[i]?.path,
            req.files.video_file[i]?.filename,
            "mp4"
          );

          let videoObj = new Object();
          if (getpdfurl) {
            videoObj.video_file = getpdfurl.Location;
            //fs.unlinkSync(`../uploads/${req.files.video_file[i]?.filename}`);
          }
          const getimgurl = await uploadFile(
            req.files.video_image[i]?.path,
            req.files.video_image[i]?.filename,
            "jpg"
          );
          if (getimgurl) {
            videoObj.video_image = getimgurl.Location;
            //fs.unlinkSync(`../uploads/${req.files.video_image[i]?.filename}`);
          }
          newCourse.video_link[i] = videoObj;
        }
      }
      newCourse
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    } else {
      newCourse
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
  }
};

exports.editcourse = async (req, res) => {
  await Course.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewonecourse = async (req, res) => {
  await Course.findOne({ _id: req.params.id })
    .populate("teacher")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewonecoursep = async (req, res) => {
  const coursedetail = await Course.findOne({ _id: req.params.id });
  if (coursedetail) {
    //console.log(coursedetail.popularity)
    let increment = coursedetail.popularity + 1;
    await Course.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: { popularity: increment } },
      { new: true }
    )
      .populate("teacher")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.allcourse = async (req, res) => {
  await Course.find()
    .sort({ popularity: 1 })
    .populate("teacher")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.mycourses = async (req, res) => {
  await Course.find({ teacher: req.staffId })
    .sort({ popularity: 1 })
    .populate("teacher")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allcoursebyrecent = async (req, res) => {
  await Course.find()
    .sort({ createdAt: 1 })
    .populate("teacher")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletecourse = async (req, res) => {
  await Course.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.countcourse = async (req, res) => {
  await Course.countDocuments()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
