import { toggleAvailability } from "../../api/donorApi";
import { useState } from "react";

const AvailabilityToggle = () => {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await toggleAvailability();
      alert("Availability updated");
    } catch (err) {
      alert("Failed to update availability");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      className="bg-red-600 text-white px-4 py-2 rounded mt-4"
      disabled={loading}
    >
      Toggle Availability
    </button>
  );
};

export default AvailabilityToggle;
