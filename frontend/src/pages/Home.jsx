import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice"; // Adjust path as needed

import Hero from "../components/Layout/User-components/Hero";
import Collection from "../components/Products/Collection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSelection from "../components/Products/FeaturesSelection";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 20 })); // You can adjust the limit
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <Collection />
      <NewArrivals />

      {/* Best Sellers */}
      <h2 className="text-3xl text-center font-bold mb-4 mt-5">
        Best Seller
      </h2>
      <ProductDetails />

      <div className="container mx-auto px-4 mb-10 mt-10">
        <h2 className="text-3xl text-center font-bold mb-4">Gallery</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : products.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>

      <FeaturedCollection />
      <FeaturesSelection />
    </div>
  );
};

export default Home;
