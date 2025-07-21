const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middlewares/authMiddleware");
const { getOrders,updateOrder,deleteOrder } = require("../controllers/adminOrderController");


// @route GET /api/admin/orders
// @desc    Get all orders
// @access  Private/Admin
router.get("/orders", protect, admin, getOrders);

// @route PUT /api/admin/orders/:id
// @desc    Update an order
// @access  Private/Admin
router.put("/orders/:id", protect, admin, updateOrder);

// @route DELETE /api/admin/orders/:id
// @desc    Delete an order
// @access  Private/Admin
router.delete("/orders/:id", protect, admin, deleteOrder);



module.exports = router;