const express = require("express");
const {
  createBanner,
  updateBanner,
  deleteBanner,
  getBanner,
  getallBanner,
  getallPublishedBanner,
  deleteImage
} = require("../controller/bannerCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBanner);
router.put("/update/:id", authMiddleware, isAdmin, updateBanner);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteBanner);
router.delete("/delete-image/:id/:path", authMiddleware, isAdmin, deleteImage);
router.get("/id/:id", authMiddleware, isAdmin, getBanner);
router.get("/", getallBanner);
router.get("/published", getallPublishedBanner);

module.exports = router;
