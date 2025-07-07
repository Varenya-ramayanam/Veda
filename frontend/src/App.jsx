import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast"; // ✅ correct import
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import PaymentOptions from "./components/Cart/PaymentOptions";
import OrderConfirmationPage from "./components/Cart/OrderConfirmationPage";
import OrderDetails from "./components/Cart/OrderDetails";
import MyOrdersPage from "./pages/MyOrdersPage";

import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/components/UserManagement";
import ProductManagement from "./components/Admin/components/ProductManagement";
import OrderManagement from "./components/Admin/components/OrderManagement";


function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_reactiveId: true }}>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "0.9rem",
            padding: "12px 16px",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="payment" element={<PaymentOptions />} />
          <Route path="order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="order/:id" element={<OrderDetails/>} />
          <Route path = "/my-orders" element={<MyOrdersPage/>} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage/>} />
          <Route path="users" element={<UserManagement/>} />
          <Route path="products" element={<ProductManagement/>} />
          <Route path="orders" element={<OrderManagement/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
