const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminEmail = "admin@bloodbank.com";

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = new User({
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
      isBlocked: false
    });

    await admin.save();

    console.log("🚀 Admin seeded successfully");
    console.log("📧 Email: admin@bloodbank.com");
    console.log("🔑 Password: Admin@123");

    process.exit();
  } catch (err) {
    console.error("❌ Admin seed failed:", err);
    process.exit(1);
  }
};

seedAdmin();
