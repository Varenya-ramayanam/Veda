const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
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
    stockAvailability: {
      type: String,
      enum: ["inStock", "preOrder", "outOfStock"],
      default: "inStock",
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
    },
    collections: {
      type: String,
      required: true,
      enum: ["Arts", "Gifts", "Home Decor", "DIY"],
    },
    material: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
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
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name: String,
        rating: Number,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
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
    ecoFriendly: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    metaTitle: String,
    metaDescription: String,
    metaKeywords: String,
    metaImage: String,
    metaUrl: String,
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    weight: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
