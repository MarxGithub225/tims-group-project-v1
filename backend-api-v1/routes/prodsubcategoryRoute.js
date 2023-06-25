const express = require("express");
const {
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSubcategory,
  getallSubcategory,
  deleteImageSubcategory
} = require("../controller/prodcategoryCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createSubcategory);
router.put("/update/:id", authMiddleware, isAdmin, updateSubcategory);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteSubcategory);
router.delete("/delete-image/:id/:path", authMiddleware, isAdmin, deleteImageSubcategory);
router.get("/:id", getSubcategory);
router.get("/", getallSubcategory);

module.exports = router;
