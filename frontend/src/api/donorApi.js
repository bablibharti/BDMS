import api from "./axios"; // your axios instance with JWT attached

// Get current donor profile
export const getProfile = async () => {
  const res = await api.get("/donors/profile");
  return res.data;
};

// Update profile (city, phone, lastDonated)
export const updateProfile = async (data) => {
  const res = await api.put("/donors/profile", data);
  return res.data;
};

// Toggle availability
export const toggleAvailability = async () => {
  const res = await api.patch("/donors/availability");
  return res.data;
};

// Get all donors (optional, for list)
export const getAllDonors = async () => {
  const res = await api.get("/donors");
  return res.data;
};

// Search donors
export const searchDonors = async (bloodGroup, city) => {
  const res = await api.get(`/donors/search?bloodGroup=${bloodGroup}&city=${city}`);
  return res.data;
};
