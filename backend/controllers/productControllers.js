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
            sizes,
            color,
            collections,
            image,
            isFeatured,
            isNew,
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
            sizes,
            color,
            collections,
            image,
            isFeatured,
            isNew,
            isPublished,
            isDeleted,
            rating,
            numReviews,
            reviews,
            tags,
            user: req.user._id,
            dimensions,
            weight,
            material,
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
                "sizes",
                "color",
                "collections",
                "image",
                "isFeatured",
                "isNew",
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

// @route   GET /api/products
// @desc    Get all products with optional filters
// @access  Public
const getProducts = async (req, res) => {
    try {
        const { category, size, color, price, rating, sort, page, limit } = req.query;
        const query = {};

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by size   
        if (size) {
            query.sizes = { $in: size.split(',') };
        }

        // Filter by color
        if (color) {
            query.color = color;
        }

        // Filter by price
        if (price) {
            query.price = { $lte: price };
        }

        // Filter by rating
        if (rating) {
            query.rating = { $gte: rating };
        }

        // Sorting
        const sortOrder = sort === 'desc' ? -1 : 1;
        const sortBy = sort === 'price' ? 'price' : 'createdAt';

        // Pagination   
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        // Get total count of products
        const totalProducts = await Product.countDocuments(query);

        // Get products
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
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }

        const similarProducts = await Product.find({
            category: product.category,
        });
        res.status(200).json(similarProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @route GET /api/products/best-sellers
// @desc    Get best sellers products - highest rating
// @access  Public
const getBestSellers = async (req, res) => {
    try {
        const bestSellers = await Product.findOne().sort({ rating: -1 });
        res.status(200).json(bestSellers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route GET /api/products/new-arrivals
// @desc    Get new arrivals products - latest created
// @access  Public
const getNewArrivals = async (req, res) => {
    try {
        const newArrivals = await Product.find().sort({ createdAt: -1 });
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
    getProductById,
    getSimilarProducts,
    getBestSellers,
    getNewArrivals,
};
