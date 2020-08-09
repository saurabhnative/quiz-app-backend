const jwt = require("jsonwebtoken");
const User = require('../models/User');
module.exports = async function(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    const user = await User.findById(decoded.user.id);
    if(req.route.path === "/add_quiz_question") {
      if(user.userRole !== 'admin') {
        res.status(500).send({ message: "Insufficient priviledges" });
      }
    }
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};