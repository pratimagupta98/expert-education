const key = "verysecretkey";
const jwt = require("jsonwebtoken");

exports.adminToken = (req, res, next) => {
  let token = req.headers["ad-token"];

  //console.log(token)
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.adminId = decoded.adminId;
    next();
  });
};
