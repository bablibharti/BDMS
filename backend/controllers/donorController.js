const User = require("../models/User");

exports.getAllDonors = async (req, res) => {
  const donors = await User.find({ role: "donor" }).select("-password");
  res.json(donors);
};

exports.getMyProfile = async (req, res) => {
  const donor = await User.findById(req.user.id).select("-password");
  if (!donor) return res.status(404).json({ message: "Donor not found" });
  res.json(donor);
};

exports.updateDonorProfile = async (req, res) => {
  const donor = await User.findById(req.user.id);

  if (!donor)
    return res.status(404).json({ message: "Donor not found" });

  donor.phone = req.body.phone || donor.phone;
  donor.city = req.body.city || donor.city;
  donor.lastDonated = req.body.lastDonated || donor.lastDonated;

  await donor.save();
  res.json({ message: "Donor profile updated", donor });
};

exports.searchDonors = async (req, res) => {
  const { bloodGroup, city } = req.query;

  const donors = await User.find({
    role: "donor",
    bloodGroup,
    city
  }).select("-password");

  res.json(donors);
};


exports.toggleAvailability = async (req, res) => {
  const donor = await User.findById(req.user.id);
  donor.isAvailable = !donor.isAvailable;
  await donor.save();

  res.json({ available: donor.isAvailable });
};































































































































































































































