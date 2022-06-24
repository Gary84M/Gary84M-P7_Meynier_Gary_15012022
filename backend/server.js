const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const usersRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const cors = require("cors");
const authenticateToken = require("./middleware/authorization");

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//JWT
app.get("/jwtid", authenticateToken, (req, res) => {
  res.status(200).send(res.req.user.user_id);
});

//Routes
app.use("/api/users", usersRoutes);
app.use("/api/post", postRoutes);

app.use(
  "/public/upload/profile",
  express.static(path.join(__dirname, "public/upload/profile"))
);

//server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
