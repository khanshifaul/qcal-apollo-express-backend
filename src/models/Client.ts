import mongoose, { Schema, Document } from "mongoose";

// Client Model
export interface Client extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  subscriptionPlan: mongoose.Types.ObjectId;
  isAdmin: boolean;
}

const ClientSchema = new Schema<Client>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscriptionPlan: {
      type: Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
      required: true,
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ClientModel = mongoose.model<Client>("Client", ClientSchema);
