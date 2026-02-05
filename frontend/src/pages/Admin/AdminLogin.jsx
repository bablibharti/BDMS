import { useEffect, useState } from "react";
import axios from "axios";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Hook MUST be here (top-level)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user?.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      if (res.data.user.role !== "admin") {
        setError("You are not authorized as admin");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/admin/dashboard", { replace: true });
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-red-100 p-3 rounded-full mb-3">
            <ShieldAlert className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold">Admin Login</h2>
        </div>

        <form onSubmit={loginHandler} className="space-y-4">
          <input
            type="email"
            placeholder="Admin email"
            className="w-full border rounded-lg px-4 py-2"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button className="w-full bg-red-600 text-white py-2 rounded-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
