import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import DonorDashboard from "./pages/Donor/DonorDashboard";
import ReceiverDashboard from "./pages/Receiver/ReceiverDashboard";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Users from "./pages/Admin/Users";
import Requests from "./pages/Admin/Requests";
import Donors from "./pages/Admin/Donors";

import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ─── Public / Landing ────────────────────────────────────────────── */}
        <Route path="/" element={<Home />} />   {/* Main landing page */}

        <Route
          path="/login"
          element={<PublicRoute><Login /></PublicRoute>}
        />
        <Route
          path="/register"
          element={<PublicRoute><Register /></PublicRoute>}
        />

        {/* ─── Donor (protected) ───────────────────────────────────────────── */}
        <Route
          path="/donor-dashboard"
          element={
            <PrivateRoute role="donor">
              <DonorDashboard />
            </PrivateRoute>
          }
        />

        {/* ─── Receiver (protected) ────────────────────────────────────────── */}
        <Route
          path="/receiver-dashboard"
          element={
            <PrivateRoute role="receiver">
              <ReceiverDashboard />
            </PrivateRoute>
          }
        />

        {/* ─── Admin Section ───────────────────────────────────────────────── */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* All /admin/* routes are protected by AdminRoute */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            {/* Redirect /admin → /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users"      element={<Users />} />
            <Route path="requests"   element={<Requests />} />
            <Route path="donors"     element={<Donors />} />

            {/* Optional: catch invalid admin sub-paths */}
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
        </Route>

        {/* ─── Fallback (404-like) ─────────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}