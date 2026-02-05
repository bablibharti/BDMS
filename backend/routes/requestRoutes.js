const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware.js");
const {
  createRequest,
  getAllRequests,
  getMyRequests
} = require("../controllers/requestController.js");

router.post("/", auth, createRequest);
router.get("/", auth, getAllRequests);
router.get("/my", auth, getMyRequests);


module.exports = router;
