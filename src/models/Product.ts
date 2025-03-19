import mongoose, { Schema, Document } from "mongoose";

// Product Model
export interface Product extends Document {
  name: string;
  slug: string;
  description?: string;
  basePrice: {
    amount: number;
    currency: string;
  };
  category: mongoose.Types.ObjectId;
  subcategory: mongoose.Types.ObjectId;
  business: mongoose.Types.ObjectId;
  hasVariants: boolean;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED" | "OUT_OF_STOCK";
  trackInventory: boolean;
}

const ProductSchema = new Schema<Product>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  basePrice: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },
  business: { type: Schema.Types.ObjectId, ref: "Business", required: true },
  hasVariants: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["DRAFT", "ACTIVE", "ARCHIVED", "OUT_OF_STOCK"],
    required: true,
  },
  trackInventory: { type: Boolean, required: true },
});

export const ProductModel = mongoose.model<Product>("Product", ProductSchema);