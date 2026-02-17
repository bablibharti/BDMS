import { useEffect, useState } from "react";
import RequestForm from "../../components/Receiver/RequestForm";
import RequestList from "../../components/Receiver/RequestList";
import { getMyRequests } from "../../api/requestApi.js";
import LogoutButton from "../../components/LogoutButton";
import { FaHeartbeat, FaExclamationCircle, FaSpinner } from "react-icons/fa";

export default function ReceiverDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      setError(null);
      const data = await getMyRequests();
      setRequests(data || []);
    } catch (err) {
      console.error("Failed to load requests:", err);
      setError("Could not load your requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-gray-50 font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-gradient-to-r from-red-700 to-red-800 text-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaHeartbeat className="text-3xl" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Receiver Dashboard</h1>
              <p className="text-sm opacity-80">Urgent blood requests • LifeDrop</p>
            </div>
          </div>
          <LogoutButton 
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-5 py-2 rounded-lg font-medium transition-all backdrop-blur-sm"
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Emergency Banner / Quick Info */}
        <div className="mb-10 bg-gradient-to-r from-red-600/10 to-red-500/5 border border-red-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="text-red-600 text-4xl mt-1">
              <FaExclamationCircle />
            </div>
            <div>
              <h2 className="text-xl font-bold text-red-800 mb-2">Need blood urgently?</h2>
              <p className="text-gray-700">
                Create a new request below. Your request will be visible to nearby donors.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Request Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-red-600 text-white px-6 py-5">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <FaExclamationCircle />
                  Create New Request
                </h2>
              </div>
              <div className="p-6">
                <RequestForm 
                  onRequestCreated={() => {
                    fetchRequests();
                    // Optional: scroll to list or show success toast
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Right Column - My Requests List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 py-5 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                  My Blood Requests
                  <span className="text-sm font-medium text-gray-500 ml-auto">
                    {requests.length} active
                  </span>
                </h2>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                    <FaSpinner className="animate-spin text-5xl text-red-500 mb-4" />
                    <p className="text-lg font-medium">Loading your requests...</p>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-lg">
                    <p className="font-medium">{error}</p>
                    <button 
                      onClick={fetchRequests}
                      className="mt-4 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Try Again
                    </button>
                  </div>
                ) : requests.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <div className="text-6xl mb-4 opacity-30">🩸</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No requests yet
                    </h3>
                    <p className="max-w-md mx-auto">
                      Create your first blood request above — it will appear here once submitted.
                    </p>
                  </div>
                ) : (
                  <RequestList requests={requests} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}