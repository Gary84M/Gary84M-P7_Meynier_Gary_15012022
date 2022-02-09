const multer = require("multer");
//set images formats
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
//where to file the images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/upload/profile");
  },
  //Set up the files' names and add a timestamp to make the file unique
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});
module.exports = multer({ storage }).single("file");
