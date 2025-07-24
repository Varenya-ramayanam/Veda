import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => {

        return (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="block"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
              <div className="w-full h-96 mb-4">
                <img
                  src={
                    product.image?.[0]?.url
                      ? product.image[0].url.startsWith("http")
                        ? product.image[0].url
                        : `${import.meta.env.VITE_BACKEND_URL}${
                            product.image[0].url
                          }`
                      : "https://via.placeholder.com/400x500?text=No+Image"
                  }
                  alt={product.image?.[0]?.altText || product.name}
                  className = "w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <h3 className="text-sm font-semibold mb-1 truncate">
                {product.name}
              </h3>
              <p className="text-gray-600 font-medium text-sm tracking-tight">
                ₹{product.price}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;

