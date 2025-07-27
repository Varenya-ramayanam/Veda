import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setOrder(res.data);
      setError(null);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch order";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      setCancelLoading(true);
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      toast.success("Order cancelled successfully!");
      await fetchOrder();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cancel failed");
    } finally {
      setCancelLoading(false);
    }
  };

  if (loading) return <p className="p-6 text-center text-gray-500">Loading order...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!order) return <p className="p-6 text-center text-gray-500">No order found.</p>;

  const {
    _id,
    createdAt,
    status,
    isDelivered,
    paymentMethod,
    address,
    products,
    totalPrice,
  } = order;

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
                status === "Cancelled"
                  ? "bg-red-100 text-red-600"
                  : status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {status}
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

        {/* Payment & Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment</h4>
            <p className="text-gray-700">Method: {paymentMethod}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Address</h4>
            <p className="text-gray-700 text-sm leading-6">
              {address?.name} ({address?.phone})<br />
              {address?.doorNo}, {address?.street},<br />
              {address?.city} - {address?.pincode}
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
              {products.map((item) => (
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
                <td className="px-6 py-4 text-[#ea2e0e] font-bold text-lg">₹{totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/my-orders"
          className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-full transition duration-200"
        >
          Back to Orders
        </Link>

        {status !== "Cancelled" && status !== "Delivered" && (
          <button
            onClick={handleCancelOrder}
            disabled={cancelLoading}
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition duration-200"
          >
            {cancelLoading ? "Cancelling..." : "Cancel Order"}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
