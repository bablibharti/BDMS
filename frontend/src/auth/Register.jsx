// src/auth/Register.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";   
import api from "../api/axios";
import { FaUser, FaEnvelope, FaLock, FaTint, FaShieldAlt } from "react-icons/fa";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function Register() {
  const initialFormState = {
    name: "",
    email: "",
    password: "",
    bloodGroup: "",
    role: "donor",
  };

  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(initialFormState);
    setError("");
    setSuccess("");
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  setLoading(true);

  try {
    await api.post("/auth/register", form);
    
    // Show success message briefly
    setSuccess("Registration successful! Redirecting to login...");

    // Clear form (optional, since we're redirecting anyway)
    setForm(initialFormState);

    // Auto-redirect to login after 1.5–2 seconds (gives time to read success message)
    setTimeout(() => {
      navigate("/login");
    }, 1800);

  } catch (err) {
    setError(err.response?.data?.message || "Registration failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-red-100">
          {/* Header */}
          <div className="bg-red-600 text-white py-8 px-6 text-center">
            <div className="flex justify-center mb-3">
              <FaTint className="text-5xl text-red-100 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold">Join LifeDrop</h2>
            <p className="mt-2 opacity-90">One registration, countless lives saved</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-r">
                {success}
              </div>
            )}

            {/* Name */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Blood Group */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Blood Group</label>
              <div className="relative">
                <FaShieldAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="bloodGroup"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white transition"
                  value={form.bloodGroup}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your blood group</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Role */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">I want to register as</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center justify-center p-3 border rounded-lg cursor-pointer transition hover:bg-red-50 has-[:checked]:bg-red-50 has-[:checked]:border-red-500">
                  <input
                    type="radio"
                    name="role"
                    value="donor"
                    checked={form.role === "donor"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className={form.role === "donor" ? "font-semibold text-red-600" : ""}>
                    Donor
                  </span>
                </label>

                <label className="flex items-center justify-center p-3 border rounded-lg cursor-pointer transition hover:bg-red-50 has-[:checked]:bg-red-50 has-[:checked]:border-red-500">
                  <input
                    type="radio"
                    name="role"
                    value="receiver"
                    checked={form.role === "receiver"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className={form.role === "receiver" ? "font-semibold text-red-600" : ""}>
                    Receiver
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition transform hover:scale-[1.02] ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Registering..." : "Create Account"}
            </button>

            {/* Login link */}
            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-red-600 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Your information is secure. Every drop counts.
        </p>
      </div>
    </div>
  );
}