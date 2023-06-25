const express = require("express");
const { uploadImages, deleteImage, uploadSingleImage } = require("../controller/uploadCtrl");
const { isManager, authMiddleware, isPart, isManagerner, isPartner } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize, bannerImgResize, brandImgResize, categoryImgResize, uploadFile, blogImgResize } = require("../middlewares/uploadImage");
const router = express.Router();

router.post(
  "/banner",
  authMiddleware,
  isManager,
  uploadPhoto.single("image"),
  bannerImgResize,
  uploadSingleImage
);

router.post(
  "/brand",
  authMiddleware,
  isManager,
  uploadPhoto.single("image"),
  brandImgResize,
  uploadSingleImage
);

router.post(
  "/blog",
  authMiddleware,
  isManager,
  uploadPhoto.single("image"),
  blogImgResize,
  uploadSingleImage
);

router.post(
  "/category",
  authMiddleware,
  isManager,
  uploadPhoto.single("image"),
  categoryImgResize,
  uploadSingleImage
);

router.post(
  "/product",
  authMiddleware,
  isPartner,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);

router.post(
  "/file",
  uploadFile.single("file"),
  uploadSingleImage
);

router.post(
  "/",
  authMiddleware,
  isPartner,
  uploadPhoto.single("image"),
  uploadSingleImage
);

router.delete("/delete/:folder/:path", authMiddleware, isPartner, deleteImage);

module.exports = router;
