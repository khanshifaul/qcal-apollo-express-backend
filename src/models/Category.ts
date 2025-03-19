import mongoose, { Schema, Document } from "mongoose";

// Category Model
export interface Category extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

const CategorySchema = new Schema<Category>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String },
});

export const CategoryModel = mongoose.model<Category>(
  "Category",
  CategorySchema
);