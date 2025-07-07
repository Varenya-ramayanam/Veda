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
  const orders = [
    {
      id: 1,
      customerName: "John Doe",
      totalAmount: 150.0,
      status: "Pending",
      date: "2023-10-01",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      totalAmount: 200.0,
      status: "Shipped",
      date: "2023-10-02",
    },
    {
      id: 3,
      customerName: "Alice Johnson",
      totalAmount: 300.0,
      status: "Delivered",
      date: "2023-10-03",
    },
  ];

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const totalOrders = orders.length;
  const totalProducts = 12;

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
  };

  const statusIcons = {
    Pending: <FaClock className="text-yellow-500" />,
    Shipped: <FaTruck className="text-blue-500" />,
    Delivered: <FaCheckCircle className="text-green-500" />,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#ea2e0e] mb-10">Admin Dashboard</h1>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h2 className="text-2xl font-bold text-gray-800">₹{totalRevenue.toFixed(2)}</h2>
          </div>
          <FaMoneyBillWave className="text-3xl text-[#ea2e0e]" />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h2 className="text-2xl font-bold text-gray-800">{totalOrders}</h2>
          </div>
          <FaClipboardList className="text-3xl text-[#ea2e0e]" />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <h2 className="text-2xl font-bold text-gray-800">{totalProducts}</h2>
          </div>
          <FaCubes className="text-3xl text-[#ea2e0e]" />
        </div>
      </div>

      {/* Full-width Recent Orders Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaBox className="text-[#ea2e0e]" />
          Recent Orders
        </h2>

        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{order.customerName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-lg font-semibold text-gray-700">
                  ₹{order.totalAmount.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2">
                {statusIcons[order.status]}
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[order.status]}`}
                >
                  {order.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminHomePage;
