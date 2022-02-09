const multer = require("multer");
const MIME_TYPES = {
  "image/jpg": ".jpg",
  "image/jpeg": ".jpeg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const uploadProfile = (req, res) => {
  //   const storage = multer.diskStorage({
  //     destination: (req, file, callback) => {
  //       callback(null, "images");
  //     },
  //     //Set up the files names and add a timestamp to make the file unique
  //     filename: (req, file, callback) => {
  //       const name = file.originalname.split(" ").join("_");
  //       const extension = MIME_TYPES[file.mimetype];
  //       callback(null, name + Date.now() + "." + extension);
  //     },
  //   });
  //   console.log(file);
  //   multer({ storage });
  res.status(201).send("Single file uploaded");
};

module.exports = {
  uploadProfile,
};

//   if (
//     req.file.detectedMimeType !== "image/jpg" &&
//     req.file.detectedMimeType !== "image/png" &&
//     req.file.detectedMimeType !== "image/jpeg"
//   )
//     res.send("invalid file");
//multer({ storage: fileStorageEngine });

//   if (req.file.size > 500000) res.send("max size");
