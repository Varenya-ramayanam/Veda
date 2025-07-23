const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    color: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
}, { _id: false });



const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    guestId: {
        type: String,
    },
    products: [cartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    totalQuantity: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });



module.exports = mongoose.model("Cart", cartSchema);