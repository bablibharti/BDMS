import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  toggleAvailability,
  searchDonors
} from "../../api/donorApi.js";
import LogoutButton from "../../components/LogoutButton";
import { 
  FaUserCircle, FaTint, FaPhoneAlt, FaMapMarkerAlt, 
  FaCalendarDay, FaSearch, FaHeartbeat, FaCheckCircle 
} from "react-icons/fa";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function DonorDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [lastDonated, setLastDonated] = useState("");

  const [searchCity, setSearchCity] = useState("");
  const [searchBlood, setSearchBlood] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getProfile();
        setUser(data);
        setCity(data.city || "");
        setPhone(data.phone || "");
        setLastDonated(data.lastDonated ? data.lastDonated.split("T")[0] : "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleToggle = async () => {
    try {
      const res = await toggleAvailability();
      setUser(prev => ({ ...prev, isAvailable: res.available }));
    } catch (err) {
      console.error(err);
      alert("Failed to update availability");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({ city, phone, lastDonated });
      setUser(res.donor);
      // You can replace alert with a toast library later
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchBlood || !searchCity.trim()) return;

    setSearchLoading(true);
    try {
      const results = await searchDonors(searchBlood, searchCity.trim());
      setSearchResults(results);
    } catch (err) {
      console.error(err);
      alert("Search failed");
    } finally {
      setSearchLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Profile Not Found</h2>
          <p className="text-gray-600">Please try logging in again or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/70 font-['Inter','system-ui',sans-serif]">
      {/* Top Bar */}
      <header className="bg-gradient-to-r from-red-700 to-red-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaHeartbeat className="text-3xl opacity-90" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Donor Dashboard</h1>
              <p className="text-sm opacity-80">LifeDrop • Be the difference</p>
            </div>
          </div>
          <LogoutButton className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-5 py-2 rounded-lg font-medium transition-all backdrop-blur-sm" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Profile */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-br from-red-600 to-red-700 p-8 text-white">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl font-bold border-2 border-white/30 shadow-inner">
                    {user.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">{user.name}</h2>
                    <div className="flex items-center gap-2 mt-1 opacity-90">
                      <FaTint className="text-red-200" />
                      <span className="font-medium">{user.bloodGroup}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Donor Status</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={user.isAvailable}
                      onChange={handleToggle}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-7 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600 shadow-inner"></div>
                  </label>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100 text-sm">
                  <div className="flex items-center gap-3">
                    <FaUserCircle className="text-gray-400 text-xl" />
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="font-medium text-gray-800">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-gray-400 text-xl" />
                    <div>
                      <p className="text-gray-500">Location</p>
                      <p className="font-medium text-gray-800">{user.city || "Not set"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Forms & Search */}
          <div className="lg:col-span-8 space-y-8">
            {/* Update Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaUserCircle className="text-red-600" /> Update Profile
              </h2>

              <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                      placeholder="e.g. Mumbai"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Donation Date</label>
                  <div className="relative">
                    <FaCalendarDay className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={lastDonated}
                      onChange={(e) => setLastDonated(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-gray-900"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>

            {/* Search Donors Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaSearch className="text-red-600" /> Find Compatible Donors
              </h2>

              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1">
                  <select
                    value={searchBlood}
                    onChange={(e) => setSearchBlood(e.target.value)}
                    className="w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-gray-900"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by City"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={searchLoading}
                  className={`min-w-[140px] bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] ${
                    searchLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {searchLoading ? "Searching..." : "Find Donors"}
                </button>
              </form>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.map(donor => (
                    <div
                      key={donor._id}
                      className="bg-gray-50/70 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center text-red-700 font-bold text-xl border border-red-200 shadow-sm group-hover:scale-105 transition-transform">
                          {donor.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-700 transition-colors">
                            {donor.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <FaCheckCircle className="text-red-500" />
                            <span className="font-semibold text-red-600">{donor.bloodGroup}</span>
                          </div>
                          <div className="mt-3 space-y-1.5 text-sm text-gray-600">
                            <p className="flex items-center gap-2">
                              <FaMapMarkerAlt className="text-gray-400" />
                              {donor.city || "Location not set"}
                            </p>
                            <p className="flex items-center gap-2">
                              <FaPhoneAlt className="text-gray-400" />
                              {donor.phone ? (
                                <a href={`tel:${donor.phone}`} className="hover:text-red-600 transition-colors">
                                  {donor.phone}
                                </a>
                              ) : "Contact not provided"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                  <FaSearch className="mx-auto text-5xl text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">
                    {searchBlood && searchCity.trim()
                      ? "No matching donors found in this area"
                      : "Select blood group and city to find donors"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}