import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"; // ✅ FIXED: Import Navigate

const ProtectedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || (role && user.role !== role)) {
    toast.error("You are not authorized to view this page.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
