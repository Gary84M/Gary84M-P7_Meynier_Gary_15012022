const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const usersRoutes = require("./routes/user.routes");

const app = express();

app.use(cookieParser());
app.get("/", function (req, res) {
  // Cookies that have not been signed
  console.log("Cookies: ", req.cookies);

  // Cookies that have been signed
  console.log("Signed Cookies: ", req.signedCookies);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", usersRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
