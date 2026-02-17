import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { 
  ShieldCheck, UserX, UserCheck, Loader2, AlertCircle, 
  Users, CheckCircle2, XCircle 
} from "lucide-react";

export default function Donors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDonors = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await axios.get("/admin/users");
      const donorList = res.data.filter(user => user.role === "donor");
      setDonors(donorList);
    } catch (err) {
      console.error("Failed to fetch donors", err);
      setError("Unable to load donors. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const verifyDonor = async (id) => {
    try {
      await axios.put(`/admin/verify/${id}`);
      fetchDonors();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleBlock = async (donor) => {
    try {
      const endpoint = donor.isBlocked 
        ? `/admin/unblock/${donor._id}` 
        : `/admin/block/${donor._id}`;
      await axios.put(endpoint);
      fetchDonors();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-700 via-red-800 to-red-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/15 p-3 rounded-xl backdrop-blur-sm">
                <Users className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Manage Donors
                </h1>
                <p className="text-sm opacity-90 mt-1">
                  {donors.length} registered donors
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-600">
            <Loader2 className="h-14 w-14 animate-spin text-red-600 mb-5" />
            <p className="text-lg font-medium">Loading donor records...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-800 mb-2">Something went wrong</h3>
            <p className="text-red-700 mb-6">{error}</p>
            <button
              onClick={fetchDonors}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
          </div>
        ) : donors.length === 0 ? (
          <div className="bg-white rounded-2xl shadow border border-gray-200 p-12 text-center max-w-3xl mx-auto">
            <Users className="h-20 w-20 text-gray-300 mx-auto mb-6 opacity-70" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              No Donors Yet
            </h2>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              When people register as donors, they will appear here for you to review, verify, or manage.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Blood Group</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Verified</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {donors.map((donor) => (
                    <tr 
                      key={donor._id}
                      className="hover:bg-red-50/40 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{donor.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{donor.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center font-semibold text-red-700">
                        {donor.bloodGroup}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {donor.isVerified ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                            <CheckCircle2 className="h-4 w-4" />
                            Verified
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                            Pending Verification
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {donor.isBlocked ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                            <XCircle className="h-4 w-4" />
                            Blocked
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                            Active
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-3">
                          {!donor.isVerified && !donor.isBlocked && (
                            <button
                              onClick={() => verifyDonor(donor._id)}
                              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all duration-200"
                            >
                              <ShieldCheck className="h-4 w-4" />
                              Verify
                            </button>
                          )}

                          <button
                            onClick={() => toggleBlock(donor)}
                            className={`inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all duration-200 ${
                              donor.isBlocked
                                ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
                                : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                            }`}
                          >
                            {donor.isBlocked ? (
                              <>
                                <UserCheck className="h-4 w-4" />
                                Unblock
                              </>
                            ) : (
                              <>
                                <UserX className="h-4 w-4" />
                                Block
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-5 px-2 py-4">
              {donors.map((donor) => (
                <div 
                  key={donor._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{donor.name}</h3>
                      <p className="text-sm text-gray-600 mt-0.5">{donor.email}</p>
                    </div>
                    <div className="text-xl font-bold text-red-700">{donor.bloodGroup}</div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {donor.isVerified ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Verified
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                        Pending
                      </div>
                    )}

                    {donor.isBlocked ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        <XCircle className="h-3.5 w-3.5" />
                        Blocked
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                        Active
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {!donor.isVerified && !donor.isBlocked && (
                      <button
                        onClick={() => verifyDonor(donor._id)}
                        className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition flex items-center justify-center gap-2"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        Verify Donor
                      </button>
                    )}

                    <button
                      onClick={() => toggleBlock(donor)}
                      className={`flex-1 py-2.5 px-4 font-medium rounded-lg transition flex items-center justify-center gap-2 ${
                        donor.isBlocked
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                    >
                      {donor.isBlocked ? (
                        <>
                          <UserCheck className="h-4 w-4" />
                          Unblock
                        </>
                      ) : (
                        <>
                          <UserX className="h-4 w-4" />
                          Block
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}