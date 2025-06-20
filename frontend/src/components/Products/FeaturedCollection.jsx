import React from "react";
import { Link } from "react-router-dom";
import featured from "../../assets/images/featured.webp"
const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-8 rounded-3xl cursor-pointer">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 p-6 lg:p-12 shadow-xl rounded-3xl  bg-green-50">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <h3 className="text-3xl font-bold text-center text-green-600 uppercase tracking-wide">
            Featured Collection
          </h3>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Gifts for Every Occasion
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Discover our hand-picked selection of unique gifts perfect for birthdays, anniversaries, and every special moment. Thoughtful ideas to make your loved ones feel cherished.
          </p>
          <div>
            <Link
              to="/collections/all"
              className="inline-block bg-black text-white px-8 py-3 rounded-xl text-lg font-medium transition-all duration-300 hover:bg-gray-800"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2">
          <img
            src={featured}
            alt="Featured Collection"
            className="w-full h-auto object-cover rounded-3xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
