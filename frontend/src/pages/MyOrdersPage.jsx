import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        setOrders(res.data.orders);
      } catch (err) {
        const errMsg = err.response?.data?.message || "Failed to fetch orders";
        setError(errMsg);
        toast.error(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading orders...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        <>
          {/* Table View */}
          <div className="hidden sm:block overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                <tr>
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="bg-white border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4">
                      {order.products?.[0]?.image ? (
                        <img
                          src={order.products[0].image}
                          alt={order.products[0].name}
                          className="w-12 h-12 object-cover rounded-lg border"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-xs text-gray-500 rounded-lg">
                          N/A
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Link to={`/order/${order._id}`} className="text-blue-600 hover:underline">
                        #{order._id}
                      </Link>
                    </td>
                    <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
                    <td className="py-3 px-4 text-sm">
                      {order.address?.doorNo}, {order.address?.street},{" "}
                      {order.address?.city} - {order.address?.pincode}
                    </td>
                    <td className="py-3 px-4">
                      {order.products?.map((item, i) => (
                        <div key={i}>
                          {item.name} × {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-4 font-medium">₹{order.totalPrice}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card View */}
          <div className="sm:hidden space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/order/${order._id}`}
                className="block bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4 mb-2">
                  {order.products?.[0]?.image ? (
                    <img
                      src={order.products[0].image}
                      alt={order.products[0].name}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-700 font-medium">Order #{order._id}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  <strong>Address:</strong>{" "}
                  {order.address?.doorNo}, {order.address?.street},{" "}
                  {order.address?.city} - {order.address?.pincode}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  <strong>Items:</strong>{" "}
                  {order.products
                    ?.map((item) => `${item.name} × ${item.quantity}`)
                    .join(", ")}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  <strong>Total:</strong> ₹{order.totalPrice}
                </div>
                <div>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrdersPage;
