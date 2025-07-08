const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");


// @route   GET /api/products
// @desc    Get all products
// @access  private/admin
router.get("/",protect, async (req, res) => {
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
            user,
            dimensions,
            weight,
            material,
          } = req.body;
          
        const products = await Product.find();
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

module.exports = router;