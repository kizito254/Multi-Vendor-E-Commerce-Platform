import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

dotenv.config();

const run = async () => {
  await connectDB(process.env.MONGO_URI);
  await Promise.all([User.deleteMany({}), Product.deleteMany({})]);

  const passwordHash = await bcrypt.hash("password123", 10);
  const [customer, vendor, admin] = await User.create([
    { name: "Customer One", email: "customer@example.com", passwordHash, role: "customer" },
    { name: "Vendor One", email: "vendor@example.com", passwordHash, role: "vendor" },
    { name: "Admin One", email: "admin@example.com", passwordHash, role: "admin" },
  ]);

  await Product.create([
    {
      name: "Wireless Headphones",
      description: "Noise-cancelling over-ear headphones",
      price: 129,
      stock: 24,
      category: "Electronics",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      vendor: vendor._id,
    },
    {
      name: "Minimal Desk Lamp",
      description: "Modern LED lamp for home office setups",
      price: 49,
      stock: 40,
      category: "Home",
      imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
      vendor: vendor._id,
    },
  ]);

  console.log("Seed completed", { customer: customer.email, vendor: vendor.email, admin: admin.email });
  await mongoose.disconnect();
};

run().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
