const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middlewares/authMiddleware");
const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProducts,
  getSimilarProducts,
  getBestSellers,
  getNewArrivals,
} = require("../controllers/productController");

// Create
router.post("/", protect, admin, createProduct);

// Read
router.get("/:id", getProductById);

// Update
router.put("/:id", protect, admin, updateProduct);

// Delete (soft delete)
router.delete("/:id", protect, admin, deleteProduct);

// Get all products
router.get("/", getProducts);

// Get similar products
router.get("/similar/:id", getSimilarProducts);

// Get best sellers
router.get("/best-sellers", getBestSellers);

// Get new arrivals
router.get("/new-arrivals", getNewArrivals);

module.exports = router;


// Seed some data manually later for testing