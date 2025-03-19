import mongoose, { Schema, Document } from "mongoose";

// StaffMember Model
export interface StaffMember extends Document {
  username: string;
  password: string;
  role: mongoose.Types.ObjectId;
  client: mongoose.Types.ObjectId;
  isActive: boolean;
}

const StaffMemberSchema = new Schema<StaffMember>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const StaffMemberModel = mongoose.model<StaffMember>(
  "StaffMember",
  StaffMemberSchema
);
