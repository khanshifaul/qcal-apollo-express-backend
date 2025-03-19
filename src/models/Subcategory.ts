import mongoose, { Schema, Document } from "mongoose";

// Subcategory Model
export interface Subcategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  category: mongoose.Types.ObjectId;
}

const SubcategorySchema = new Schema<Subcategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

export const SubcategoryModel = mongoose.model<Subcategory>(
  "Subcategory",
  SubcategorySchema
);
