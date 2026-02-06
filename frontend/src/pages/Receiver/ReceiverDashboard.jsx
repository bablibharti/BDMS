import { useEffect, useState } from "react";
import RequestForm from "../../components/Receiver/RequestForm";
import RequestList from "../../components/Receiver/RequestList";
import { getMyRequests } from "../../api/requestApi.js";
import LogoutButton from "../../components/LogoutButton";

export default function ReceiverDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const data = await getMyRequests();
      setRequests(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 min-h-screen bg-red-50">
      <h1 className="text-3xl font-bold mb-6">Receiver Dashboard</h1>

      <LogoutButton />

      {/* Form to create a new request */}
      <RequestForm onRequestCreated={fetchRequests} />

      {/* List of requests */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">My Requests</h2>
        <RequestList requests={requests} />
      </div>
    </div>
  );
}
