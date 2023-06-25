const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  getAllPartnerProduct,
  getAllProductsGroupByCategory,
  getAllBestSeller,
  getAllBestSellerByCategory,
  getAllBestSellerBySubCategory,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  deleteImage,
  getAllProductByCategory,
  searchProduct,
  updateProductViews
} = require("../controller/productCtrl");
const { isPartner, authMiddleware, isManager } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isPartner, createProduct);

router.get("/id/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);

router.put("/update-view/:prodId", updateProductViews);
router.put("/update/:id", authMiddleware, isPartner, updateProduct);
router.delete("/delete/:id", authMiddleware, isPartner, deleteProduct);
router.delete("/delete-image/:id", authMiddleware, isPartner, deleteImage);

router.get("/", authMiddleware, isManager, getAllProduct);
router.get("/partner", authMiddleware, isPartner, getAllPartnerProduct);
router.get("/best-seller", getAllBestSeller);
router.get("/best-category", getAllBestSellerByCategory);
router.get("/best-subcategory", getAllBestSellerBySubCategory);
router.get("/all-categories-products", getAllProductsGroupByCategory);
router.get("/category/:categoryId", getAllProductByCategory);
router.get("/search", searchProduct);

module.exports = router;
