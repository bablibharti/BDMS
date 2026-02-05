import { useState } from "react";
import { updateProfile } from "../../api/donorApi";

const UpdateProfileForm = () => {
  const [form, setForm] = useState({
    phone: "",
    bloodGroup: "",
    city: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(form);
      alert("Profile updated");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="bloodGroup" placeholder="Blood Group" onChange={handleChange} />
      <input name="city" placeholder="City" onChange={handleChange} />
      <button className="bg-green-600 text-white px-4 py-2 mt-2">
        Update Profile
      </button>
    </form>
  );
};

export default UpdateProfileForm;
