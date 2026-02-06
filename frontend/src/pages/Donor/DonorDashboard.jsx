import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  toggleAvailability,
  searchDonors
} from "../../api/donorApi.js";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function DonorDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [lastDonated, setLastDonated] = useState("");
  
  // Search state
  const [searchCity, setSearchCity] = useState("");
  const [searchBlood, setSearchBlood] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getProfile();
        setUser(data);
        setCity(data.city || "");
        setPhone(data.phone || "");
        setLastDonated(data.lastDonated ? data.lastDonated.split("T")[0] : "");
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No profile found</p>;

  // Toggle availability
  const handleToggle = async () => {
    try {
      const res = await toggleAvailability();
      setUser({ ...user, isAvailable: res.available });
    } catch (err) {
      console.error(err);
      alert("Failed to toggle availability");
    }
  };

  // Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({ city, phone, lastDonated });
      setUser(res.donor);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  // Search donors
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await searchDonors(searchBlood, searchCity);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
      alert("Failed to search donors");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold mb-6">Donor Dashboard</h1>

      {/* Profile */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">My Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
        <p><strong>Available:</strong> {user.isAvailable ? "Yes" : "No"}</p>
        <button
          onClick={handleToggle}
          className="bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-600"
        >
          Toggle Availability
        </button>
      </div>

      {/* Update Profile */}
      <form onSubmit={handleUpdate} className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <input
          type="text"
          placeholder="City"
          className="w-full border p-2 mb-2 rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          className="w-full border p-2 mb-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label className="block mb-2">
          Last Donated:
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={lastDonated}
            onChange={(e) => setLastDonated(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>

      {/* Search Donors */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Search Donors</h2>
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <select
            value={searchBlood}
            onChange={(e) => setSearchBlood(e.target.value)}
            className="border p-2 rounded"
            required
          >
            <option value="">Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="City"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Search
          </button>
        </form>

        {/* Results */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map((donor) => (
              <div key={donor._id} className="border p-3 rounded shadow">
                <p><strong>Name:</strong> {donor.name}</p>
                <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                <p><strong>City:</strong> {donor.city}</p>
                <p><strong>Phone:</strong> {donor.phone || "N/A"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No donors found.</p>
        )}
      </div>
    </div>
  );
}
