import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("token");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  // 🔴 Not logged in or not admin
  if (!token || !user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Authorized admin
  return <Outlet />;
};

export default AdminRoute;
