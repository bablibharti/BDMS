export default function RequestList({ requests }) {
  if (!requests || requests.length === 0) return <p>No requests found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {requests.map((req) => (
        <div key={req._id} className="border p-3 rounded shadow bg-white">
          <p><strong>Blood Group:</strong> {req.bloodGroup}</p>
          <p><strong>City:</strong> {req.city}</p>
          <p><strong>Status:</strong> {req.status}</p>
          {req.assignedDonor && (
            <p><strong>Donor Assigned:</strong> {req.assignedDonor.name}</p>
          )}
        </div>
      ))}
    </div>
  );
}
