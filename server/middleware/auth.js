require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      console.log("verifying jwt...");
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      console.log("decoded jwt:", decoded);
      req.decoded = decoded;
      next();
    } catch (error) {
      return res.status(401).send({
        status: "error",
        message: "unauthorised",
      });
    }
  } else {
    return res.status(403).json({
      status: "error",
      message: "missing token",
    });
  }
};

module.exports = auth;
