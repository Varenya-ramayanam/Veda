const Product = require("../models/productModel");

// @desc    Get all products (Admin)
// @route   GET /api/admin/products
// @access  Private/Admin
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a product (Admin)
// @route   POST /api/admin/products
// @access  Private/Admin
const createProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      stock,
      stockAvailability,
      sku,
      category,
      collections,
      material,
      color,
      image,
      rating,
      numReviews,
      reviews,
      isFeatured,
      isNewArrival,
      ecoFriendly,
      isPublished,
      isDeleted,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaImage,
      metaUrl,
      dimensions,
      weight,
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      discountPrice,
      stock,
      stockAvailability,
      sku,
      category,
      collections,
      material,
      color,
      image,
      rating,
      numReviews,
      reviews,
      isFeatured,
      isNewArrival,
      ecoFriendly,
      isPublished,
      isDeleted,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaImage,
      metaUrl,
      dimensions,
      weight,
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update a product by ID (Admin)
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    const fields = [
      "name", "description", "price", "discountPrice", "stock", "stockAvailability",
      "sku", "category", "collections", "material", "color", "image", "rating", "numReviews",
      "reviews", "isFeatured", "isNewArrival", "ecoFriendly", "isPublished", "isDeleted", "tags",
      "metaTitle", "metaDescription", "metaKeywords", "metaImage", "metaUrl", "dimensions", "weight"
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a product by ID (Soft Delete)
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    product.isDeleted = true;
    await product.save();

    res.status(200).json({ message: "Product marked as deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  createProducts,
  updateProduct,
  deleteProduct,
};
