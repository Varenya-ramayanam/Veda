import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "@/redux/slices/productSlice";
import { addToCart } from "@/redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const productFetchId = productId || id;

  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const product = selectedProduct;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setSelectedImage(product.image[0].url);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product || !product._id) {
      toast.error("Product not found");
      return;
    }
 
    if (quantity < 1) {
      toast.error("Please select a valid quantity.");
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: product._id,
        quantity,
        guestId,
        userId: user?.id,
        color: product.color || "default", // Assuming product has a color field
      })
    )
      .then(() => {
        toast.success("Product added to cart successfully!");
        setQuantity(1);
      })
      .catch(() => {
        toast.error("Failed to add product to cart.");
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
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
              alt="Selected Product"
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
                <span className="font-semibold">Material:</span>{" "}
                {product.material}
              </div>
              <div>
                <span className="font-semibold">Brand:</span> {product.brand}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <label className="font-medium text-base text-gray-800">
                Quantity:
              </label>
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
            disabled={isButtonDisabled}
            className="mt-6 w-full bg-black text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition"
          >
            {isButtonDisabled ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
