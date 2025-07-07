import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const initialOrders = [
  {
    id: "#67540ced3376121b361a0ed0",
    customer: "Admin User",
    totalPrice: 199.96,
    status: "Processing",
  },
  {
    id: "#67540d3ca67b4a70e434e092",
    customer: "Admin User",
    totalPrice: 40.0,
    status: "Processing",
  },
  {
    id: "#675bf2c6ca77bd83eefd7a18",
    customer: "Admin User",
    totalPrice: 39.99,
    status: "Processing",
  },
  {
    id: "#675c24b09b88827304bd5cc1",
    customer: "Admin User",
    totalPrice: 39.99,
    status: "Processing",
  },
];

const statusOptions = ["Processing", "Shipped", "Delivered", "Cancelled"];

const OrderManagement = () => {
  const [orders, setOrders] = useState(initialOrders);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Status updated to ${newStatus}`);
  };

  const markAsDelivered = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "Delivered" } : order
      )
    );
    toast.success("Order marked as Delivered");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#ea2e0e] mb-6">Order Management</h2>

      <div className="overflow-x-auto shadow border rounded-lg bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Total Price</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4 font-semibold text-gray-700">
                  ${order.totalPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border rounded px-2 py-1 bg-white"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                    disabled={order.status === "Delivered"}
                    onClick={() => markAsDelivered(order.id)}
                  >
                    Mark as Delivered
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
