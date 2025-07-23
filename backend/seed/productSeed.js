// seed.js
const dotenv = require('dotenv');
const path = require('path');

// 1. Load environment variables first.
//    Ensure .env is in the project root relative to where you run node seed.js
dotenv.config({ path: path.resolve(__dirname, '../.env') }); 

const mongoose = require("mongoose"); // Mongoose is needed for Product model and connectDB
const connectDB = require("../config/db"); // Your DB connection function

const Product = require("../models/productModel"); // Your Product Model

const products = [
  {
    name: "Terracotta Lakshmi Lamp",
    description: "Handmade Diya with intricate carvings of Goddess Lakshmi. Perfect for festivals and pooja decor.",
    price: 499,
    discountPrice: 449,
    stock: 15,
    sku: "TERR-LAKSHMI-01",
    category: "Pooja Items",
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
    name: "Wooden Krishna Wall Art",
    description: "Beautifully carved wall hanging of Lord Krishna playing the flute.",
    price: 1599,
    discountPrice: 1399,
    stock: 10,
    sku: "KRISHNA-WOOD-03",
    category: "Wall Art",
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
    // 2. Await the database connection before any DB operations
    await connectDB(); 
    console.log("MongoDB Connection established for seeding.");

    console.log("Seeding products...");
    await Product.deleteMany({});
    const inserted = await Product.insertMany(products);
    console.log(`✅ Products seeded successfully: ${inserted.length} items.`);
    process.exit(0); // Exit with success code
  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
    // console.dir(error, { depth: null }); // Uncomment for very detailed error
    process.exit(1); // Exit with failure code
  } finally {
    // Optional: Close the Mongoose connection after seeding is done
    // This is good practice for short-lived scripts like seeders.
    if (mongoose.connection.readyState === 1) { // Check if connected
        await mongoose.disconnect();
        console.log("MongoDB Connection closed after seeding.");
    }
  }
};

// Call the async seeding function
seedProducts();