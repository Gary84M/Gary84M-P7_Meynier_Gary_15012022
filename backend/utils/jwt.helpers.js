const jwt = require("jsonwebtoken");

const jwtTokens = function (userLogin) {
  console.log("Tokens generated");
  //console.log("My id " + userLogin.id);
  const user = {
    user_id: userLogin.id,
    first_name: userLogin.first_name,
    email: userLogin.email,
  };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1440m",
  });
  return { accessToken, refreshToken };
};
module.exports = jwtTokens;
