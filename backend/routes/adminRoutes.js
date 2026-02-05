const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getAdminStats,
  getAllUsers,
  verifyDonor,
  blockUser,
  unblockUser,
  getAllRequests,
  approveRequest,
  assignDonor,
  autoMatchDonors,
 
} = require("../controllers/adminController");

// Dashboard
router.get("/stats", auth, admin, getAdminStats);

// Users
router.get("/users", auth, admin, getAllUsers);
router.put("/verify/:id", auth, admin, verifyDonor);
router.put("/block/:id", auth, admin, blockUser);
router.put("/unblock/:id", auth, admin, unblockUser);

// Blood Requests
router.get("/requests", auth, admin, getAllRequests);
router.put("/request/approve/:id", auth, admin, approveRequest);
router.put("/request/assign/:id", auth, admin, assignDonor);
router.post("/request/auto-match/:id",auth,admin,autoMatchDonors);


module.exports = router;
