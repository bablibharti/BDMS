const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },

    role: {
      type: String,
      enum: ["donor", "receiver", "admin"],
      default: "donor",
    },
    lastDonated: {
      type: Date,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },

    phone: String,
    city: String,
    lastDonated: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
