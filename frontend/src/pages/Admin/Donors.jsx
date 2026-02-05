import { useEffect, useState } from "react";
import axios from "../../utils/axios"; 

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch donors from backend
  const fetchDonors = async () => {
    try {
      const res = await axios.get("/admin/users");
      // only donors
      const donorList = res.data.filter(
        (user) => user.role === "donor"
      );
      setDonors(donorList);
    } catch (err) {
      console.error("Failed to fetch donors", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // 🔹 Verify donor
  const verifyDonor = async (id) => {
    await axios.put(`/admin/verify/${id}`);
    fetchDonors();
  };

  // 🔹 Block / Unblock
  const toggleBlock = async (donor) => {
    if (donor.isBlocked) {
      await axios.put(`/admin/unblock/${donor._id}`);
    } else {
      await axios.put(`/admin/block/${donor._id}`);
    }
    fetchDonors();
  };

  if (loading) return <p>Loading donors...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Donors Management
      </h2>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Blood</th>
              <th className="p-3">Verified</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {donors.map((donor) => (
              <tr key={donor._id} className="border-t">
                <td className="p-3">{donor.name}</td>
                <td className="p-3">{donor.email}</td>
                <td className="p-3 text-center">
                  {donor.bloodGroup}
                </td>

                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      donor.isVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {donor.isVerified ? "Verified" : "Pending"}
                  </span>
                </td>

                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      donor.isBlocked
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {donor.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>

                <td className="p-3 flex gap-2 justify-center">
                  {!donor.isVerified && (
                    <button
                      onClick={() => verifyDonor(donor._id)}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
                    >
                      Verify
                    </button>
                  )}

                  <button
                    onClick={() => toggleBlock(donor)}
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                  >
                    {donor.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}

            {donors.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No donors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donors;
