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

  const id = decodedToken.user_id;

  //const name = "./backend/" + req.file.destination + req.file.filename;
  const name =
    "/api/users/public/upload/profile" +
    req.file.destination +
    req.file.filename;
  console.log(req.file.destination);

  pool.query(queries.updateImage, [name, id], (error, results) => {
    if (error) throw error;
  });

  return res
    .status(201)
    .json({ message: "profile picture succesfully uploaded " });
};

const uploadImagePost = async (req, res) => {
  const authHeader = req.headers["authorization"]; //Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];

  const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);

  const user_id = decodedToken.user_id;

  const name = req.file.destination + Date.now() + req.file.filename;

  const content = req.body.content;

  try {
    pool.query(
      queries.createPostImage,
      [user_id, content, name],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Post succesfully created");
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
