import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import { Link, useSearchParams } from "react-router-dom";

const CollectionPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const [searchParams] = useSearchParams();

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  useEffect(() => {
    const queryObject = {
      priceMin: parseInt(searchParams.get("priceMin")) || 0,
      priceMax: parseInt(searchParams.get("priceMax")) || 10000,
      ratingMin: parseInt(searchParams.get("ratingMin")) || 0,
      collections: searchParams.get("collections"),
      category: searchParams.get("category"),
      material: searchParams.get("material"),
      color: searchParams.get("color"),
      ecoFriendly: searchParams.get("ecoFriendly") === "true",
      sort: searchParams.get("sort"), // ✅ renamed
      search: searchParams.get("search") || "",
      page: parseInt(searchParams.get("page")) || 1,
      limit: parseInt(searchParams.get("limit")) || 20,
      tags: searchParams.getAll("tags"),
      stockAvailability: searchParams.get("stockAvailability"),
    };

    dispatch(fetchProducts(queryObject));
  }, [searchParams, dispatch]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Mobile Filter Button */}
      <div className="lg:hidden p-4 border-b flex justify-between items-center bg-white sticky top-0 z-20 shadow-sm">
        <h1 className="text-xl font-semibold">Our Collection</h1>
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-2 text-sm border px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          <FaFilter /> Filters
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed lg:static top-0 left-0 z-30 h-full lg:h-auto w-72 lg:w-64 bg-white border-r p-4 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      {/* Overlay on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Products Section */}
      <div className="flex-1 p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-end items-center mb-4">
          <SortOptions />
        </div>

        {loading ? (
          <p className="text-center text-gray-500 mt-20">Loading...</p>
        ) : !Array.isArray(products) || products.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">
            No products match your filters.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                  <img
                    src={product.image?.[0]?.url}
                    alt={product.image?.[0]?.altText || product.name}
                    className="w-full h-60 sm:h-64 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-indigo-600 font-bold mt-2 text-base">
                      ₹{product.price}
                    </p>
                    <div className="flex items-center mt-1 text-yellow-500 text-sm">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i}>
                          {i < Math.floor(product.rating) ? "★" : "☆"}
                        </span>
                      ))}
                      <span className="ml-1 text-gray-600 text-xs">
                        ({product.rating})
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
