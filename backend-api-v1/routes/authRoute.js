const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getMe
} = require("../controller/userCtrl");
const { authMiddleware, isManager } = require("../middlewares/authMiddleware");
const router = express.Router();
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);

router.put("/reset-password/:token", resetPassword);

router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.get("/all", authMiddleware, isManager,  getallUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);

router.get("/id/:id", authMiddleware, getaUser);
router.get("/me", authMiddleware, getMe);
router.delete("/delete/:id", authMiddleware, isManager, deleteaUser);
router.put("/update/:id", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isManager, blockUser);
router.put("/unblock-user/:id", authMiddleware, isManager, unblockUser);

module.exports = router;
