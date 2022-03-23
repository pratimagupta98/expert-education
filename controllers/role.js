const Role = require("../models/role");
const Staff = require("../models/staff");
const resp = require("../helpers/apiResponse");

exports.addrole = async (req, res) => {
  const {
    name,
    sortorder,
    status,
    permissions
  } = req.body;

  const newRole = new Role({
    name: name,
    sortorder: sortorder,
    status: status,
    permissions: permissions
  });
  const findexist = await Role.findOne({ name: name });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newRole
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.editrole = async (req, res) => {
  await Role.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.viewonerole = async (req, res) => {
  await Role.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allrole = async (req, res) => {
  await Role.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.lowerrolesthanmine = async (req, res) => {
  //const data = 
  const myroleid = await Staff.findOne({ _id: req.staffId }).populate('role')
  // .then((data)=>{

  // })
  if(myroleid){
    console.log(myroleid?.role.sortorder)
    await Role.find({sortorder:{$gte: parseInt(myroleid?.role.sortorder)+1} })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  }else{
    res.json({status: false,
      message: "error",
      error: "some error occurred"})
  }
};


exports.deleterole = async (req, res) => {
  await Role.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};



