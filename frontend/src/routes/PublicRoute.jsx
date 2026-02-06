import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token && user) {
    if (user.role === "admin") return <Navigate to="/admin/dashboard" />;
    if (user.role === "donor") return <Navigate to="/donor-dashboard" />;
    return <Navigate to="/receiver-dashboard" />;
  }

  return children;
};

export default PublicRoute;
