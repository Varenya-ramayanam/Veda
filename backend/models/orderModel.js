const mongoose = require("mongoose");
const checkoutItemSchema = require("./checkOutModel");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products: [checkoutItemSchema],  // Embedded schema
  address: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    doorNo: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  totalPrice: {
    type: Number,
    required: true
  },
  totalQuantity: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ["Stripe", "PayPal", "Razorpay"],
    required: true
  },
  status: {
    type: String,
    enum: ["Confirmed", "Shipped", "Delivered", "Cancelled"],
    default: "Confirmed"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  isDeliveredAt: {
    type: Date
  }  
});

module.exports = mongoose.model("Order", orderSchema);
