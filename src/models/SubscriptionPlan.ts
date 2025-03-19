import mongoose, { Schema, Document } from "mongoose";

// SubscriptionPlan Model
export interface SubscriptionPlan extends Document {
  tier: string;
  features: string[];
  priceAmount: number;
  priceCurrency: string;
  interval: "MONTHLY" | "ANNUAL";
  trialPeriodDays?: number;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionPlanSchema = new Schema<SubscriptionPlan>(
  {
    tier: { type: String, required: true },
    features: [{ type: String, required: true }],
    priceAmount: { type: Number, required: true },
    priceCurrency: { type: String, required: true },
    interval: { type: String, enum: ["MONTHLY", "ANNUAL"], required: true },
    trialPeriodDays: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const SubscriptionPlanModel = mongoose.model<SubscriptionPlan>(
  "SubscriptionPlan",
  SubscriptionPlanSchema
);