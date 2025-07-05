import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const checkout = {
  _id: "12345",
  createdAt: new Date().toISOString(),
  checkoutItems: [
    {
      productId: 1,
      name: "KeyChain",
      color: "Customized",
      quantity: 1,
      price: 200,
      image: "https://picsum.photos/id/1/200/200?random=1",
    },
    {
      productId: 2,
      name: "KeyChain",
      color: "Customized",
      quantity: 1,
      price: 200,
      image: "https://picsum.photos/id/2/200/200?random=2",
    },
    {
      productId: 3,
      name: "KeyChain",
      color: "Customized",
      quantity: 1,
      price: 200,
      image: "https://picsum.photos/id/3/200/200?random=3",
    },
  ],
};

const shippingAddress = {
  name: "John Doe",
  phone: "1234567890",
  doorNo: "123",
  street: "Main St",
  city: "Cityville",
  pincode: "123456",
};

const OrderConfirmationPage = () => {
  const totalAmount = checkout.checkoutItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const calculateEstimatedDeliveryDate = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 7);
    return orderDate.toLocaleDateString("en-GB"); // dd/mm/yyyy
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10 bg-white">
      {/* Thank You */}
      <div className="text-center space-y-2">
        <FaCheckCircle className="text-6xl text-emerald-700 mx-auto" />
        <h1 className="text-4xl font-extrabold text-emerald-700">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 text-lg">
          Your order has been confirmed. You’ll receive an update when it ships.
        </p>
      </div>

      {/* Order Summary */}
      <div className="border rounded-xl p-6 shadow-sm bg-gradient-to-br from-orange-50 to-white space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Order ID</h2>
            <p className="text-gray-800">{checkout._id}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Order Date</h2>
            <p className="text-gray-800">
              {new Date(checkout.createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Estimated Delivery
            </h2>
            <p className="text-green-600 font-medium">
              {calculateEstimatedDeliveryDate(checkout.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Item List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Items Ordered</h2>
        <div className="space-y-4">
          {checkout.checkoutItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 border rounded-xl p-4 shadow-sm bg-white"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm">Color: {item.color}</p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p className="text-lg font-bold text-[#ea2e0e]">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
        <div className="text-right mt-6">
          <h3 className="text-xl font-bold text-[#ea2e0e]">
            Total: ₹{totalAmount}
          </h3>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="border rounded-xl p-6 shadow-sm bg-gray-50">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Shipping Address
        </h2>
        <p className="font-medium text-gray-800">
          {shippingAddress.name} ({shippingAddress.phone})
        </p>
        <p className="text-gray-600 text-sm">
          {shippingAddress.doorNo}, {shippingAddress.street},<br />
          {shippingAddress.city} - {shippingAddress.pincode}
        </p>
      </div>

      {/* Back to Home Button */}
      <div className="text-center">
        <a
          href="/"
          className="inline-block bg-[#ea2e0e] hover:bg-[#d8270c] text-white font-semibold px-6 py-3 rounded-full transition duration-200"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
