const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    index: true,
    default: "sku",
  },
  category: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String],
    enum: ["S", "M", "L", "XL", "XXL"],
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  collections: {
    type: String,
    required: true,
    enum: ["Arts", "Gifts", "Home Decor", "DIY"],
    message: "Please select the correct collection",
  },
  image: [
    {
      url: {
        type: String,
        required: true,
      },
      altText: {
        type: String,
      },
    },
  ],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isNewArrival: {
    type: Boolean,
    default: false,
  },  
  isPublished: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  reviews: [{}],
  tags: [String],
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  metaKeywords: {
    type: String,
  },
  metaImage: {
    type: String,
  },
  metaUrl: {
    type: String,
  },
  dimensions:{
    length: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  weight: {
    type: Number,
  },
  material: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
