const enrollStudent = require("../models/enrollStudent");
const Plan = require("../models/plan");
const resp = require("../helpers/apiResponse");

exports.addenrollStudent = async (req, res) => {
  const { plan_Id, course_Id, student_Id } = req.body;

  let p = await Plan.find({ _id: req.body.plan_Id });
  console.log(p);
  if (p) {
    var plan = p.map(function (value) {
      return value.plantitle;
    });
    console.log(plan);
  } else {
    resp.successr(res, "you have no any plan");
  }
  if (plan == "Plan 1") {
    console.log("1", plan);
    let p1 = await enrollStudent.countDocuments({
      student_Id: req.body.student_Id,
    });

    console.log(p1);
    if (p1 >= 1) {
      console.log(p);
      resp.successr(res, "you canot enrolles more then one course");
    } else {
      const newenrollStudent = new enrollStudent({
        plan_Id: plan_Id,
        student_Id: student_Id,
        course_Id: course_Id,
      });

      newenrollStudent
        .save()
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    }
  }
  if (plan == "Plan 2") {
    console.log("2", plan);
    let p2 = await enrollStudent.countDocuments({
      student_Id: req.body.student_Id,
    });
    if (p2 >= 2) {
      console.log(p2);
      resp.successr(res, "you cant enrolles more then two course");
    } else {
      let coursebook = await enrollStudent.findOne({
        $and: [
          { student_Id: req.body.student_Id },
          { course_Id: req.body.course_Id },
        ],
      });
      if (coursebook) {
        resp.successr(res, "you dont enrolles again this course");
      } else {
        const newenrollStudent = new enrollStudent({
          plan_Id: plan_Id,
          student_Id: student_Id,
          course_Id: course_Id,
        });

        newenrollStudent
          .save()
          .then((data) => resp.successr(res, data))
          .catch((error) => resp.errorr(res, error));
      }
    }
  }
  if (plan == "Plan 3") {
    console.log("3", plan);
    let p3 = await enrollStudent.countDocuments({
      student_Id: req.body.student_Id,
    });
    if (p3 >= 5) {
      console.log(p3);
      resp.successr(res, "you cant enrolles more then five  course");
    } else {
      let coursebook = await enrollStudent.findOne({
        $and: [
          { student_Id: req.body.student_Id },
          { course_Id: req.body.course_Id },
        ],
      });
      if (coursebook) {
        resp.successr(res, "you dont enrolles again this course");
      }
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
    }
  }
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
    .populate("plan_Id")
    .populate("course_Id")
    .populate("student_Id")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deleteenrollStudent = async (req, res) => {
  await enrollStudent.remove();
  await enrollStudent
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.Studentenroll_couses = async (req, res) => {
  await enrollStudent
    .find({ student_Id: req.userId }).populate("plan_Id").populate("course_Id").populate("student_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
