import React, { useState } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContents = () => {
  const [cartProducts, setCartProducts] = useState([
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
      image: "https://picsum.photos/id/1/200/200?random=1",
    },
    {
      productId: 3,
      name: "KeyChain",
      color: "Customized",
      quantity: 1,
      price: 200,
      image: "https://picsum.photos/id/1/200/200?random=1",
    },
    {
      productId: 4,
      name: "KeyChain",
      color: "Customized",
      quantity: 1,
      price: 200,
      image: "https://picsum.photos/id/1/200/200?random=1",
    },

  ]);

  // Increment quantity
  const handleIncrement = (index) => {
    const updatedProducts = [...cartProducts];
    updatedProducts[index].quantity += 1;
    setCartProducts(updatedProducts);
  };

  // Decrement quantity (minimum 1)
  const handleDecrement = (index) => {
    const updatedProducts = [...cartProducts];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1;
      setCartProducts(updatedProducts);
    }
  };

  // Remove item
  const handleRemove = (productId) => {
    const updatedProducts = cartProducts.filter(
      (product) => product.productId !== productId
    );
    setCartProducts(updatedProducts);
  };

  // Calculate subtotal
  const subtotal = cartProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 space-y-4">
      {cartProducts.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cartProducts.map((product, index) => (
            <div
              key={product.productId}
              className="flex items-start justify-between border-b pb-4"
            >
              <div className="flex items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4 rounded"
                />
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">Color: {product.color}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecrement(index)}
                      className="border rounded px-2 py-1 text-xl font-medium"
                    >
                      -
                    </button>
                    <span className="mx-4">{product.quantity}</span>
                    <button
                      onClick={() => handleIncrement(index)}
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
              <button onClick={() => handleRemove(product.productId)}>
                <RiDeleteBin3Line className="h-6 w-6 text-red-600" />
              </button>
            </div>
          ))}

          {/* Subtotal section */}
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
