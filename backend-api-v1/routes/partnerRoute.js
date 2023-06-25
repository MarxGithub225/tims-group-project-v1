const express = require("express");
const {
  createPartner,
  updatePartner,
  deletePartner,
  getPartner,
  getallPartner,
  loginPartnerCtrl,
  forgotPasswordToken,
  resetPassword,
  updatePassword
} = require("../controller/partnerCtrl");
const { authMiddleware, isAdmin, isManager } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createPartner);
router.put("/update/:id", authMiddleware, updatePartner);
router.delete("/delete/:id", authMiddleware, isAdmin, deletePartner);
router.get("/:id", authMiddleware, getPartner);
router.get("/", authMiddleware, isManager, getallPartner);

router.post("/forgot-password-token", forgotPasswordToken);

router.put("/reset-password/:token", resetPassword);

router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginPartnerCtrl);
module.exports = router;
