const { Router } = require("express");
const router = Router();
const postController = require("../controllers/post.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("../middleware/multer-config");

//TABLE posts
router.get("/", postController.readPost);
router.post("/:id", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
//Upload Image
router.post("/:id", multer, uploadController.uploadImagePost);

//TABLE comments
router.get("/:id/all-comments", postController.readComms);
router.post("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment-post/:id", postController.editCommentPost);
router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;