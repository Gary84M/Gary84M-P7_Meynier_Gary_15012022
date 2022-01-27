const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const usersRoutes = require("./routes/user.routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", usersRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
