const express = require("express");
const {
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderById,
} = require("../controller/orderCtrl");
const { authMiddleware, isManager } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.put("/status/:id", authMiddleware, updateOrderStatus);
router.get("/id/:id", getOrderById);
router.get("/user/:id", authMiddleware, getOrders);
router.get("/", authMiddleware, isManager, getAllOrders);

module.exports = router;
