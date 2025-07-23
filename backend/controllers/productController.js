const Product = require("../models/productModel");

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      stock,
      sku,
      category,
      color,
      collections,
      image,
      isFeatured,
      isNewArrival,
      isPublished,
      isDeleted,
      rating,
      numReviews,
      reviews,
      tags,
      dimensions,
      weight,
      material,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      stock,
      sku,
      category,
      color,
      collections,
      image,
      isFeatured,
      isNewArrival,
      isPublished,
      isDeleted,
      rating,
      numReviews,
      reviews,
      tags,
      dimensions,
      weight,
      material,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a product by ID
// @route   GET /api/products/:id
// @access  Private/Admin
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product by ID
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const fields = [
        "name",
        "description",
        "price",
        "discountPrice",
        "stock",
        "sku",
        "category",
        "color",
        "collections",
        "image",
        "isFeatured",
        "isNewArrival",
        "isPublished",
        "isDeleted",
        "rating",
        "numReviews",
        "reviews",
        "tags",
        "dimensions",
        "weight",
        "material",
      ];

      fields.forEach((field) => {
        if (req.body[field] !== undefined) {
          product[field] = req.body[field];
        }
      });

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Soft delete a product by ID
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isDeleted = true;
      await product.save();
      res.status(200).json({ message: "Product marked as deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all products with optional filters
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const {
      collections,
      category,
      material,
      color,
      priceMin,
      priceMax,
      ratingMin,
      ecoFriendly,
      sort,
      page,
      limit,
      tags,
      stockAvailability,
      search,
    } = req.query;

    const query = { isDeleted: { $ne: true } };

    // Text search
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (collections) query.collections = collections;
    if (category) query.category = category;
    if (material) query.material = material;
    if (color) query.color = color;

    // Tags filter
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : tags.split(",");
      query.tags = { $in: tagArray };
    }

    // Price range
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    // Rating filter
    if (ratingMin) {
      query.rating = { $gte: Number(ratingMin) };
    }

    // Eco-friendly filter
    if (ecoFriendly === "true") {
      query.tags = { ...(query.tags || {}), $in: ["eco-friendly"] };
    }

    // Stock filter
    if (stockAvailability === "in") {
      query.stock = { $gt: 0 };
    } else if (stockAvailability === "out") {
      query.stock = { $lte: 0 };
    }

    // Sorting logic
    let sortBy = "createdAt";
    let sortOrder = -1;
    if (sort === "price-asc") {
      sortBy = "price";
      sortOrder = 1;
    } else if (sort === "price-desc") {
      sortBy = "price";
      sortOrder = -1;
    } else if (sort === "rating") {
      sortBy = "rating";
      sortOrder = -1;
    }

    // Pagination
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 20;
    const skip = (pageNumber - 1) * limitNumber;

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitNumber);

    res.status(200).json({
      products,
      totalProducts,
      page: pageNumber,
      limit: limitNumber,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/products/similar/:id
// @desc    Get similar products by id
// @access  Public
const getSimilarProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    });

    res.status(200).json(similarProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/products/best-sellers
// @desc  Get best sellers products - highest rating
// @access  Public
const getBestSellers = async (req, res) => {
  try {
    const bestSellers = await Product.find({ isDeleted: { $ne: true } })
      .sort({ rating: -1 })
      .limit(10);

    res.status(200).json(bestSellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/products/new-arrivals
// @desc  Get new arrivals products - latest created
// @access  Public
const getNewArrivals = async (req, res) => {
  try {
    const newArrivals = await Product.find({ isDeleted: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json(newArrivals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProducts,
  getSimilarProducts,
  getBestSellers,
  getNewArrivals,
};
