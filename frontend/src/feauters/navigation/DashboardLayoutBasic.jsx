// import React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useNavigate, Outlet } from "react-router-dom";
import { NAVIGATION } from "../navigation/Navbar"; // Navigation logic
import { demoTheme } from "../../utils/theme"; // Centralized theme

export default function DashboardLayoutBasic() {
  const navigate = useNavigate();

  return (
    <AppProvider
      branding={{ title: "Dashboard", logo: <img src="/path-to-logo.png" alt="Logo" /> }}
      navigation={NAVIGATION.map((item) => ({
        ...item,
        onClick: () => navigate(`/${item.path}`), // Navigate to root path
      }))}
      theme={demoTheme}
    >
      <DashboardLayout>
        <Outlet /> {/* This is where child routes are rendered */}
      </DashboardLayout>
    </AppProvider>
  );
}
