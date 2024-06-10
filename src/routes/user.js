const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

const { verifyUser } = require("../middlewares/authMiddleware");

router.get("/search", userController.searchUser);
router.get("/", userController.getUser);
router.get("/logout", verifyUser, userController.clearToken);
router.post("/", userController.createUser);
router.put("/:id", verifyUser, userController.updateUser);
router.delete("/:id", verifyUser, userController.deleteUser);

router.post("/login", userController.loginUser);

router.get("/currentUser", verifyUser, userController.currentUser);
module.exports = router;
