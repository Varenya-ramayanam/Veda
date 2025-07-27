import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="p-6 text-center text-red-500">
        No order details found. Please go back to the home page.
        <br />
        <Link
          to="/"
          className="mt-4 inline-block bg-[#ea2e0e] hover:bg-[#d8270c] text-white font-semibold px-6 py-3 rounded-full transition duration-200"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const {
    _id,
    createdAt,
    products,
    address,
    totalPrice,
  } = order;

  const calculateEstimatedDeliveryDate = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 7);
    return orderDate.toLocaleDateString("en-GB");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10 bg-white">
      {/* ✅ Success Message */}
      <div className="text-center space-y-2">
        <FaCheckCircle className="text-6xl text-emerald-700 mx-auto" />
        <h1 className="text-4xl font-extrabold text-emerald-700">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 text-lg">
          Your order has been confirmed. You’ll receive an update when it ships.
        </p>
      </div>

      {/* ✅ Order Summary */}
      <div className="border rounded-xl p-6 shadow-sm bg-gradient-to-br from-orange-50 to-white space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Order ID</h2>
            <p className="text-gray-800">{_id}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Order Date</h2>
            <p className="text-gray-800">
              {new Date(createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Estimated Delivery
            </h2>
            <p className="text-green-600 font-medium">
              {calculateEstimatedDeliveryDate(createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Ordered Items */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Items Ordered</h2>
        <div className="space-y-4">
          {products.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border rounded-xl p-4 shadow-sm bg-white"
            >
              <img
                src={item.image || "https://via.placeholder.com/150?text=Image"}
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
          <h3 className="text-xl font-bold text-[#ea2e0e]">Total: ₹{totalPrice}</h3>
        </div>
      </div>

      {/* ✅ Shipping Address */}
      <div className="border rounded-xl p-6 shadow-sm bg-gray-50">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Shipping Address
        </h2>
        <p className="font-medium text-gray-800">
          {address.name} ({address.phone})
        </p>
        <p className="text-gray-600 text-sm">
          {address.doorNo}, {address.street},<br />
          {address.city} - {address.pincode}
        </p>
      </div>

      {/* ✅ Back to Home Button */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-block bg-[#ea2e0e] hover:bg-[#d8270c] text-white font-semibold px-6 py-3 rounded-full transition duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
