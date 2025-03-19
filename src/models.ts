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

const ClientSchema = new Schema<Client>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscriptionPlan: {
    type: Schema.Types.ObjectId,
    ref: "SubscriptionPlan",
    required: true,
  },
  isAdmin: { type: Boolean, default: true },
});

export const ClientModel = mongoose.model<Client>("Client", ClientSchema);

// Role Model
export interface Role extends Document {
  name: string;
}

const RoleSchema = new Schema<Role>({
  name: { type: String, required: true, unique: true },
});

export const RoleModel = mongoose.model<Role>("Role", RoleSchema);

// StaffMember Model
export interface StaffMember extends Document {
  username: string;
  password: string;
  role: mongoose.Types.ObjectId;
  client: mongoose.Types.ObjectId;
  isActive: boolean;
}

const StaffMemberSchema = new Schema<StaffMember>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
  isActive: { type: Boolean, default: true },
});

export const StaffMemberModel = mongoose.model<StaffMember>(
  "StaffMember",
  StaffMemberSchema
);

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
}

const BusinessSchema = new Schema<Business>({
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
});

export const BusinessModel = mongoose.model<Business>(
  "Business",
  BusinessSchema
);

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

// Product Model
export interface Product extends Document {
  name: string;
  slug: string;
  description?: string;
  basePrice: {
    amount: number;
    currency: string;
  };
  category: mongoose.Types.ObjectId;
  subcategory: mongoose.Types.ObjectId;
  business: mongoose.Types.ObjectId;
  hasVariants: boolean;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED" | "OUT_OF_STOCK";
  trackInventory: boolean;
}

const ProductSchema = new Schema<Product>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  basePrice: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },
  business: { type: Schema.Types.ObjectId, ref: "Business", required: true },
  hasVariants: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["DRAFT", "ACTIVE", "ARCHIVED", "OUT_OF_STOCK"],
    required: true,
  },
  trackInventory: { type: Boolean, required: true },
});

export const ProductModel = mongoose.model<Product>("Product", ProductSchema);

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

// Order Model
export interface Order extends Document {
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

const OrderSchema = new Schema<Order>({
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

export const OrderModel = mongoose.model<Order>("Order", OrderSchema);

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
