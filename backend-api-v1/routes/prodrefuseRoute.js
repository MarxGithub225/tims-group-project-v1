const express = require("express");
const {
  createRefuse,
  updateRefuse,
  deleteRefuse,
  getRefuse,
  getallRefuse,
  deleteImage
} = require("../controller/prodrefuseCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createRefuse);
router.put("/update/:id", authMiddleware, isAdmin, updateRefuse);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteRefuse);
router.get("/:id", getRefuse);
router.get("/", getallRefuse);

module.exports = router;
