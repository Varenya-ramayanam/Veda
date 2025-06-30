import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_reactiveId: true }}>
      <ToastContainer />
      <Routes>
        {/* uselayout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="register" element={<Register/>}></Route>
        </Route>
        {/* adminLayout */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
