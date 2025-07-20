const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  createCheckout,
  payForOrder,
  finalizeOrder
} = require("../controllers/checkoutController");

// @route   POST /api/checkout/create
// @desc    Create checkout session (collect address, cart, etc.)
// @access  Public
router.post("/create", createCheckout);

// @route   POST /api/checkout/pay
// @desc    Simulate payment (select payment method)
// @access  Public or Private (based on whether guests can order)
router.post("/pay", payForOrder);

// @route   POST /api/checkout/finalize
// @desc    Finalize order and clear cart
// @access  Private
router.post("/finalize", protect, finalizeOrder);

module.exports = router;
