const User = require("../models/User");
const BloodRequest = require("../models/BloodRequest");

/* =======================
   DASHBOARD STATS
======================= */
exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonors = await User.countDocuments({ role: "donor" });
    const availableDonors = await User.countDocuments({
      role: "donor",
      isAvailable: true,
      isBlocked: false
    });

    const totalRequests = await BloodRequest.countDocuments();
    const pendingRequests = await BloodRequest.countDocuments({
      status: "pending"
    });

    res.json({
      totalUsers,
      totalDonors,
      availableDonors,
      totalRequests,
      pendingRequests
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =======================
   USER MANAGEMENT
======================= */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyDonor = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (user.role !== "donor")
      return res.status(400).json({ message: "Only donors can be verified" });

    user.isVerified = true;
    await user.save();

    res.json({ message: "Donor verified successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.isBlocked = true;
    await user.save();

    res.json({ message: "User blocked successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.isBlocked = false;
    await user.save();

    res.json({ message: "User unblocked successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* =======================
   BLOOD REQUEST CONTROL
======================= */
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find()
      .populate("requestedBy", "name bloodGroup city");

    res.json(requests);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.approveRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request)
      return res.status(404).json({ message: "Request not found" });

    request.status = "approved";
    await request.save();

    res.json({ message: "Blood request approved" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* =======================
   ASSIGN DONOR
======================= */
exports.assignDonor = async (req, res) => {
  try {
    const { donorId } = req.body;

    const request = await BloodRequest.findById(req.params.id);
    if (!request)
      return res.status(404).json({ message: "Request not found" });

    const donor = await User.findById(donorId);
    if (!donor || donor.role !== "donor")
      return res.status(400).json({ message: "Invalid donor" });

    if (!donor.isVerified || donor.isBlocked || !donor.isAvailable)
      return res.status(400).json({ message: "Donor not eligible" });

    request.assignedDonor = donorId;
    request.status = "completed";
    await request.save();

    donor.isAvailable = false;
    donor.lastDonated = new Date();
    await donor.save();

    res.json({ message: "Donor assigned successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* =======================
   AUTO MATCH DONORS
======================= */
exports.autoMatchDonors = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request)
      return res.status(404).json({ message: "Request not found" });

    if (request.status !== "approved")
      return res.status(400).json({ message: "Request not approved yet" });

    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const matchedDonors = await User.find({
      role: "donor",
      bloodGroup: request.bloodGroup,
      city: request.city,
      isAvailable: true,
      isVerified: true,
      isBlocked: false,
      $or: [
        { lastDonated: { $lte: ninetyDaysAgo } },
        { lastDonated: { $exists: false } }
      ]
    }).select("-password");

    res.json({
      requestId: request._id,
      totalMatches: matchedDonors.length,
      donors: matchedDonors
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


