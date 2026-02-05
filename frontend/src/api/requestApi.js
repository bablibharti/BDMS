import api from "./axios";

// Create a new blood request
export const createRequest = async (requestData) => {
  const res = await api.post("/requests", requestData);
  return res.data;
};

// Get all requests made by the logged-in user
export const getMyRequests = async () => {
  const res = await api.get("/requests");
  return res.data;
};
