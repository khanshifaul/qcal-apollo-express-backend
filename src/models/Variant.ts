import mongoose, { Schema, Document } from "mongoose";

// Variant Model
export interface Variant extends Document {
  name: string;
  sku: string;
  images?: string[];
  buyingPrice: {
    amount: number;
    currency: string;
  };
  sellingPrice: {
    amount: number;
    currency: string;
  };
  discountType?: "PERCENTAGE" | "FIXED_AMOUNT";
  discountValue?: number;
  saleStart?: Date;
  saleEnd?: Date;
  product: mongoose.Types.ObjectId;
  status: "ACTIVE" | "INACTIVE";
}

const VariantSchema = new Schema<Variant>({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  images: [{ type: String }],
  buyingPrice: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  sellingPrice: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  discountType: { type: String, enum: ["PERCENTAGE", "FIXED_AMOUNT"] },
  discountValue: { type: Number },
  saleStart: { type: Date },
  saleEnd: { type: Date },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  status: { type: String, enum: ["ACTIVE", "INACTIVE"], required: true },
});

export const VariantModel = mongoose.model<Variant>("Variant", VariantSchema);