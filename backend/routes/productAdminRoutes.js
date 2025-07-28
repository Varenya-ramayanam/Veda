const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middlewares/authMiddleware");
const {
  getProducts,
  createProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productAdminController");

const upload = require("../middlewares/upload");

// @route   GET /api/admin/products
router.get("/", protect, admin, getProducts);

// @route   POST /api/admin/products
// @desc    Create a new product with image upload (Admin only)
router.post("/", protect, admin, upload.array("images", 5), createProducts);

// @route   PUT /api/admin/products/:id
router.put("/:id", protect, admin, upload.array("images", 5), updateProduct);


// @route   DELETE /api/admin/products/:id
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
