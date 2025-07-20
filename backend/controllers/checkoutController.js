const Cart = require("../models/cartModel");
const Order = require("../models/orderModel"); // You need to create this model
const uuid = require("uuid");

// Store temp checkout sessions in-memory for now (can be replaced with Redis)
const checkoutSessions = {};

const createCheckout = async (req, res) => {
  const { userId, guestId, address, cartItems } = req.body;
  try {
    if (!address || cartItems.length === 0) {
      return res.status(400).json({ message: "Address or cart items missing" });
    }

    const sessionId = uuid.v4();
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    checkoutSessions[sessionId] = {
      userId,
      guestId,
      address,
      cartItems,
      totalPrice,
      totalQuantity,
      paid: false
    };

    return res.status(200).json({ message: "Checkout session created", sessionId });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const payForOrder = async (req, res) => {
  const { sessionId, paymentMethod } = req.body;
  try {
    const session = checkoutSessions[sessionId];
    if (!session) return res.status(404).json({ message: "Invalid session ID" });

    session.paid = true;
    session.paymentMethod = paymentMethod;

    return res.status(200).json({ message: `Payment successful via ${paymentMethod}` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const finalizeOrder = async (req, res) => {
  const { sessionId } = req.body;
  const userId = req.user._id;

  try {
    const session = checkoutSessions[sessionId];
    if (!session || !session.paid) {
      return res.status(400).json({ message: "Checkout session not found or not paid" });
    }

    const newOrder = new Order({
      userId,
      products: session.cartItems,
      address: session.address,
      totalPrice: session.totalPrice,
      totalQuantity: session.totalQuantity,
      paymentMethod: session.paymentMethod,
      status: "Confirmed",
      createdAt: new Date()
    });

    await newOrder.save();

    // Clear cart after order is finalized
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { products: [], totalPrice: 0, totalQuantity: 0 } }
    );

    // Delete session from memory
    delete checkoutSessions[sessionId];

    return res.status(200).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createCheckout,
  payForOrder,
  finalizeOrder
};
