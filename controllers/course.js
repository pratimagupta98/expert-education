const Course = require("../models/course");
const resp = require("../helpers/apiResponse");
const { uploadFile } = require("../helpers/awsuploader");
//const findOrCreate = require('mongoose-find-or-create');
const fs = require("fs");

exports.addcourse = async (req, res) => {
  const {
    course_title,
    desc,
    long_desc,
    category_id,
    teacher,
    posterimg,
    course_type,
  } = req.body;

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
      posterimg: posterimg,

      course_type: course_type,
    });
    //con
    if (req.files) {
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
      // if (req.files.posterimg) {
      //   const geturl = await uploadFile(
      //     req.files.posterimg[0]?.path,
      //     req.files.posterimg[0]?.filename,
      //     "jpg"
      //   );
      //   if (geturl) {
      //     newCourse.posterimg = geturl.Location;
      //     //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      //   }
      // }
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
  //}
};

exports.addcoursebyadmin = async (req, res) => {
  const {
    course_title,
    desc,
    teacher,
    category_id,
    long_desc,
    posterimg,
    course_type,
  } = req.body;

  const findexist = await Course.findOne({ course_title: course_title });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    const newCourse = new Course({
      course_title: course_title,
      desc: desc,
      long_desc: long_desc,
      teacher: teacher,
      category_id: category_id,
      posterimg: posterimg,

      course_type: course_type,
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
      if (req.files.posterimg) {
        const geturl = await uploadFile(
          req.files.posterimg[0]?.path,
          req.files.posterimg[0]?.filename,
          "jpg"
        );
        if (geturl) {
          newCourse.posterimg = geturl.Location;
          //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
        }
      }
      // if (req.files.pdf_file && req.files.pdf_image) {
      //   for (let i = 0; i < req.files.pdf_file.length; i++) {
      //     const getpdfurl = await uploadFile(
      //       req.files.pdf_file[i]?.path,
      //       req.files.pdf_file[i]?.filename,
      //       "pdf"
      //     );

      //     let pdfObj = new Object();
      //     if (getpdfurl) {
      //       pdfObj.pdf_file = getpdfurl.Location;
      //       //fs.unlinkSync(`../uploads/${req.files.pdf_file[i]?.filename}`);
      //     }
      //     const getimgurl = await uploadFile(
      //       req.files.pdf_image[i]?.path,
      //       req.files.pdf_image[i]?.filename,
      //       "jpg"
      //     );
      //     if (getimgurl) {
      //       pdfObj.pdf_image = getimgurl.Location;
      //       //fs.unlinkSync(`../uploads/${req.files.pdf_image[i]?.filename}`);
      //     }
      //     newCourse.pdf[i] = pdfObj;
      //   }
      // }
      // if (req.files.video_file && req.files.video_image) {
      //   for (let i = 0; i < req.files.video_file.length; i++) {
      //     const getpdfurl = await uploadFile(
      //       req.files.video_file[i]?.path,
      //       req.files.video_file[i]?.filename,
      //       "mp4"
      //     );

      //     let videoObj = new Object();
      //     if (getpdfurl) {
      //       videoObj.video_file = getpdfurl.Location;
      //       //fs.unlinkSync(`../uploads/${req.files.video_file[i]?.filename}`);
      //     }
      //     const getimgurl = await uploadFile(
      //       req.files.video_image[i]?.path,
      //       req.files.video_image[i]?.filename,
      //       "jpg"
      //     );
      //     if (getimgurl) {
      //       videoObj.video_image = getimgurl.Location;
      //       //fs.unlinkSync(`../uploads/${req.files.video_image[i]?.filename}`);
      //     }
      //     newCourse.video_link[i] = videoObj;
      //   }
      // }
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
  console.log("enter");
  const {
    course_title,
    desc,
    teacher,
    category_id,
    long_desc,
    course_type,
    course_image,
  } = req.body;
  data = {};
  if (course_title) {
    data.course_title = course_title;
  }
  if (desc) {
    data.desc = desc;
  }
  if (teacher) {
    data.teacher = teacher;
  }
  if (category_id) {
    data.category_id = category_id;
  }
  if (long_desc) {
    data.long_desc = long_desc;
  }
  if (course_type) {
    data.course_type = course_type;
  }
  if (req.files) {
    console.log(req.files);
    if (req.files.course_image) {
      const geturl = await uploadFile(
        req.files.course_image[0]?.path,
        req.files.course_image[0]?.filename,
        "jpg"
      );
      if (geturl) {
        data.course_image = geturl.Location;
        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }
    if (req.files.posterimg) {
      const geturl = await uploadFile(
        req.files.posterimg[0]?.path,
        req.files.posterimg[0]?.filename,
        "jpg"
      );
      if (geturl) {
        data.posterimg = geturl.Location;
        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }
  }
  if (data) {
    await Course.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.editcoursebystaff = async (req, res) => {
  await Course.findOneAndUpdate(
    {
      _id: req.staffId,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewonecourse = async (req, res) => {
  await Course.findOne({
    $or: [{ teacher: req.staffId }, { _id: req.params.id }],
  })
    //_id: req.params.id }

    .populate("teacher")
    .populate("category_id")
    .populate("video_id")
    .populate("pdf_id")
    .populate([{ path: "videolist" }])
    .populate([{ path: "pdflist" }])
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
      .populate([{ path: "videolist" }])
      .populate([{ path: "pdflist" }])
      .populate("category_id")
      .populate("video_id")
      .populate("pdf_id")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.allcourse = async (req, res) => {
  await Course.find()
    .sort({ popularity: 1 })
    .populate("teacher")
    .populate("category_id")
    //.populate("video_id")
    .populate([{ path: "videolist" }])
    .populate([{ path: "pdflist" }])
    .populate("pdf_id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.mycourses = async (req, res) => {
  await Course.find({ teacher: req.staffId })
    .sort({ popularity: 1 })
    .populate("teacher")
    .populate("category_id")
    .populate("video_id")
    .populate("pdf_id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allcoursebyrecent = async (req, res) => {
  await Course.find()
    .sort({ createdAt: 1 })
    .populate("teacher")
    .populate("category_id")
    .populate("video_id")
    .populate("pdf_id")
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
  await Course.countDocuments({ staffId: req.staffId })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.coursebytitle = async (req, res) => {
  const findall = await Course.find({ video_id: req.params.id })
    // .populate("teacher")
    //   .populate("category_id")
    //    .populate("video_id")
    //    .populate("pdf_id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updatecourse = async (req, res) => {
  // console.log("enter");
  // const { course_title, desc, teacher, category_id, long_desc } = req.body;
  // data = {};
  // if (course_title) {
  //   data.course_title = course_title;
  // }
  // if (desc) {
  //   data.desc = desc;
  // }
  // if (teacher) {
  //   data.teacher = teacher;
  // }
  // if (category_id) {
  //   data.category_id = category_id;
  // }
  // // if (long_desc) {
  // //   data.long_desc = long_desc;
  // // }
  // // if (req.files) {
  // //   console.log(req.files);
  // //   if (req.files.course_image) {
  // //     const geturl = await uploadFile(
  // //       req.files.course_image[0]?.path,
  // //       req.files.course_image[0]?.filename,
  // //       "jpg"
  // //     );
  // //     if (geturl) {
  // //       data.course_image = geturl.Location;
  // //       //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
  // //     }
  // //   }

  // if (data) {
  const findandUpdateEntry = await Course.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: data },
    { new: true }
  );

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
  //}
};
//};

exports.coursebytitle = async (req, res) => {
  const findall = await Course.find({ course_title: req.params.id })
    .populate("teacher")
    .populate("category_id")
    .populate("video_id")
    .populate("pdf_id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allcoursefree = async (req, res) => {
  await Course.find({ course_type: "Free" })
    .sort({ popularity: 1 })
    .populate("teacher")
    .populate("category_id")
    //.populate("video_id")
    .populate([{ path: "videolist" }])
    .populate([{ path: "pdflist" }])
    .populate("pdf_id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.searchcourse = async (req, res) => {
  const { course } = req.body;
  const findall = await Course.find({
    course_title: { $regex: course, $options: "i" },
  });

  if (findall) {
    let somearray = [];
    findall.forEach((i) => {
      somearray.indexOf(i.course_title) === -1
        ? somearray.push(i.course_title)
        : console.log("already exists");
      //console.log(i)
    });
    console.log(somearray);

    let getname = async () => {
      await Course.find({ course_title: { $in: somearray } }).then((data1) => {
        res.status(200).json({
          status: true,
          data: data1,
        });
      });
    };
    getname();
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};
