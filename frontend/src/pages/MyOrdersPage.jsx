import { useEffect, useState } from "react";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from the API
    setTimeout(() => {
      // Simulating an API call
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
        }
      ];
      setOrders(fetchedOrders);
      setLoading(false);
    }, 1000);
  }, []);

  return <div className="max-w-7xl mx-auto p-4 sm:p-6">
    <h2 className="text-xl sm:text-2xl font-bold mb-6">
        My Orders
    </h2>
    <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
            <th  className="bg-gray-100 text-xs uppercase text-gray-700">
                <tr className="py-2 px-4 sm:py-3">
                    Image
                </tr>
                <tr className="py-2 px-4 sm:py-3">
                    Order_id
                </tr>
                <tr className="py-2 px-4 sm:py-3">
                    createdAt
                </tr>
                <tr className="py-2 px-4 sm:py-3">
                    Address
                </tr>
                <tr className="py-2 px-4 sm:py-3">
                    Order_Items
                </tr>
                <tr className="py-2 px-4 sm:py-3">
                    Total_Price
                </tr>
                <tr className="py-2 px-4 sm:py-3">
                    Paid
                </tr>
            </th>
        </table>
    </div>
  </div>;
};

export default MyOrdersPage;
