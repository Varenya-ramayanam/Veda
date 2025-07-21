const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middlewares/authMiddleware");
const { getProducts } = require("../controllers/productAdminController");

// @route GET /api/admin/products
// @desc    Get all products
// @access  Private/Admin
router.get("/products", protect, admin, getProducts);



module.exports = router;