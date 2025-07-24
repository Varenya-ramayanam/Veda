import { useState } from "react";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import ProductGrid from "./ProductGrid";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const product = useSelector((state) => state.products?.product);

  const [selectedImage, setSelectedImage] = useState(product?.image?.[0]?.url || "");
  const [quantity, setQuantity] = useState(1);
  const [selectedDimension, setSelectedDimension] = useState(product?.dimensions?.[0] || "");

  const handleAddToCart = () => {
    if (!selectedDimension || quantity < 1) {
      toast.error("All fields are required to select.");
    } else {
      toast.success("Added to cart successfully!");
    }
  };

  if (!product) return <div className="text-center py-10">No product found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 w-full lg:w-11/12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start min-h-[600px]">
        {/* Left Image Section */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex lg:flex-col gap-4 justify-center">
            {product.image?.map((img, index) => (
              <img
                key={index}
                src={
                  img?.url
                    ? img.url.startsWith("http")
                      ? img.url
                      : `${import.meta.env.VITE_BACKEND_URL}${img.url}`
                    : "https://via.placeholder.com/100x120?text=No+Image"
                }
                alt={img?.altText || product.name}
                onClick={() => setSelectedImage(img.url)}
                className={`w-16 h-20 md:w-20 md:h-24 object-cover rounded-md cursor-pointer border-2 transition duration-200 ${
                  selectedImage === img.url ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={
                selectedImage?.startsWith("http")
                  ? selectedImage
                  : `${import.meta.env.VITE_BACKEND_URL}${selectedImage}`
              }
              alt="Selected Painting"
              className="w-full h-auto max-h-[600px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6 min-h-[600px] flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 justify-center">
              <span className="text-2xl md:text-3xl font-semibold text-red-600">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg md:text-xl line-through text-gray-400">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-4">
              {product.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 mt-4">
              <div>
                <span className="font-semibold">Material:</span> {product.material}
              </div>
              <div>
                <span className="font-semibold">Brand:</span> {product.brand}
              </div>
              <div>
                <span className="font-semibold">Dimensions:</span> {selectedDimension}
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-1 font-medium text-gray-800 text-sm">Select Dimensions:</label>
              <div className="flex flex-wrap gap-2">
                {product.dimensions?.map((dim, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDimension(dim)}
                    className={`px-2 py-1 text-sm rounded border ${
                      selectedDimension === dim
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300"
                    }`}
                  >
                    {dim}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <label className="font-medium text-base text-gray-800">Quantity:</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 text-xl"
                >
                  -
                </button>
                <span className="w-8 text-center text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 text-xl"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-black text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
