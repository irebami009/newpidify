import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, faculty }) => {
  const { user, userData, loading } = useAuth();

  if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (
    faculty &&
    (userData?.faculty || "").toLowerCase() !== faculty.toLowerCase()
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;