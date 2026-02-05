const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },

    bloodGroup: { type: String, required: true },

    unitsNeeded: { type: Number, required: true },

    hospital: String,
    city: String,

    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignedDonor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "completed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
