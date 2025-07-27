const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middlewares/authMiddleware");
const { getOrders, updateOrder, deleteOrder } = require("../controllers/adminOrderController");

// @route GET /api/admin/orders
router.get("/", protect, admin, getOrders);

// @route PUT /api/admin/orders/:id
router.put("/:id", protect, admin, updateOrder);

// @route DELETE /api/admin/orders/:id
router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;
