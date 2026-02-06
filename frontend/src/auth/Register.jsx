import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

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

  // ✅ Clear form on page load
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

    try {
      await api.post("/auth/register", form);

      setSuccess("Registration successful. You can login now.");

      // ✅ Clear fields after success
      setForm(initialFormState);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        <input
          name="name"
          placeholder="Full Name"
          className="w-full border p-2 mb-2 rounded"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-2 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-2 rounded"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          name="bloodGroup"
          className="w-full border p-2 mb-2 rounded"
          value={form.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <select
          name="role"
          className="w-full border p-2 mb-4 rounded"
          value={form.role}
          onChange={handleChange}
        >
          <option value="donor">Donor</option>
          <option value="receiver">Receiver</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>

        <p className="text-center text-sm mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
