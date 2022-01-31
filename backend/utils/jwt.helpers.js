const jwt = require("jsonwebtoken");

const jwtTokens = function ({ user_id, user_name, user_email }) {
  console.log("Tokens generated");
  const user = { user_id, user_name, user_email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "40s",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "60000s",
  });
  return { accessToken, refreshToken };
};
module.exports = jwtTokens;
