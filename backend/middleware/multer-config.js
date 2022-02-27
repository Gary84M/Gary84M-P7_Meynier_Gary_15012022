const multer = require("multer");
//set images formats
const MIME_TYPES = {
  "image/jpg": ".jpg",
  "image/jpeg": ".jpeg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};
//where to file the images

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/upload/profile");
  },
  //Set up the file names and add a timestamp
  filename: (req, file, callback) => {
    const name = req.body.name;
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + extension);
  },
});
module.exports = multer({ storage }).single("file");