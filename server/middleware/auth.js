const jwt = require("jsonwebtoken");
const adminSecretKey = "ADMIN_SECRET_KEY";
const userSecretKey = "USER_SECRET_KEY";

const generateJwtAdmin = (admin) => {
  const payload = { admin: admin.username };
  return jwt.sign(payload, adminSecretKey, { expiresIn: "1h" });
};

const generateJwtUser = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, userSecretKey);
};

const authenticateJwtAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, adminSecretKey, (err, admin) => {
      if (err) {
        res.sendStatus(403);
        return;
      }
      req.admin = admin;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const authenticateJwtUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, userSecretKey, (err, user) => {
      if (err) {
        res.sendStatus(403);
        return;
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  generateJwtAdmin,
  generateJwtUser,
  authenticateJwtAdmin,
  authenticateJwtUser,
};
