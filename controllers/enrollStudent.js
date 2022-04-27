const enrollStudent = require("../models/enrollStudent");
const Plan = require("../models/plan");
const resp = require("../helpers/apiResponse");

exports.addenrollStudent = async (req, res) => {
  const { plan_Id, course_Id, student_Id } = req.body;
  //   let p = await Plan.find({ _id: req.body.plan_Id });
  //   console.log(p);
  //   if (p) {
  //     var plan = p.map(function (value) {
  //       return value.plantitle;
  //     });
  //     console.log(plan);
  // if (plan == "Plan 1") {
  //   console.log("11", plan);
  // }
  // if (plan == "Plan 2") {
  //   course_Id.length == 2;
  //   console.log("22", plan);
  // }
  // if (plan == "Plan 3") {
  //   course_Id.length == 5;
  // }
  const newenrollStudent = new enrollStudent({
    plan_Id: plan_Id,
    student_Id: student_Id,
    course_Id: course_Id,
  });

  newenrollStudent
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  //   } else {
  //     console.log("error");
  //   }
};

exports.editenrollStudent = async (req, res) => {
  await enrollStudent
    .findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewoneenrollStudent = async (req, res) => {
  await enrollStudent
    .findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allenrollStudent = async (req, res) => {
  await enrollStudent
    .find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteenrollStudent = async (req, res) => {
  await enrollStudent
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
