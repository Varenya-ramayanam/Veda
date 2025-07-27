const Order = require("../models/orderModel");


const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    res.status(200).json({
      orders,
      totalOrders,
      totalSales,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update fields
        order.status = req.body.status || order.status;

        if (req.body.status === "Delivered") {
            order.isDelivered = true;
            order.isDeliveredAt = Date.now();
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
 

const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


    module.exports = {
    getOrders,
    updateOrder,
    deleteOrder
}