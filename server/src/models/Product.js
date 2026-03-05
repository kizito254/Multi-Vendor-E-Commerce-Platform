import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, default: "General" },
    imageUrl: { type: String, default: "https://placehold.co/600x400" },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "approved"], default: "approved" },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
