const pool = require("../config/db");
const queries = require("../config/queries");
const jwt = require("jsonwebtoken");
// const jwtTokens = require("../utils/jwt.helpers");
const multer = require("../middleware/multer-config");
const jwtTokens = require("../utils/jwt.helpers");

const uploadProfile = (req, res) => {
  //   res.status(200).json({ message: "Single file uploaded" });

  const authHeader = req.headers["authorization"]; //Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];

  const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(decodedToken);

  const id = decodedToken.user_id;
  console.log(id);

  const name = req.body.name + Date.now();
  //console.log(name);

  pool.query(queries.updateImage, [name, id], (error, results) => {
    if (error) throw error;
  });

  return res
    .status(201)
    .json({ message: "file succesfully uploaded in the DB" });
};

const uploadImagePost = async (req, res) => {
  const { users_id, content, type } = req.body;
  const name = req.body.originalname;
  console.log(originalname);
  try {
    pool.query(
      queries.createPost,
      [users_id, req.body.file],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Post succesfully created");
        console.log(file);
      }
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  uploadProfile,
  uploadImagePost,
};
