const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "UNAUTHORIZED" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "UNAUTHORIZED" });
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "UNAUTHORIZED" });
      }
      req.userInfo = {};
      req.userInfo.id = decoded.id;
      req.userInfo.userName = decoded.userName;
      next();
    });
  } catch (error) {
    res.status(401).json({ error: "UNAUTHORIZED" });
  }
};

module.exports = verifyJWT;
