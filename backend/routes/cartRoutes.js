const express = require("express");
const router = express.Router();
const {
    addProductToCart,
    updateProductQuantity,
    deleteProductFromCart,
    getUserCart,
    mergeCart
} = require("../controllers/cartController");
const { protect } = require("../middlewares/authMiddleware");

// @route   POST /api/cart
// @desc    Add product to cart
// @access  Public
router.post("/", addProductToCart);

// @route   PUT /api/cart
// @desc    Update product quantity in cart
// @access  Public
router.put("/", updateProductQuantity);

// @route   DELETE /api/cart
// @desc    Delete product from cart
// @access  Public
router.delete("/", deleteProductFromCart);

// @route   GET /api/cart
// @desc    Get cart
// @access  Public
router.get("/", getUserCart);

// @route   POST /api/cart/merge
// @desc    Merge guest cart with user cart
// @access  Private
router.post("/merge", protect, mergeCart);

module.exports = router;
