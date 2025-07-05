import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const cartProducts = [
  {
    productId: 1,
    name: "KeyChain",
    color: "Customized",
    quantity: 1,
    price: 200,
    image: "https://picsum.photos/id/1/200/200?random=1",
  },
  {
    productId: 2,
    name: "KeyChain",
    color: "Customized",
    quantity: 1,
    price: 200,
    image: "https://picsum.photos/id/2/200/200?random=2",
  },
  {
    productId: 3,
    name: "KeyChain",
    color: "Customized",
    quantity: 1,
    price: 200,
    image: "https://picsum.photos/id/3/200/200?random=3",
  },
  {
    productId: 4,
    name: "KeyChain",
    color: "Customized",
    quantity: 1,
    price: 200,
    image: "https://picsum.photos/id/4/200/200?random=4",
  },
];

const Checkout = () => {
  const [cartItems, setCartItems] = useState(cartProducts);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    doorNo: "",
    street: "",
    city: "",
    pincode: "",
  });
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.productId !== id));
    toast.success("Removed from cart");
  };

  const handleSaveForLater = (id) => {
    setCartItems(cartItems.filter((item) => item.productId !== id));
    toast.success("Saved for later");
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = () => {
    if (Object.values(newAddress).some((val) => val.trim() === "")) {
      return toast.error("Please fill in all address fields.");
    }
    setAddresses([...addresses, newAddress]);
    setNewAddress({
      name: "",
      phone: "",
      doorNo: "",
      street: "",
      city: "",
      pincode: "",
    });
    toast.success("Address added");
  };

  const handleQuantityChange = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const handleAddressSelect = (idx) => {
    setSelectedAddressIndex(idx);
    toast.success("Address selected");
  };

  const handleProceedToPayment = () => {
    if (selectedAddressIndex !== null) {
      navigate("/payment");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold text-indigo-700 text-center">Checkout</h1>

      {/* CART PRODUCTS */}
      <div className="grid md:grid-cols-2 gap-6">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row items-start gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-indigo-600 font-bold text-lg">
                  ₹{item.price * item.quantity}
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-1">Color: {item.color}</p>
              <div className="flex items-center mt-3 space-x-3">
                <button
                  onClick={() => handleQuantityChange(item.productId, -1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  −
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.productId, 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="text-sm text-red-500 flex items-center gap-2 hover:underline"
                >
                  <FaTrash /> Remove
                </button>
                <button
                  onClick={() => handleSaveForLater(item.productId)}
                  className="text-sm text-blue-500 flex items-center gap-2 hover:underline"
                >
                  <FaHeart /> Save for Later
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADDRESS FORM */}
      <div className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Address</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {["name", "phone", "doorNo", "street", "city", "pincode"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              value={newAddress[field]}
              onChange={handleAddressChange}
              className="border p-2 rounded-md focus:outline-indigo-500"
            />
          ))}
        </div>
        <button
          onClick={handleAddAddress}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Add Address
        </button>

        {/* SAVED ADDRESSES */}
        {addresses.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3 text-gray-700">Saved Addresses</h3>
            <ul className="space-y-3">
              {addresses.map((addr, idx) => (
                <li
                  key={idx}
                  onClick={() => handleAddressSelect(idx)}
                  className={`border p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition ${
                    selectedAddressIndex === idx ? "border-indigo-600 bg-indigo-50" : ""
                  }`}
                >
                  <p className="font-semibold">{addr.name} ({addr.phone})</p>
                  <p className="text-sm text-gray-600">
                    {addr.doorNo}, {addr.street}, {addr.city} - {addr.pincode}
                  </p>
                </li>
              ))}
            </ul>
            <button
              onClick={handleProceedToPayment}
              disabled={selectedAddressIndex === null}
              className={`mt-4 px-6 py-2 rounded text-white w-full sm:w-auto ${
                selectedAddressIndex !== null
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              } transition`}
            >
                Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
