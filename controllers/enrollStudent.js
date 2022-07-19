const enrollStudent = require("../models/enrollStudent");
const Plan = require("../models/plan");
const resp = require("../helpers/apiResponse");
const Course = require("../models/course");
const { findOne } = require("../models/course");
const User = require("../models/user");


exports.addenrollStudent = async (req, res) => {
  const { plan_Id, course_Id,teacher, student_Id,status } = req.body;

  let p = await Plan.find({ _id: req.body.plan_Id });
  console.log(p);
  if(p =="" || p== null){
    resp.errorr(res, "you have no any plan");
  }else{
    if (p) {
    var plan = p.map(function (value) {
      return value.plantitle;
    });
    

  if (plan == "Free") {
    console.log("0", plan);
    console.log(plan)
    let p0 = await Course.findOne({
    _id :req.body.course_Id
    });
    console.log("p0",p0)
   let typfr=  p0.course_type == "Free"
    console.log("p0....",typfr)
    if (typfr == true) {
      const newenrollStudent = new enrollStudent({
        plan_Id: plan_Id,
        student_Id:req.userId,
        course_Id: course_Id,
        teacher:teacher
      });
      newenrollStudent
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error))

      let getdata= await User.findOne({_id:req.userId})
      console.log("DATA",getdata)
      if(getdata){
      let update=  await User.findOneAndUpdate(
        { _id: req.userId },
        
        {$set: {status:"Enroll"}} ,
      
      //{ $set: {status:"success"} },
      { new: true }
    
    );
      }
    }else{
res.status(400).json({
  status:false,
  msg :"Course not free"
})
    }     
    }

  if (plan == "Plan 1") {
    console.log("1", plan);
    let p1 = await enrollStudent.countDocuments({
      student_Id: req.userId,
    });

    console.log("AAAA",p1);
    let coursebook = await enrollStudent.findOne({
      $and: [
        { student_Id:req.userId },
        { course_Id: req.body.course_Id },
      ],
    });
    if (coursebook) {
      resp.alreadyr(res, "you don't enrolles again this course");
    } else{

    if (p1 >= 1) {
      console.log(p);
      resp.errorr(res, "you can't enrolles more then one course");
    } 

      else{
      const newenrollStudent = new enrollStudent({
        plan_Id: plan_Id,
        student_Id:req.userId,
        course_Id: course_Id,
        teacher:teacher
      });

      newenrollStudent
        .save()
        .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error))
       let getdata= await User.findOne({_id:req.userId})
       console.log("DATA",getdata)
       if(getdata){
       let update=  await User.findOneAndUpdate(
         { _id: req.userId },
         
         {$set: {status:"Enroll"}} ,
       
       //{ $set: {status:"success"} },
       { new: true }
     
     );
       }
    }
  }
  }
  if (plan == "Plan 2") {
    console.log("2", plan);
    let p2 = await enrollStudent.countDocuments({
      student_Id: req.userId,
    });

    console.log("STRING",p2)
    if (p2 >= 2) {
      console.log(p2);
      resp.errorr(res, "you can't enrolles more then two course");
    } else {
      let coursebook = await enrollStudent.findOne({
        $and: [
          { student_Id:req.userId },
          { course_Id: req.body.course_Id },
        ],
      });
      if (coursebook) {
        resp.alreadyr(res, "you don't enrolles again this course");
      } else {
        const newenrollStudent = new enrollStudent({
          plan_Id: plan_Id,
          student_Id: req.userId,
          course_Id: course_Id,
          teacher:teacher
        });

        newenrollStudent
          .save()
          .then((data) => resp.successr(res, data))
         .catch((error) => resp.errorr(res, error))
         let getdata= await User.findOne({_id:req.userId})
         console.log("DATA",getdata)
         if(getdata){
         let update=  await User.findOneAndUpdate(
           { _id: req.userId },
           
           {$set: {status:"Enroll"}} ,
         
         //{ $set: {status:"success"} },
         { new: true }
       
       );
         }
      }
    }
  }
 
  if (plan == "Plan 3") {
    console.log("3", plan);
    let p3 = await enrollStudent.countDocuments({
      student_Id: req.userId,
    });
    console.log("STRINNG",p3)
    if (p3 >= 5) {
      console.log(p3);
      resp.errorr(res, "you can't enrolles more then five  course");
    }
   else {
      let coursebook = await enrollStudent.findOne({
        $and: [
          { student_Id: req.userId },
          { course_Id: req.body.course_Id }
        ],
      });
    
      if (coursebook) {
        resp.alreadyr(res, "you don't enrolles again this course");
      }else {
        const newenrollStudent = new enrollStudent({
          plan_Id: plan_Id,
          student_Id: req.userId,
          course_Id: course_Id,
          teacher:teacher
        });

        newenrollStudent
          .save()
          .then((data) => resp.successr(res, data))
          let getdata= await User.findOne({_id:req.userId})
          console.log("DATA",getdata)
          if(getdata){
          let update=  await User.findOneAndUpdate(
            { _id: req.userId },
            
            {$set: {status:"Enroll"}} ,
          
          //{ $set: {status:"success"} },
          { new: true }
        
        );
          }
          
           //.catch((error) => resp.errorr(res, error));
      }

    }
  }
  }
  // else {
  //   resp.errorr(res, "you have no any plan");
  // }
} 
 
}

  

 

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

exports.viewone_enroll_course = async (req, res) => {
  await enrollStudent
    .findOne({ $and :[{student_Id: req.userId},{course_Id: req.params.id }]})
   .populate("student_Id")
   .populate("plan_Id")
    .populate({
      path: "course_Id",
      populate: {
        path: "videolist",
      }
    })
    .populate({
      path: "course_Id",
      populate: {
        path: "pdflist",
      }
    })
    .populate({
      path: "course_Id",
      populate: {
        path: "teacher",
      }
    })
    .populate({
      path: "course_Id",
      populate: {
        path: "category_id",
      }
    })
   
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    
    .catch((error) => resp.errorr(res, error));
};

// exports.allenrollStudent = async (req, res) => {
//   await enrollStudent
//     .find({status:"Enroll"})
//     .populate("plan_Id")
//     .populate("course_Id")
//     .populate("student_Id")
//     .populate({
//       path: "course_Id",
//       populate: {
//         path: "teacher",
//       }
//     })
    
//     .sort({ sortorder: 1 })
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };

// exports.enrollStudentbytoken = async (req, res) => {
// //  const getenroll = await Course.findOne({teacher:req.params.id})
// //  console.log(getenroll)
// // if(getenroll){
//   const getuser = await Course.findOne({ teacher:req.staffId   });

//   //$or: [{ teacher: req.staffId }, { course_Id: req.params.course_Id }]
// if(getuser){
//   console.log("STRING",getuser)
// const getenroll = await enrollStudent.find({  status: "Enroll" })
//   // await enrollStudent
//   //   .find({staffId:req.staffId})
//     .populate("plan_Id")
//     .populate("course_Id")
//     .populate("student_Id")
//     .populate({
//       path: "course_Id",
//       populate: {
//         path: "teacher",
//       }
//     })
  
//     .sort({ sortorder: 1 })
  
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };
// }

// exports.enroll_token = async (req,res) =>{
//   const getdata  = await enrollStudent.find({teacher:req.staffId})
//   console.log(getdata)
//   .sort({ sortorder: 1 })
// .then((data) => resp.successr(res, data))
    
//   .catch((error) => resp.errorr(res, error));
//   }
 
  exports.enrollStudentbytoken = async (req, res) => {
   const getdetails = await enrollStudent
      .find({ $or :[{teacher: req.staffId},{student_Id: req.userId }]})
      .populate("plan_Id")
          .populate("course_Id")
          .populate("student_Id")
          .populate({
             path: "course_Id",
             populate: {
               path: "teacher",
             }
           })
      
      .sort({ sortorder: 1 })

   //   const findall = await enrollStudent.find({student_Id:req.userId})
   let record = [];
   
 //  let uniqueChars = [...new Set(record)];
  //  console.log("hfjdbf",record)

   
     for (const element of getdetails) {
        if (element.student_Id) {
         
          record.push(element.student_Id);
          // let uniqueChars = [...new Set(record)]
          // console.log("hfjdbf",uniqueChars)
          
          // console.log("EElement",element)
          // student = element.student_Id
          // abc = student.fullname
          // console.log("string",abc)
        // console.log("STUDENT",element.student_Id);  
      }
    }
    let uniqueCharss = [...new Set(record)]
    console.log("hfjdbf",uniqueCharss)
    //let uniqueChars =[]
    
      res.status(200).json({
        status: true,
        message: "success", 
      //  count: getdetails.length,
        //data : getdetails,
        //student :record,
        abc:uniqueCharss
      })
   

  };

exports.deleteenrollStudent = async (req, res) => {
  await enrollStudent.remove();
  await enrollStudent
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.Studentenroll_couses = async (req, res) => {
  await enrollStudent.find({student_Id:req.userId})
    .sort({ popularity: 1 })
    .populate("student_Id")
    .populate("plan_Id")
  
   // .populate("course_Id")
    // .populate([{ path: "videolist" }])
    // .populate([{ path: "pdflist" }])
    .populate({
      path: "course_Id",
      populate: {
        path: "videolist",
      }
    })
    .populate({
      path: "course_Id",
      populate: {
        path: "pdflist",
      }
    })
    .populate({
      path: "course_Id",
      populate: {
        path: "teacher",
      }
    })
    .populate({
      path: "course_Id",
      populate: {
        path: "category_id",
      }
    })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    
    .catch((error) => resp.errorr(res, error));
};


exports.enrlStu_techr_list = async (req, res) => {
  await enrollStudent.find({student_Id:req.userId})
    .sort({ popularity: 1 })
    .populate("student_Id")
    .populate("plan_Id")
  
   // .populate("course_Id")
    // .populate([{ path: "videolist" }])
    // .populate([{ path: "pdflist" }])
    .populate({
      path: "course_Id",
      populate: {
        path: "videolist",
      }
    })
    .populate({
      path: "course_Id",
      populate: {
        path: "pdflist",
      }
    })
    .populate({
      path: "course_Id",
      populate: {
        path: "teacher",
      }
    })
    .populate({
      path: "course_Id",
      populate: {
        path: "category_id",
      }
    })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    
    .catch((error) => resp.errorr(res, error));
};

// exports.enrollstudent_techaer = async (req, res) => {
//   const getcourse = await enrollStudent.countDocuments({course_Id :req.body.course_Id})
   
//    console.log(getcourse)
   
//  // await enrollStudent.find()
//     // .populate("plan_Id")
//     // .populate("course_Id")
//     // .populate("student_Id")
    // .populate({
    //   path: "course_Id",
    //   populate: {
    //     path: "teacher",
    //   }
    // })
//     //  .sort({ sortorder: 1 })
//     .then((data) => resp.successr(res, data))
//     .catch((error) => resp.errorr(res, error));
// };

exports.enrollstudent_incourse = async (req, res) => {
  await enrollStudent.countDocuments({course_Id :req.params.id}).populate({
    path: "course_Id",
    populate: {
      path: "teacher",
    }
  })

    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


 