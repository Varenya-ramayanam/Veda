import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from "@/redux/slices/cartSlice";
import axios from "axios";

const Checkout = () => {
  const { cart } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    doorNo: "",
    street: "",
    city: "",
    pincode: "",
  });

  const [selectedPayment, setSelectedPayment] = useState("Stripe");

  // Load saved address from user profile if exists
  useEffect(() => {
    if (user?.address) {
      setNewAddress(user.address);
    }
  }, [user]);

  const handleRemove = (productId, color) => {
    dispatch(removeFromCart({ productId, color, userId: user?.id, guestId }));
    toast.error("Removed from cart");
  };

  const handleSaveForLater = (productId, color) => {
    dispatch(removeFromCart({ productId, color, userId: user?.id, guestId }));
    toast.success("Saved for later");
  };

  const handleQuantityChange = (productId, color, amount, currentQty) => {
    const newQty = Math.max(1, currentQty + amount);
    dispatch(
      updateCartItemQuantity({
        productId,
        color,
        quantity: newQty,
        userId: user?.id,
        guestId,
      })
    );
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const isAddressComplete = Object.values(newAddress).every((val) => val.trim() !== "");

  const handlePlaceOrder = async () => {
    if (!isAddressComplete) return toast.error("Please complete the address");

    if (cart.products.length === 0) return toast.error("Cart is empty");

    try {
      const createRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/create`,
        {
          userId: user?.id,
          guestId,
          address: newAddress,
          cartItems: cart.products,
        }
      );
      const sessionId = createRes.data.sessionId;

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/pay`, {
        sessionId,
        paymentMethod: selectedPayment,
      });

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/finalize`,
        { sessionId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      dispatch(clearCart());
      toast.success("Order placed successfully!");
      navigate("/my-orders");
    } catch (err) {
      toast.error(err.response?.data?.message || "Order failed. Try again.");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold text-indigo-700 text-center">Checkout</h1>

      {/* CART PRODUCTS */}
      <div className="grid md:grid-cols-2 gap-6">
        {cart.products.length > 0 ? (
          cart.products.map((item) => (
            <div
              key={item.productId + item.color}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row items-start gap-4"
            >
              <img
                src={item.image || "https://via.placeholder.com/150?text=No+Image"}
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
                    onClick={() =>
                      handleQuantityChange(item.productId, item.color, -1, item.quantity)
                    }
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.productId, item.color, 1, item.quantity)
                    }
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleRemove(item.productId, item.color)}
                    className="text-sm text-red-500 flex items-center gap-2 hover:underline"
                  >
                    <FaTrash /> Remove
                  </button>
                  <button
                    onClick={() => handleSaveForLater(item.productId, item.color)}
                    className="text-sm text-blue-500 flex items-center gap-2 hover:underline"
                  >
                    <FaHeart /> Save for Later
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-2">Your cart is empty.</p>
        )}
      </div>

      {/* ADDRESS + PAYMENT */}
      <div className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Address</h2>

        {user?.address && (
          <button
            onClick={() => setNewAddress(user.address)}
            className="mb-4 text-sm text-indigo-600 hover:underline"
          >
            Use My Saved Address
          </button>
        )}

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

        {/* Payment */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="Stripe"
                checked={selectedPayment === "Stripe"}
                onChange={(e) => setSelectedPayment(e.target.value)}
              />
              Stripe
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="Razorpay"
                checked={selectedPayment === "Razorpay"}
                onChange={(e) => setSelectedPayment(e.target.value)}
              />
              Razorpay
            </label>
          </div>
        </div>

        {/* Place Order */}
        <button
          onClick={handlePlaceOrder}
          disabled={!isAddressComplete || cart.products.length === 0}
          className={`mt-6 w-full sm:w-auto px-6 py-3 rounded text-white font-semibold ${
            isAddressComplete && cart.products.length > 0
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          } transition`}
        >
          Confirm Payment & Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
