const { Router } = require("express");
const router = Router();
const authController = require("../controllers/auth.controllers");
const userController = require("../controllers/user.controller");

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
//router.get("/logout", authController.logout);

//user db
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
// router.get("/:id", userController.userInfo);
//router.post("/", userController.addUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
