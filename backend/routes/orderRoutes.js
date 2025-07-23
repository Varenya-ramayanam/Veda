const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middlewares/authMiddleware");

const {
  getUserOrders,
  getSingleOrder,
  getAllOrders,        // Admin-only
  cancelOrder          // Optional
} = require("../controllers/orderController");

// @route   GET /api/orders
// @desc    Get all orders for the logged-in user
// @access  Private
router.get("/my-orders", protect, getUserOrders);

// @route   GET /api/orders/:id
// @desc    Get a specific order by ID for the logged-in user
// @access  Private
router.get("/:id", protect, getSingleOrder);

// @route   GET /api/orders/all
// @desc    Admin: Get all orders in the system
// @access  Private/Admin
router.get("/all/orders-list", protect, admin, getAllOrders);

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel a user's order
// @access  Private
router.put("/:id/cancel", protect, cancelOrder);

module.exports = router;
