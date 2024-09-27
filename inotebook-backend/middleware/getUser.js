const jwt = require('jsonwebtoken');
const JWT_SECRET = "iN0te800kSecReT";
const getUser = (req, res, next) => {
  //get user from JWTtoken and add id to req object
  try{
    const token = req.header("auth-token");
    if (!token) {
      res.status(401).send({"message": "Use proper token for authentication."});
    }
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch(error) {
    res.status(401).send({"message": "Use proper token for authentication."});
  }
}
module.exports = getUser;