import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slices/Authslice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoginAnimation from "../components/Animations/LoginAnimation";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const result = await dispatch(register({ name, email, password }));
      if (register.fulfilled.match(result)) {
        toast.success("Registration successful! Redirecting to login...", {
          autoClose: 2000,
          onClose: () => navigate("/login"),
        });
      } else {
        toast.error(result.payload?.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <ToastContainer />
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-md rounded-xl overflow-hidden border border-gray-200">
        
        {/* Left: Registration Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
          <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Veda</h2>
              <h3 className="text-xl font-semibold">Create an Account</h3>
              <p className="text-gray-600 mt-1 text-sm">
                Fill in your details to register and join us.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter your full name"
              />
            </div>

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

            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Re-enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Register
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>

        {/* Right: Animation */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gray-100 items-center justify-center flex-col px-10 py-12">
          <div className="w-3/4 max-w-sm">
            <LoginAnimation />
          </div>
          <h2 className="text-2xl font-semibold mt-6 text-center">Join the Community!</h2>
          <p className="text-center mt-3 text-sm text-gray-600">
            Sign up to explore features and collaborate with others.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
