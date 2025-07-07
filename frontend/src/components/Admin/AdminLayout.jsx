import { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSideBar from "../Animations/components/AdminSideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Toggle Button  */}
      <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
        <button onClick={toggleDrawer} className="focus:outline-none">
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
      </div>

      {/* Overlay for mobile drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleDrawer}
        >
        </div>
      )}

      {/* Sidebar */}
        <div className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${drawerOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-20 md:translate-x-0 md:static md:block`}>
            <AdminSideBar/>
        </div>

      {/* Main Content Area */}
      <div className="flex-grow p-6 overflow-auto">
        <Outlet/>
      </div>
    </div>
  );
};

export default AdminLayout;
