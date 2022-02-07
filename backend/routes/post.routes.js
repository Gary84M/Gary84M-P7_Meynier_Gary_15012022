const { Router } = require("express");
const router = Router();
const postController = require("../controllers/post.controller");

//TABLE posts
router.get("/", postController.readPost);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

//TABLE comments
router.get("/:id/all-comments", postController.readComms);
router.post("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment-post/:id", postController.editCommentPost);
router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;
