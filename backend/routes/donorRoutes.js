const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const { getAllDonors , updateDonorProfile, searchDonors,toggleAvailability, getMyProfile } = require("../controllers/donorController");

router.get("/", auth, admin, getAllDonors);
router.get("/profile", auth, getMyProfile);
router.put("/profile", auth, updateDonorProfile);
router.get("/search", auth, searchDonors);
router.patch("/availability", auth, toggleAvailability);


module.exports = router;
