import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import { useSearchParams } from "react-router-dom";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    setTimeout(() => {
      let allProducts = [
        {
          _id: "1",
          name: "Handcrafted Brass Diya",
          price: 499,
          material: "Brass",
          category: "Gifts",
          deity: "Lakshmi",
          availability: "inStock",
          ecoFriendly: false,
          rating: 4,
          images: [
            { url: "https://picsum.photos/400/500?random=21", alt: "Diya" },
          ],
        },
        {
          _id: "2",
          name: "Terracotta Wall Hanging",
          price: 899,
          material: "Terracotta",
          category: "Arts",
          deity: "Hanuman",
          availability: "preOrder",
          ecoFriendly: true,
          rating: 5,
          images: [
            { url: "https://picsum.photos/400/500?random=22", alt: "Wall Art" },
          ],
        },
        {
          _id: "3",
          name: "Miniature Wooden Temple",
          price: 2499,
          material: "Wood",
          category: "Handcrafted Decor",
          deity: "Krishna",
          availability: "inStock",
          ecoFriendly: false,
          rating: 3,
          images: [
            { url: "https://picsum.photos/400/500?random=23", alt: "Temple" },
          ],
        },
        {
          _id: "4",
          name: "Eco-Friendly Ganesh Idol",
          price: 1299,
          material: "Eco-friendly Materials",
          category: "DIY & Craft Kits",
          deity: "Ganesha",
          availability: "inStock",
          ecoFriendly: true,
          rating: 5,
          images: [
            { url: "https://picsum.photos/400/500?random=24", alt: "Idol" },
          ],
        },
      ];

      const min = parseInt(searchParams.get("minPrice")) || 0;
      const max = parseInt(searchParams.get("maxPrice")) || 10000;
      const categories = searchParams.getAll("category");
      const materials = searchParams.getAll("material");
      const deities = searchParams.getAll("deity");
      const availability = searchParams.getAll("availability");
      const rating = parseInt(searchParams.get("rating")) || 0;
      const ecoFriendly = searchParams.get("ecoFriendly") === "true";
      const sortBy = searchParams.get("sortBy");

      let filtered = allProducts.filter((product) => {
        return (
          product.price >= min &&
          product.price <= max &&
          (categories.length === 0 || categories.includes(product.category)) &&
          (materials.length === 0 || materials.includes(product.material)) &&
          (deities.length === 0 || deities.includes(product.deity)) &&
          (availability.length === 0 ||
            availability.includes(product.availability)) &&
          (!ecoFriendly || product.ecoFriendly) &&
          product.rating >= rating
        );
      });

      if (sortBy === "priceLowHigh") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === "priceHighLow") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortBy === "newest") {
        filtered.sort((a, b) => b._id.localeCompare(a._id));
      }

      setProducts(filtered);
    }, 500);
  }, [searchParams]);

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

      {/* Sidebar - Mobile Overlay & Desktop Static */}
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

      {/* Product Content */}
      <div className="flex-1 p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-end items-center mb-4">
          <SortOptions />
        </div>
        {products.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">
            No products match your filters.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
              >
                <img
                  src={product.images[0].url}
                  alt={product.images[0].alt}
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
                      <span key={i}>{i < product.rating ? "★" : "☆"}</span>
                    ))}
                    <span className="ml-1 text-gray-600 text-xs">
                      ({product.rating})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;