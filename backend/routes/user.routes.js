const { Router } = require("express");
const router = Router();
const authController = require("../controllers/auth.controllers");
const userController = require("../controllers/user.controller");
const authenticateToken = require("../middleware/authorization");
const uploadController = require("../controllers/upload.controller");
//const multer = require("multer");
//const upload = multer();
const multer = require("../middleware/multer-config");

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/refresh_token", authController.refreshTok);
router.delete("/refresh_token", authController.logout);

//user db
router.get("/", authenticateToken, userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/", userController.deleteUser);

//Upload
router.post(
  "/upload",
  authenticateToken,
  multer,
  uploadController.uploadProfile
);

module.exports = router;
