const { Router } = require("express");
const router = Router();
const postController = require("../controllers/post.controller");
const uploadController = require("../controllers/upload.controller");
const authenticateToken = require("../middleware/authorization");
const multer = require("../middleware/multer-config");

//TABLE posts
router.get("/", postController.readPost);
router.post("/", multer, postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
//Upload Image
router.post(
  "/upload/pic",
  authenticateToken,
  multer,
  uploadController.uploadImagePost
);

//TABLE comments
router.get("/all-comments/:id", postController.readComms);
router.post("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment-post/:id", postController.editCommentPost);
router.delete("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;
