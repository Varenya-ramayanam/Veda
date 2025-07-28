const fs = require("fs");
const Product = require("../models/productModel");
const cloudinary = require("../utils/cloudinary");

// @desc    Get all products (Admin)
// @route   GET /api/admin/products
// @access  Private/Admin
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false }).sort({ createdAt: -1 });
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
      sku,
      stock,
      category,
      collections,
      material,
      color,
    } = req.body;

    if (
      !name || !description || !price || !sku || !stock ||
      !category || !collections || !material || !color
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const uploadedImages = [];

    // console.log("Uploaded files:", req.files); // This will print on server terminal

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "veda-products",
        });

        uploadedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
          altText: name || "Product Image",
        });

        fs.unlinkSync(file.path); // clean up local temp file
      }
    }

    const newProduct = new Product({
      name,
      description,
      price,
      sku,
      stock,
      category,
      collections,
      material,
      color,
      image: uploadedImages,
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    console.error("Product creation failed:", err);
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

    const {
      name,
      description,
      price,
      sku,
      stock,
      category,
      collections,
      material,
      color,
      existingImages, // from frontend, sent as JSON string
    } = req.body;

    const updatedImages = [];

    if (existingImages) {
      const parsed = JSON.parse(existingImages);
      if (Array.isArray(parsed)) {
        updatedImages.push(...parsed);
      }
    }

    // console.log("Uploaded files:", req.files); // This will print on server terminal

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "veda-products",
        });

        updatedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
          altText: name || "Product Image",
        });

        fs.unlinkSync(file.path);
      }
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.sku = sku || product.sku;
    product.stock = stock || product.stock;
    product.category = category || product.category;
    product.collections = collections || product.collections;
    product.material = material || product.material;
    product.color = color || product.color;
    product.image = updatedImages;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Product update failed:", err);
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
