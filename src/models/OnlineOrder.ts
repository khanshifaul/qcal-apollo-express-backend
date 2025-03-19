import mongoose, { Schema, Document } from "mongoose";

// OnlineOrder Model
export interface OnlineOrder extends Document {
  client: mongoose.Types.ObjectId;
  business: mongoose.Types.ObjectId;
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
  };
  items: {
    product: mongoose.Types.ObjectId;
    variant?: mongoose.Types.ObjectId;
    quantity: number;
    price: {
      amount: number;
      currency: string;
    };
  }[];
  paymentMethod: "COD" | "CREDIT_CARD" | "MOBILE_WALLET" | "BANK_TRANSFER";
  orderStatus:
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "COMPLETED"
    | "CANCELLED"
    | "RETURNED"
    | "REFUNDED";
  itemTotal: {
    amount: number;
    currency: string;
  };
  codAmount?: {
    amount: number;
    currency: string;
  };
  advanceAmount?: {
    amount: number;
    currency: string;
  };
  discountAmount: {
    amount: number;
    currency: string;
  };
  deliveryZone: "DhakaCity" | "DhakaSubUrban" | "OutsideDhaka";
  deliveryCharge: {
    amount: number;
    currency: string;
  };
  total: {
    amount: number;
    currency: string;
  };
  courier: mongoose.Types.ObjectId;
  trackingNumber?: string;
  trackingUrl?: string;
  source:
    | "FACEBOOK"
    | "Instagram"
    | "WEBSITE"
    | "WALK_IN"
    | "PHONE_ORDER"
    | "OTHER";
  notes?: string;
  address: string;
  status:
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "COMPLETED"
    | "CANCELLED"
    | "RETURNED"
    | "REFUNDED";
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  isScheduled: boolean;
  scheduledDate?: Date;
  scheduledTime?: string;
}

const OnlineOrderSchema = new Schema<OnlineOrder>({
  client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
  business: { type: Schema.Types.ObjectId, ref: "Business", required: true },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
  },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      variant: { type: Schema.Types.ObjectId, ref: "Variant" },
      quantity: { type: Number, required: true },
      price: {
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
      },
    },
  ],
  paymentMethod: {
    type: String,
    enum: ["COD", "CREDIT_CARD", "MOBILE_WALLET", "BANK_TRANSFER"],
    required: true,
  },
  orderStatus: {
    type: String,
    enum: [
      "PENDING",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
      "COMPLETED",
      "CANCELLED",
      "RETURNED",
      "REFUNDED",
    ],
    required: true,
  },
  itemTotal: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  codAmount: {
    amount: { type: Number },
    currency: { type: String },
  },
  advanceAmount: {
    amount: { type: Number },
    currency: { type: String },
  },
  discountAmount: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  deliveryZone: {
    type: String,
    enum: ["DhakaCity", "DhakaSubUrban", "OutsideDhaka"],
    required: true,
  },
  deliveryCharge: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  total: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  courier: { type: Schema.Types.ObjectId, ref: "Courier", required: true },
  trackingNumber: { type: String },
  trackingUrl: { type: String },
  source: {
    type: String,
    enum: [
      "FACEBOOK",
      "Instagram",
      "WEBSITE",
      "WALK_IN",
      "PHONE_ORDER",
      "OTHER",
    ],
    required: true,
  },
  notes: { type: String },
  address: { type: String, required: true },
  status: {
    type: String,
    enum: [
      "PENDING",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
      "COMPLETED",
      "CANCELLED",
      "RETURNED",
      "REFUNDED",
    ],
    required: true,
  },
  estimatedDelivery: { type: Date },
  actualDelivery: { type: Date },
  isScheduled: { type: Boolean, default: false },
  scheduledDate: { type: Date },
  scheduledTime: { type: String },
});

export const OnlineOrderModel = mongoose.model<OnlineOrder>(
  "OnlineOrder",
  OnlineOrderSchema
);
