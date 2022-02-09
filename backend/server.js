const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");

require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const usersRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowHeaders: ["sessionId", "Content-Type"],
  exposeHeaders: ["sessionId"],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  preflightContinue: false,
};

app.use(cors({ corsOptions }));

app.use(cookieParser());
// app.get("/", function (req, res) {
//   // Cookies that have not been signed
//   console.log("Cookies: ", req.cookies);

//   // Cookies that have been signed
//   console.log("Signed Cookies: ", req.signedCookies);
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/api/users", usersRoutes);
app.use("/api/post", postRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
