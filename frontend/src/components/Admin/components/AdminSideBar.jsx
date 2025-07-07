import React from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";

const AdminSideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    // window.location.href = "/login";
    navigate("");
  };

  return (
    <div className="p-6 ">
      <div className="mb-6 ">
        <Link to="/admin" className="text-2xl font-medium ">
          VEDA
        </Link>
      </div>
      <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>

      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          label="Dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 rx-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          label="Dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 rx-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/admin/orders"
          label="Dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 rx-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/"
          label="Dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 rx-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
        <div className="mt-6">
          <NavLink
            to="/login"
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-3 px-4 rounded flex justify-center items-center space-x-2 hover:bg-red-700 transition"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default AdminSideBar;
