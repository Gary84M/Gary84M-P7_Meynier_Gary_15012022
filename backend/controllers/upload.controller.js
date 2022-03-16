const pool = require("../config/db");
const queries = require("../config/queries");
const jwt = require("jsonwebtoken");
// const jwtTokens = require("../utils/jwt.helpers");
const multer = require("../middleware/multer-config");
const jwtTokens = require("../utils/jwt.helpers");
const fs = require("fs");

const uploadProfile = (req, res) => {
  const authHeader = req.headers["authorization"]; //Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];

  const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
  const id = decodedToken.user_id;

  const url = req.protocol + "://" + req.get("host");

  //const userImage;

  pool
    .query("SELECT image FROM users WHERE id = $1 ;", [id])
    .then((data) => {
      const userImage = data.rows[0].image;
      console.log(req);
      //console.log(...req.body.file);
      if (!userImage || userImage == "") {
        const imageUrl = url + "/public/upload/profile/" + req.file.filename;

        pool.query(queries.updateImage, [imageUrl, id], (error, results) => {
          if (error) {
            return res.status(400).json({ error: error });
          }
          return res
            .status(201)
            .json({ message: "profile picture succesfully uploaded" });
        });
      } else {
        const imageName = userImage.split("/public/upload/profile/")[1];
        const imageUrl = url + "/public/upload/profile/" + req.file.filename;

        fs.unlink(`public/upload/profile/${imageName}`, () => {
          pool.query(queries.updateImage, [imageUrl, id], (error, results) => {
            if (error) {
              return res.status(400).json({
                error: error,
              });
            }
            return res.status(201).json({
              message: "profile picture succesfully uploaded",
            });
          });
        });
      }
    })
    .catch((error) => console.log(error));
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
