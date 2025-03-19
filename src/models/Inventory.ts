import mongoose, { Schema, Document } from "mongoose";

// Inventory Model
export interface Inventory extends Document {
  name: string;
  type: "WAREHOUSE" | "STORE" | "SUPPLIER";
  address: {
    house: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  contact: string;
}

const InventorySchema = new Schema<Inventory>({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["WAREHOUSE", "STORE", "SUPPLIER"],
    required: true,
  },
  address: {
    house: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  contact: { type: String, required: true },
});

export const InventoryModel = mongoose.model<Inventory>(
  "Inventory",
  InventorySchema
);