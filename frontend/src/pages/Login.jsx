import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginAnimation from "../components/Animations/LoginAnimation";

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Logging in with:", { email, password });
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-md rounded-xl overflow-hidden border border-gray-200">
        
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
          <form className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Veda</h2>
              <h3 className="text-xl font-semibold">Hey there!!</h3>
              <p className="text-gray-600 mt-1 text-sm">
                Enter your username and password to login to your account.
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter your email address"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter your password"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
              onClick={handleLogin}
            >
              Login
            </button>

            {/* Register Link */}
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </div>

        {/* Right: Animation & Message */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gray-100 items-center justify-center flex-col px-10 py-12">
          <div className="w-3/4 max-w-sm">
            <LoginAnimation />
          </div>
          <h2 className="text-2xl font-semibold mt-6 text-center">Welcome Back!</h2>
          <p className="text-center mt-3 text-sm text-gray-600">
            Please login to continue using our services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
