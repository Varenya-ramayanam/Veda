const mongoose = require("mongoose");
const dotenv = require("dotenv");

// 1️⃣ Load .env BEFORE importing connectDB
dotenv.config();

const connectDB = require("../config/db"); // Now this can use MONGO_URI
connectDB(); // ✅ Connects to MongoDB with env var loaded

const Product = require("../models/productModel");

const products = [
  {
    name: "Terracotta Lakshmi Lamp",
    description: "Handmade Diya with intricate carvings of Goddess Lakshmi. Perfect for festivals and pooja decor.",
    price: 499,
    discountPrice: 449,
    stock: 15,
    sku: "TERR-LAKSHMI-01",
    category: "Pooja Items",
    sizes: ["S", "M"],
    color: "Terracotta",
    collections: "Gifts",
    image: [
      {
        url: "https://picsum.photos/seed/lakshmi/400/500",
        altText: "Terracotta Lakshmi Diya"
      }
    ],
    isFeatured: true,
    isNewArrival: true,
    isPublished: true,
    isDeleted: false,
    rating: 4.8,
    numReviews: 12,
    reviews: [],
    tags: ["diya", "terracotta", "lakshmi", "decor"],
    dimensions: { length: 10, width: 10, height: 5 },
    weight: 0.5,
    material: "Terracotta"
  },
  {
    name: "Eco-Friendly Ganesh Idol",
    description: "Made with eco-friendly clay, this idol is perfect for Ganesh Chaturthi celebrations.",
    price: 799,
    stock: 30,
    sku: "GANESH-ECO-02",
    category: "Idols",
    sizes: ["M", "L"],
    color: "Brown",
    collections: "DIY",
    image: [
      {
        url: "https://picsum.photos/seed/ganesh/400/500",
        altText: "Eco-friendly Ganesh Idol"
      }
    ],
    isFeatured: false,
    isNewArrival: true,
    isPublished: true,
    isDeleted: false,
    rating: 4.5,
    numReviews: 8,
    reviews: [],
    tags: ["ganesh", "eco", "idol", "clay"],
    dimensions: { length: 15, width: 12, height: 20 },
    weight: 1.2,
    material: "Clay"
  },
  {
    name: "Wooden Krishna Wall Art",
    description: "Beautifully carved wall hanging of Lord Krishna playing the flute.",
    price: 1599,
    discountPrice: 1399,
    stock: 10,
    sku: "KRISHNA-WOOD-03",
    category: "Wall Art",
    sizes: ["L"],
    color: "Brown",
    collections: "Arts",
    image: [
      {
        url: "https://picsum.photos/seed/krishna/400/500",
        altText: "Krishna Wall Art"
      }
    ],
    isFeatured: true,
    isNewArrival: false,
    isPublished: true,
    isDeleted: false,
    rating: 4.9,
    numReviews: 24,
    reviews: [],
    tags: ["krishna", "wood", "wall", "art"],
    dimensions: { length: 40, width: 2, height: 60 },
    weight: 2.5,
    material: "Wood"
  },
  {
    name: "Colorful Rangoli Kit",
    description: "Everything you need to create beautiful rangoli designs this Diwali.",
    price: 349,
    stock: 40,
    sku: "RANGOLI-KIT-04",
    category: "DIY Kits",
    sizes: ["S"],
    color: "Multicolor",
    collections: "DIY",
    image: [
      {
        url: "https://picsum.photos/seed/rangoli/400/500",
        altText: "Rangoli Kit"
      }
    ],
    isFeatured: false,
    isNewArrival: true,
    isPublished: true,
    isDeleted: false,
    rating: 4.3,
    numReviews: 18,
    reviews: [],
    tags: ["rangoli", "kit", "diy", "color"],
    dimensions: { length: 15, width: 15, height: 5 },
    weight: 0.4,
    material: "Powder, Plastic"
  }
];


const seedProducts = async () => {
  try {
    console.log("Seeding products...");
    await Product.deleteMany({});
    const inserted = await Product.insertMany(products);
    console.log("✅ Products seeded successfully:", inserted.length);
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
    console.dir(error, { depth: null });
    process.exit(1);
  }
};

seedProducts();
