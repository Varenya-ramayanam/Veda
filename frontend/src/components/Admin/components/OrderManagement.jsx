import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
  fetchOrders,
  updateOrderStatus,
} from "../../../redux/slices/adminOrderslice";

const statusOptions = ["Confirmed", "Shipped", "Delivered", "Cancelled"];

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.adminOrders); // Correct slice

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status: newStatus })).unwrap();
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      toast.error(err?.message || "Failed to update status");
    }
  };

  const markAsDelivered = (orderId) => {
    handleStatusChange(orderId, "Delivered");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#ea2e0e] mb-6">Order Management</h2>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
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
                <tr key={order._id}>
                  <td className="px-6 py-4 font-mono text-xs">{order._id.slice(-12)}</td>
                  <td className="px-6 py-4">{order?.address?.name || "Customer"}</td>
                  <td className="px-6 py-4 font-semibold text-gray-700">
                    ₹{order.totalPrice?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
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
                      onClick={() => markAsDelivered(order._id)}
                    >
                      Mark as Delivered
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
