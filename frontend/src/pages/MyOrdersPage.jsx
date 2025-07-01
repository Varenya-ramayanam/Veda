import { useEffect, useState } from "react";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const fetchedOrders = [
        {
          _id: 1,
          item: "Product 1",
          createdAt: new Date(),
          address: "123 Main St",
          orderItems: [
            {
              id: 1,
              name: "Product 1",
              quantity: 2,
              price: 20,
              image: "https://picsum.photos/200/300?random=1",
            },
          ],
          totalPrice: 40,
          isPaid: true,
        },
        {
          _id: 2,
          item: "Product 2",
          createdAt: new Date(),
          address: "456 Elm St",
          orderItems: [
            {
              id: 2,
              name: "Product 2",
              quantity: 1,
              price: 30,
              image: "https://picsum.photos/200/300?random=2",
            },
          ],
          totalPrice: 30,
          isPaid: false,
        },
        {
          _id: 3,
          item: "Product 3",
          createdAt: new Date(),
          address: "789 Oak St",
          orderItems: [
            {
              id: 3,
              name: "Product 3",
              quantity: 3,
              price: 15,
              image: "https://picsum.photos/200/300?random=3",
            },
          ],
          totalPrice: 45,
          isPaid: true,
        },
      ];
      setOrders(fetchedOrders);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading orders...</div>
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Paid</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="bg-white border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-12 h-12 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="py-3 px-4">#{order._id}</td>
                  <td className="py-3 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{order.address}</td>
                  <td className="py-3 px-4">
                    {order.orderItems.map((item) => (
                      <div key={item.id}>
                        {item.name} × {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-4 font-medium">₹{order.totalPrice}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
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

export default MyOrdersPage;
