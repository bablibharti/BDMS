import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Droplet,  Heart,
 LogOut } from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

    const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition
     ${
       isActive
         ? "bg-white/10 text-white shadow-inner"
         : "text-gray-300 hover:bg-white/5"
     }`;

return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white relative z-10 flex flex-col">
        <div className="p-6 text-2xl font-bold tracking-wide">
          🩸 BDMS Admin
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <NavLink to="/admin/dashboard" className={navLinkClass}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/admin/users" className={navLinkClass}>
            <Users size={20} />
            Users
          </NavLink>

          <NavLink to="/admin/donors" className={navLinkClass}>
            <Heart size={20} className="text-red-400" />
            Donors
          </NavLink>

          <NavLink to="/admin/requests" className={navLinkClass}>
            <Droplet size={20} />
            Requests
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-4">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Page content */}
      <main className="flex-1 p-8 relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
