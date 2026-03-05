import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requireAuth, requireRole("customer"), async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Order items are required" });
  }

  const productIds = items.map((i) => i.productId);
  const products = await Product.find({ _id: { $in: productIds }, status: "approved" });
  const byId = new Map(products.map((p) => [String(p._id), p]));

  const orderItems = [];
  let total = 0;

  for (const item of items) {
    const product = byId.get(item.productId);
    if (!product) return res.status(404).json({ message: `Product not found: ${item.productId}` });
    if (product.stock < item.quantity) {
      return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
    }
    product.stock -= item.quantity;
    await product.save();

    orderItems.push({
      product: product._id,
      name: product.name,
      quantity: item.quantity,
      price: product.price,
      vendor: product.vendor,
    });
    total += product.price * item.quantity;
  }

  const order = await Order.create({ customer: req.user._id, items: orderItems, total });
  res.status(201).json(order);
});

router.get("/mine", requireAuth, async (req, res) => {
  const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

router.get("/vendor", requireAuth, requireRole("vendor", "admin"), async (req, res) => {
  const orders = await Order.find({ "items.vendor": req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export default router;
