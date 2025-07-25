import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/redux/slices/cartSlice";

const CartContents = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);

  const handleIncrement = (productId, color, currentQty) => {
    dispatch(
      updateCartItemQuantity({
        productId,
        quantity: currentQty + 1,
        color,
        userId: user?.id,
        guestId,
      })
    );
  };

  const handleDecrement = (productId, color, currentQty) => {
    if (currentQty > 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: currentQty - 1,
          color,
          userId: user?.id,
          guestId,
        })
      );
    }
  };

  const handleRemove = (productId, color) => {
    dispatch(
      removeFromCart({
        productId,
        color,
        userId: user?.id,
        guestId,
      })
    );
  };

  const subtotal = cart.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 space-y-4">
      {cart.products.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cart.products.map((product) => (
            <div
              key={product.productId + product.color}
              className="flex items-start justify-between border-b pb-4"
            >
              <div className="flex items-center">
                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/100x120?text=No+Image"
                  }
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4 rounded"
                />
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">Color: {product.color}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        handleDecrement(product.productId, product.color, product.quantity)
                      }
                      className="border rounded px-2 py-1 text-xl font-medium"
                      disabled={product.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-4">{product.quantity}</span>
                    <button
                      onClick={() =>
                        handleIncrement(product.productId, product.color, product.quantity)
                      }
                      className="border rounded px-2 py-1 text-xl font-medium"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-semibold mt-2">
                    ₹{(product.price * product.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(product.productId, product.color)}
              >
                <RiDeleteBin3Line className="h-6 w-6 text-red-600" />
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <h4 className="text-lg font-semibold">
              Subtotal: ₹{subtotal.toLocaleString()}
            </h4>
            <p className="text-sm text-gray-500">
              Shipping & taxes calculated at checkout.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartContents;
