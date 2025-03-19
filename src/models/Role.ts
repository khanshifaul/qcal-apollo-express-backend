import mongoose, { Schema, Document } from "mongoose";

// Role Model
export interface Role extends Document {
  name: string;
}

const RoleSchema = new Schema<Role>({
  name: { type: String, required: true, unique: true },
});

export const RoleModel = mongoose.model<Role>("Role", RoleSchema);