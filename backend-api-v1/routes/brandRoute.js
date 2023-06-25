const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
  deleteImage
} = require("../controller/brandCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/update/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteBrand);
router.delete("/delete-image/:id/:path", authMiddleware, isAdmin, deleteImage);
router.get("/:id", getBrand);
router.get("/", getallBrand);

module.exports = router;
