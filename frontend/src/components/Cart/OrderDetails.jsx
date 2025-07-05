import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date().toISOString(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "PayPal",
      shippingMethod: "Standard Shipping",
      shippingAddress: {
        name: "John Doe",
        phone: "1234567890",
        doorNo: "123",
        street: "Main St",
        city: "Cityville",
        pincode: "123456",
      },
      checkoutItems: [
        {
          productId: 1,
          name: "KeyChain",
          type: "Customized",
          quantity: 1,
          price: 200,
          image: "https://picsum.photos/id/1/200/200?random=1",
        },
        {
          productId: 2,
          name: "KeyChain",
          type: "Customized",
          quantity: 1,
          price: 200,
          image: "https://picsum.photos/id/2/200/200?random=2",
        },
        {
          productId: 3,
          name: "KeyChain",
          type: "Customized",
          quantity: 2,
          price: 200,
          image: "https://picsum.photos/id/3/200/200?random=3",
        },
      ],
    };
    setOrder(mockOrderDetails);
  }, [id]);

  if (!order) return <p className="p-6 text-center text-gray-600">No order details found.</p>;

  const {
    _id,
    createdAt,
    isPaid,
    isDelivered,
    paymentMethod,
    shippingMethod,
    shippingAddress,
    checkoutItems,
  } = order;

  const totalAmount = checkoutItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      <h2 className="text-3xl font-bold text-[#ea2e0e]">Order Details</h2>

      {/* Order Info */}
      <div className="p-6 rounded-xl border shadow-sm bg-gray-50 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between">
          <div>
            <h3 className="text-lg font-semibold">Order ID:</h3>
            <p className="text-gray-700">{_id}</p>
            <p className="text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-4 sm:mt-0">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${
                isPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-600"
              }`}
            >
              {isPaid ? "Payment Approved" : "Payment Pending"}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${
                isDelivered ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {isDelivered ? "Delivered" : "Not Delivered"}
            </span>
          </div>
        </div>

        {/* Shipping & Payment Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment</h4>
            <p className="text-gray-700">Method: {paymentMethod}</p>
            <p className="text-gray-700">Status: {isPaid ? "Paid" : "Pending"}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Shipping</h4>
            <p className="text-gray-700">Method: {shippingMethod}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Address</h4>
            <p className="text-gray-700 text-sm leading-6">
              {shippingAddress.name} ({shippingAddress.phone})<br />
              {shippingAddress.doorNo}, {shippingAddress.street},<br />
              {shippingAddress.city} - {shippingAddress.pincode}
            </p>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div>
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Ordered Products</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-xl shadow-sm bg-white">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">Unit Price</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {checkoutItems.map((item) => (
                <tr key={item.productId} className="border-t">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <Link
                      to={`/product/${item.productId}`}
                      className="text-blue-600 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">₹{item.price}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    ₹{item.price * item.quantity}
                  </td>
                </tr>
              ))}
              <tr className="font-semibold text-gray-800 border-t">
                <td colSpan="3" className="px-6 py-4 text-right">
                  Total Amount:
                </td>
                <td className="px-6 py-4 text-[#ea2e0e] font-bold text-lg">
                  ₹{totalAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Back to Orders */}
      <div className="text-center mt-8">
        <Link
          to="/my-orders"
          className="inline-block bg-[#ea2e0e] hover:bg-[#d8270c] text-white font-semibold px-6 py-3 rounded-full transition duration-200"
        >
          Back to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;
