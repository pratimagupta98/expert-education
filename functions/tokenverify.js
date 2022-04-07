const key = "verysecretkey";
const jwt = require("jsonwebtoken");

exports.tokenverify = (req, res, next) => {
  let token = req.headers["user-token"];

  //console.log(token)
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.userId;
    next();
  });

};
