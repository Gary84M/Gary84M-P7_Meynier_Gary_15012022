const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  let authHeader = req.headers["authorization"]; //Bearer TOKEN
  let token = "";

  if (authHeader === undefined) {
    authHeader = req.headers["cookie"];
    token = authHeader && authHeader.split("=")[1];
  } else {
    token = authHeader && authHeader.split(" ")[1];
  }

  if (token == null)
    return res.status(401).json({
      error: "Null token from backend",
    });
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
    if (error)
      return res.status(403).json({
        error: error.message,
      });
    req.user = user;
    //res.locals.user = user;

    next();
  });
}
module.exports = authenticateToken;
