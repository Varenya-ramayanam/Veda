import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders as fetchAdminOrders,
} from "../redux/slices/adminOrderslice";
import {
  fetchAdminProducts,
} from "../redux/slices/adminProductSlice";
import {
  FaBox,
  FaClipboardList,
  FaCubes,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTruck,
  FaClock,
} from "react-icons/fa";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const { orders, totalOrders, totalSales, loading: orderLoading } = useSelector(
    (state) => state.adminOrders
  );
  const { products, loading: productLoading } = useSelector(
    (state) => state.adminProducts
  );

  useEffect(() => {
    dispatch(fetchAdminOrders());
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const statusColors = {
    Processing: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  const statusIcons = {
    Processing: <FaClock className="text-yellow-500" />,
    Shipped: <FaTruck className="text-blue-500" />,
    Delivered: <FaCheckCircle className="text-green-500" />,
    Cancelled: <FaClock className="text-red-500" />,
  };

  const recentOrders = orders?.slice(0, 5) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#ea2e0e] mb-10">Admin Dashboard</h1>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h2 className="text-2xl font-bold text-gray-800">₹{totalSales?.toFixed(2) || 0}</h2>
          </div>
          <FaMoneyBillWave className="text-3xl text-[#ea2e0e]" />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h2 className="text-2xl font-bold text-gray-800">{totalOrders || 0}</h2>
          </div>
          <FaClipboardList className="text-3xl text-[#ea2e0e]" />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <h2 className="text-2xl font-bold text-gray-800">{products.length || 0}</h2>
          </div>
          <FaCubes className="text-3xl text-[#ea2e0e]" />
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaBox className="text-[#ea2e0e]" />
          Recent Orders
        </h2>

        {orderLoading ? (
          <p className="text-gray-500">Loading recent orders...</p>
        ) : (
          <ul className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <li
                  key={order._id}
                  className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {order.address?.name || "Customer"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-gray-700">
                      ₹{order.totalPrice.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    {statusIcons[order.status] || <FaClock className="text-gray-400" />}
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[order.status] || "bg-gray-200 text-gray-700"}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No recent orders.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;
