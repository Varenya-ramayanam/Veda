const Product = require("../models/productModel");
const redis = require("../config/redis");

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body, user: req.user._id });
    const createdProduct = await product.save();

    if (redis) {
      await redis.del("products:all");
      await redis.del("products:best-sellers");
      await redis.del("products:new-arrivals");
    }

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const cacheKey = `product:${req.params.id}`;

    if (redis) {
      const cached = await redis.get(cacheKey);
      if (cached) return res.status(200).json(JSON.parse(cached));
    }

    const product = await Product.findById(req.params.id);
    if (product) {
      if (redis) await redis.set(cacheKey, JSON.stringify(product), "EX", 300);
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
      Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) product[key] = req.body[key];
      });

      const updatedProduct = await product.save();

      if (redis) {
        await redis.del("products:all");
        await redis.del("products:best-sellers");
        await redis.del("products:new-arrivals");
        await redis.del(`product:${req.params.id}`);
      }

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

      if (redis) {
        await redis.del("products:all");
        await redis.del("products:best-sellers");
        await redis.del("products:new-arrivals");
        await redis.del(`product:${req.params.id}`);
      }

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
    const queryKey = `products:all:${JSON.stringify(req.query)}`;

    if (redis) {
      const cached = await redis.get(queryKey);
      if (cached) return res.status(200).json(JSON.parse(cached));
    }

    const {
      collections, category, material, color,
      priceMin, priceMax, ratingMin, ecoFriendly,
      sort, page, limit, tags, stockAvailability, search,
    } = req.query;

    const query = { isDeleted: { $ne: true } };

    if (search) query.name = { $regex: search, $options: "i" };
    if (collections) query.collections = collections;
    if (category) query.category = category;
    if (material) query.material = material;
    if (color) query.color = color;

    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : tags.split(",");
      query.tags = { $in: tagArray };
    }

    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    if (ratingMin) query.rating = { $gte: Number(ratingMin) };
    if (ecoFriendly === "true") {
      query.tags = { ...(query.tags || {}), $in: ["eco-friendly"] };
    }

    if (stockAvailability === "in") query.stock = { $gt: 0 };
    else if (stockAvailability === "out") query.stock = { $lte: 0 };

    let sortBy = "createdAt", sortOrder = -1;
    if (sort === "price-asc") [sortBy, sortOrder] = ["price", 1];
    if (sort === "price-desc") [sortBy, sortOrder] = ["price", -1];
    if (sort === "rating") [sortBy, sortOrder] = ["rating", -1];

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 20;
    const skip = (pageNumber - 1) * limitNumber;

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitNumber);

    const result = {
      products,
      totalProducts,
      page: pageNumber,
      limit: limitNumber,
    };

    if (redis) {
      await redis.set(queryKey, JSON.stringify(result), "EX", 300);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get similar products by id
// @route   GET /api/products/similar/:id
// @access  Public
const getSimilarProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const similarProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    });

    res.status(200).json(similarProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get best sellers
// @route   GET /api/products/best-sellers
// @access  Public
const getBestSellers = async (req, res) => {
  try {
    const cacheKey = "products:best-sellers";

    if (redis) {
      const cached = await redis.get(cacheKey);
      if (cached) return res.status(200).json(JSON.parse(cached));
    }

    const bestSellers = await Product.find({ isDeleted: { $ne: true } })
      .sort({ rating: -1 })
      .limit(10);

    if (redis) {
      await redis.set(cacheKey, JSON.stringify(bestSellers), "EX", 300);
    }

    res.status(200).json(bestSellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get new arrivals
// @route   GET /api/products/new-arrivals
// @access  Public
const getNewArrivals = async (req, res) => {
  try {
    const cacheKey = "products:new-arrivals";

    if (redis) {
      const cached = await redis.get(cacheKey);
      if (cached) return res.status(200).json(JSON.parse(cached));
    }

    const newArrivals = await Product.find({ isDeleted: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(10);

    if (redis) {
      await redis.set(cacheKey, JSON.stringify(newArrivals), "EX", 300);
    }

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
