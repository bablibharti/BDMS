import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("token");
  console.log("AdminRoute is running – current path:", window.location.pathname);

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
