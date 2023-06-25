const express = require("express");
const {
  createBlog,
  getaBlog,
  getAllBlog,
  getAllPublishedBlogs,
  updateBlog,
  deleteBlog,
  commentaBlog,
  likeaBlog,
  deleteImage,
  updateBlogViews
} = require("../controller/blogCtrl");
const { isManager, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isManager, createBlog);
router.put("/update-view/:blogId", updateBlogViews);
router.get("/id/:id", getaBlog);
router.put("/comment", authMiddleware, commentaBlog);
router.put("/like", authMiddleware, likeaBlog);

router.put("/update/:id", authMiddleware, isManager, updateBlog);
router.delete("/delete/:id", authMiddleware, isManager, deleteBlog);
router.delete("/delete-image/:id/:path", authMiddleware, isManager, deleteImage);

router.get("/", authMiddleware, isManager, getAllBlog);
router.get("/published", getAllPublishedBlogs);

module.exports = router;
