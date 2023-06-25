const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getSubcategory,
  getallCategory,
  deleteImage} = require("../controller/prodcategoryCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/update/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteCategory);
router.delete("/delete-image/:id/:path", authMiddleware, isAdmin, deleteImage);
router.get("/category/:id", getCategory);
router.get("/subcategory/:id", getSubcategory);
router.get("/", getallCategory);

module.exports = router;
