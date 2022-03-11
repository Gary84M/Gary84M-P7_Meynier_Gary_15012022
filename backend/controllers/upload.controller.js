const pool = require("../config/db");
const queries = require("../config/queries");
const jwt = require("jsonwebtoken");
// const jwtTokens = require("../utils/jwt.helpers");
const multer = require("../middleware/multer-config");
const jwtTokens = require("../utils/jwt.helpers");

const uploadProfile = (req, res) => {
  //   res.status(200).json({ message: "Single file uploaded" });
  console.log(req);
  req.body.image = JSON.parse(req.body);

  const authHeader = req.headers["authorization"]; //Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];

  const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
  const id = decodedToken.user_id;

  const url = req.protocol + "://" + req.get("host");
  const image = new Image({
    name: req.body.originalname,
    imageUrl: url + "/backend/public/upload/profile/" + req.file.filename,
  });
  image
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .then(
      pool.query(queries.updateImage, [imageurl, id], (error, results) => {
        if (error) throw error;
      })
    );
  return res
    .status(201)
    .send({ message: "profile picture succesfully uploaded " })

    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// exports.createThing = (req, res, next) => {
//   req.body.thing = JSON.parse(req.body.thing);
//   const url = req.protocol + "://" + req.get("host");
//   const thing = new Thing({
//     title: req.body.thing.title,
//     description: req.body.thing.description,
//     imageUrl: url + "/images/" + req.file.filename,
//     price: req.body.thing.price,
//     userId: req.body.thing.userId,
//   });
//   thing
//     .save()
//     .then(() => {
//       res.status(201).json({
//         message: "Post saved successfully!",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// };

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
