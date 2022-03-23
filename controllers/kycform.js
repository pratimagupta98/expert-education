const Kycform = require("../models/kycform");
const resp = require("../helpers/apiResponse");
const { uploadFile } = require("../helpers/awsuploader");
const fs = require("fs");


exports.addkycform = async (req, res) => {
  const { userid,gender, dob, nationality, aadhar_num,pan_num,driving_licence_num,passport_num } = req.body;


  const newKycform = new Kycform({
    userid:req.userId,
    gender: gender,
    dob: dob,
    nationality: nationality,
    aadhar_num: aadhar_num,
    pan_num: pan_num,
    driving_licence_num: driving_licence_num,
    passport_num: passport_num,
    //  pan_img:pan_img
  });

 // if (pan_num && req.files.pan_img) {
    // for (let i = 0; i < req.files.video_file.length; i++) {
    //   const getpdfurl = await uploadFile(
    //     req.files.pan_img[i]?.path,
    //     req.files.pan_img[i]?.filename,
    //     "jpg"
    //   );

    //   let videoObj = new Object();
    //   if (getpdfurl) {
    //     videoObj.pan_img = getpdfurl.Location;
    //     //fs.unlinkSync(`../uploads/${req.files.video_file[i]?.filename}`);
    //   }
    //   const getimgurl = await uploadFile(
    //     req.files.pan_img[i]?.path,
    //     req.files.pan_img[i]?.filename,
    //     "jpg"
    //   );
    //   if (getimgurl) {
    //     pan_img = getimgurl.Location;
    //     //fs.unlinkSync(`../uploads/${req.files.video_image[i]?.filename}`);
    //   }
    //   // newCourse.video_link[i] = videoObj;
    // }



    // if (req.files.pan_img) {
    //   console.log(req.files);
    //   if (req.files.pan_img) {
    //     const geturl = await uploadFile(
    //       req.files.pan_img[0]?.path,
    //       req.files.pan_img[0]?.filename,
    //       "jpg"
    //     );
    //     if (geturl) {
    //       newKycform.pan_img = geturl.Location;
    //       //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
    //     }
    
    //   }

    // if (req.files) {
    //   console.log(req.files);
    //   if (req.files.pan_img) {
    //     const geturl = await uploadFile(
    //       req.files.pan_img[0]?.path,
    //       req.files.pan_img[0]?.filename,
    //       "jpg"
    //     );
    //     if (geturl) {
    //       newCourse.pan_img = geturl.Location;
    //       //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
    //     }
    //   }
if(req.files.front_img){
        console.log(req.files)
        if(req.files.front_img){
            const geturl = await uploadFile(
                req.files.front_img[0]?.path,
                req.files.front_img[0]?.filename,
                "jpg"
              );
              if (geturl) {
                newKycform.front_img = geturl.Location;
                //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
        }
    }
    if(req.files.back_img){
      console.log(req.files)
      if(req.files.back_img){
          const geturl = await uploadFile(
              req.files.back_img[0]?.path,
              req.files.back_img[0]?.filename,
              "jpg"
            );
            if (geturl) {
              newKycform.back_img = geturl.Location;
              //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
  }
  if(req.files.selfie_img){
    console.log(req.files)
    if(req.files.selfie_img){
        const geturl = await uploadFile(
            req.files.selfie_img[0]?.path,
            req.files.selfie_img[0]?.filename,
            "jpg"
          );
          if (geturl) {
            newKycform.selfie_img = geturl.Location;
            //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
    }
}

    newKycform
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}
}
}

exports.verifykyc = async (req, res) => {
  await Kycform.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: {status:true} },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.editkycform = async (req, res) => {
  await Kycform.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewonekycform = async (req, res) => {
  await Kycform.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allkycform = async (req, res) => {
  await Kycform.find().populate("userid")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletekycform = async (req, res) => {
  await Kycform.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
