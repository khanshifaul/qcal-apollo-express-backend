import mongoose, { Schema, Document } from "mongoose";

// Business Model
export interface Business extends Document {
  name: string;
  owner?: mongoose.Types.ObjectId;
  address: {
    house: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  email: string;
  website?: string;
  logo: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
  };
  categories?: [string];
  subcategories?: [string];
}

const BusinessSchema = new Schema<Business>(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "Client" },
    address: {
      house: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
    logo: { type: String, required: true },
    socialMedia: {
      facebook: { type: String },
      instagram: { type: String },
    },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    subcategories: [{ type: Schema.Types.ObjectId, ref: "Subcategory" }],
  },
  { timestamps: true }
);

export const BusinessModel = mongoose.model<Business>(
  "Business",
  BusinessSchema
);
