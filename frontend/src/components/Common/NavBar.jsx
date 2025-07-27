import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/User-components/CartDrawer";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleCartDrawer = () => setDrawerOpen((prev) => !prev);
  const toggleNavDrawer = () => setNavDrawerOpen((prev) => !prev);

  // ✅ Get user from Redux
  const user = useSelector((state) => state.auth.user);

  // ✅ Get cart quantity from Redux with fallback
  const cartQuantity = useSelector((state) => {
    const fallback = { totalQuantity: 0 };
    const cart = state?.cart?.cart || fallback;
    return cart.totalQuantity;
  });

  const navLinks = [
    {
      label: "Gifts",
      path: "/collections/all?collections=Gifts&priceMin=0&priceMax=10000&sort=relevance",
    },
    {
      label: "Arts",
      path: "/collections/all?collections=Arts&priceMin=0&priceMax=10000&sort=relevance",
    },
    {
      label: "Handcrafted Decor",
      path: "/collections/all?collections=Decor&priceMin=0&priceMax=10000&sort=relevance",
    },
    {
      label: "DIY & Craft Kits",
      path: "/collections/all?collections=DIY&priceMin=0&priceMax=10000&sort=relevance",
    },
  ];

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="text-2xl font-medium">
          Veda
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-gray-700 hover:text-black text-sm font-medium uppercase"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-5">
          {/* ✅ Admin Panel Link */}
          {user && user?.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-black px-2 rounded text-sm text-white"
            >
              Admin
            </Link>
          )}

          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          {/* ✅ Cart with dynamic quantity */}
          <button
            className="relative hover:text-black"
            onClick={toggleCartDrawer}
            aria-label="Open cart"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartQuantity > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-0.5">
                {cartQuantity}
              </span>
            )}
          </button>

          <div className="overflow-hidden">
            <SearchBar />
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={toggleNavDrawer}>
            <HiBars3BottomRight />
          </button>
        </div>
      </nav>

      {/* ✅ Cart drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* ✅ Mobile nav drawer */}
      <div
        className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="flex flex-col gap-4 px-6 mt-4">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-gray-700 text-sm font-medium"
              onClick={toggleNavDrawer}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavBar;
