import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice"; // Adjust path as needed

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ isNewArrival: true, limit: 10 }));
  }, [dispatch]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">New Arrivals!!</h2>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Discover handpicked, thoughtful gifts to surprise your loved ones.
        </p>
      </div>

      {/* Scroll Buttons */}
      <div className="flex justify-end mb-6 gap-3 pr-10">
        <button
          onClick={() => scroll("left")}
          className="p-2 rounded-full bg-white shadow-md hover:scale-110 transform transition border"
        >
          <FiChevronLeft className="text-2xl text-gray-700" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-2 rounded-full bg-white shadow-md hover:scale-110 transform transition border"
        >
          <FiChevronRight className="text-2xl text-gray-700" />
        </button>
      </div>

      {/* Product Cards */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto px-6 no-scrollbar"
      >
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : products.length === 0 ? (
          <p>No new arrivals found.</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="relative min-w-[260px] h-72 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 group"
            >
              <img
                    src={product.image?.[0]?.url}
                    alt={product.image?.[0]?.altText || product.name}
                    className="w-full h-60 sm:h-64 object-cover"
                  />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-opacity flex flex-col justify-end p-5">
                <h3 className="text-white text-xl font-semibold mb-1 drop-shadow opacity-90">
                  {product.name}
                </h3>
                <p className="text-white text-sm font-medium opacity-75">
                  ₹{product.price}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}; 

export default NewArrivals;
