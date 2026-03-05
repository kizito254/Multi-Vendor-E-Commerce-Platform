import express from "express";
import Product from "../models/Product.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({ status: "approved" }).populate("vendor", "name").sort({ createdAt: -1 });
  res.json(products);
});

router.post("/", requireAuth, requireRole("vendor", "admin"), async (req, res) => {
  const { name, description, price, stock, category, imageUrl } = req.body;
  if (!name || !description || price == null || stock == null) {
    return res.status(400).json({ message: "name, description, price, and stock are required" });
  }

  const product = await Product.create({
    name,
    description,
    price,
    stock,
    category,
    imageUrl,
    vendor: req.user._id,
    status: "approved",
  });

  res.status(201).json(product);
});

router.get("/mine", requireAuth, requireRole("vendor", "admin"), async (req, res) => {
  const query = req.user.role === "admin" ? {} : { vendor: req.user._id };
  const products = await Product.find(query).sort({ createdAt: -1 });
  res.json(products);
});

export default router;
