const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middlewares/authMiddleware");
const {
  getProducts,
  createProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productAdminController");

// @route   GET /api/admin/products
router.get("/products", protect, admin, getProducts);

// @route   POST /api/admin/products
router.post("/products", protect, admin, createProducts);

// @route   PUT /api/admin/products/:id
router.put("/products/:id", protect, admin, updateProduct);

// @route   DELETE /api/admin/products/:id
router.delete("/products/:id", protect, admin, deleteProduct);

module.exports = router;
