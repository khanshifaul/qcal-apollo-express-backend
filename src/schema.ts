export const typeDefs = `#graphql
scalar DateTime
scalar Time

enum SubscriptionInterval {
  MONTHLY
  ANNUAL
}

type SubscriptionPlan {
  id: ID!
  tier: String!
  features: [String!]!
  priceAmount: Float!
  priceCurrency: String!
  interval: SubscriptionInterval!
  createdAt: DateTime!
  updatedAt: DateTime!
  trialPeriodDays: Int
}

type Client {
  id: ID!
  name: String!
  email: String!
  phone: String!
  password: String!
  subscriptionPlan: SubscriptionPlan!
  businesses: [Business!]
  isAdmin: Boolean!
  staffMembers: [StaffMember!]
  createdAt: DateTime!
  updatedAt: DateTime!
  lastLogin: DateTime
}

type Role {
  id: ID!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type StaffMember {
  id: ID!
  username: String!
  password: String!
  role: Role!
  client: Client!
  assignedBusinesses: [Business!]
  isActive: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
  lastLogin: DateTime
}

type Business {
  id: ID!
  name: String!
  owner: Client!
  address: Address!
  phone: String!
  email: String!
  website: String
  logo: String!
  socialMedia: SocialMedia
  categories: [Category!]
  subcategories: [Subcategory!]
  products: [Product!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Address {
  house: String!
  street: String!
  city: String!
  state: String!
  postalCode: String!
  country: String!
}

type SocialMedia {
  facebook: String
  instagram: String
}

type Category {
  id: ID!
  name: String!
  slug: String!
  description: String
  image: String
  subcategories: [Subcategory!]
  products: [Product!]
  client: Client!
  business: [Business!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Subcategory {
  id: ID!
  name: String!
  slug: String!
  description: String
  image: String
  category: Category!
  client: Client!
  business: [Business!]
  products: [Product!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum ProductStatus {
  DRAFT
  ACTIVE
  ARCHIVED
  OUT_OF_STOCK
}

type Money {
  amount: Float!
  currency: String!
}

type Product {
  id: ID!
  name: String!
  slug: String!
  description: String
  basePrice: Money!
  category: Category!
  subcategory: Subcategory!
  client: Client!
  business: Business!
  hasVariants: Boolean!
  variants: [Variant!]
  status: ProductStatus!
  trackInventory: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum DiscountType {
  PERCENTAGE
  FIXED_AMOUNT
}

enum VariantStatus {
  ACTIVE
  INACTIVE
}

type Variant {
  id: ID!
  name: String!
  product: Product!
  sku: String!
  images: [String!]
  buyingPrice: Money!
  sellingPrice: Money!
  discountType: DiscountType
  discountValue: Float
  saleStart: DateTime
  saleEnd: DateTime
  stock: [StockLevel!]!
  status: VariantStatus!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type StockLevel {
  location: Inventory!
  quantity: Int!
  lowStockThreshold: Int
  lastRestocked: DateTime
}

enum InventoryType {
  WAREHOUSE
  STORE
  SUPPLIER
}

type Inventory {
  id: ID!
  name: String!
  type: InventoryType!
  client: Client!
  business: Business
  address: Address!
  contact: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Customer {
  name: String!
  phone: String!
  email: String
  address: String!
  facebook: String
  client: Client!
  business: [Business!]
}

enum PaymentMethod {
  COD
  CREDIT_CARD
  MOBILE_WALLET
  BANK_TRANSFER
}

enum OrderSource {
  FACEBOOK
  INSTAGRAM
  WEBSITE
  WALK_IN
  PHONE_ORDER
  OTHER
}

type Courier {
  id: ID!
  name: String!
  apiKey: String!
  apiSecret: String!
}

enum DeliveryZone {
  DHAKA_CITY
  DHAKA_SUBURBAN
  OUTSIDE_DHAKA
}

type DeliveryCharge {
  zone: DeliveryZone!
  chargeAmount: Money!
  createdAt: DateTime
  updatedAt: DateTime
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  COMPLETED
  CANCELLED
  RETURNED
  REFUNDED
}

type Order {
  id: ID!
  client: Client!
  business: Business!
  customer: Customer!
  items: [OrderItem!]!
  paymentMethod: PaymentMethod!
  orderStatus: OrderStatus!
  itemTotal: Money!
  codAmount: Money
  advanceAmount: Money
  discountAmount: Money!
  deliveryZone: DeliveryZone!
  deliveryCharge: DeliveryCharge!
  total: Money!
  courier: Courier!
  trackingNumber: String
  trackingUrl: String
  source: OrderSource!
  notes: String
  address: String!
  status: OrderStatus!
  estimatedDelivery: DateTime
  actualDelivery: DateTime
  isScheduled: Boolean!
  scheduledDate: DateTime
  scheduledTime: Time
  createdBy: CreatedBy!
  createdAt: DateTime!
  updatedAt: DateTime!
}

union CreatedBy = Client | StaffMember

type OrderItem {
  product: Product!
  variant: Variant
  quantity: Int!
  price: Money!
  subTotal: Money!
}

type OnlineOrder {
  id: ID!
  client: Client!
  business: Business!
  customer: Customer!
  items: [OrderItem!]!
  paymentMethod: PaymentMethod!
  orderStatus: OrderStatus!
  itemTotal: Money!
  codAmount: Money
  advanceAmount: Money
  discountAmount: Money!
  deliveryZone: DeliveryZone!
  deliveryCharge: DeliveryCharge!
  total: Money!
  courier: Courier!
  trackingNumber: String
  trackingUrl: String
  source: OrderSource!
  notes: String
  address: String!
  status: OrderStatus!
  estimatedDelivery: DateTime
  actualDelivery: DateTime
  isScheduled: Boolean!
  scheduledDate: DateTime
  scheduledTime: Time
  createdBy: CreatedBy!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Query {
  subscriptionPlans: [SubscriptionPlan!]!
  subscriptionPlan(id: ID!): SubscriptionPlan
  clients: [Client!]!
  client(id: ID!): Client
  roles: [Role!]!
  role(id: ID!): Role
  staffMembers: [StaffMember!]!
  staffMember(id: ID!): StaffMember
  businesses: [Business!]!
  business(id: ID!): Business
  categories: [Category!]!
  category(id: ID!): Category
  subcategories: [Subcategory!]!
  subcategory(id: ID!): Subcategory
  products: [Product!]!
  product(id: ID!): Product
  variants: [Variant!]!
  variant(id: ID!): Variant
  inventories: [Inventory!]!
  inventory(id: ID!): Inventory
  orders: [Order!]!
  order(id: ID!): Order
  onlineOrders: [OnlineOrder!]!
  onlineOrder(id: ID!): OnlineOrder
}

type Mutation {
  createSubscriptionPlan(input: SubscriptionPlanInput!): SubscriptionPlan!
  updateSubscriptionPlan(id: ID!, input: SubscriptionPlanInput!): SubscriptionPlan!
  deleteSubscriptionPlan(id: ID!): Boolean!
  createClient(input: ClientInput!): Client!
  updateClient(id: ID!, input: ClientInput!): Client!
  deleteClient(id: ID!): Boolean!
  createRole(input: RoleInput!): Role!
  updateRole(id: ID!, input: RoleInput!): Role!
  deleteRole(id: ID!): Boolean!
  createStaffMember(input: StaffMemberInput!): StaffMember!
  updateStaffMember(id: ID!, input: StaffMemberInput!): StaffMember!
  deleteStaffMember(id: ID!): Boolean!
  createBusiness(input: BusinessInput!): Business!
  updateBusiness(id: ID!, input: BusinessInput!): Business!
  deleteBusiness(id: ID!): Boolean!
  createCategory(input: CategoryInput!): Category!
  updateCategory(id: ID!, input: CategoryInput!): Category!
  deleteCategory(id: ID!): Boolean!
  createSubcategory(input: SubcategoryInput!): Subcategory!
  updateSubcategory(id: ID!, input: SubcategoryInput!): Subcategory!
  deleteSubcategory(id: ID!): Boolean!
  createProduct(input: ProductInput!): Product!
  updateProduct(id: ID!, input: ProductInput!): Product!
  deleteProduct(id: ID!): Boolean!
  createVariant(input: VariantInput!): Variant!
  updateVariant(id: ID!, input: VariantInput!): Variant!
  deleteVariant(id: ID!): Boolean!
  createInventory(input: InventoryInput!): Inventory!
  updateInventory(id: ID!, input: InventoryInput!): Inventory!
  deleteInventory(id: ID!): Boolean!
  createOrder(input: OrderInput!): Order!
  updateOrder(id: ID!, input: OrderInput!): Order!
  deleteOrder(id: ID!): Boolean!
  createOnlineOrder(input: OnlineOrderInput!): OnlineOrder!
  updateOnlineOrder(id: ID!, input: OnlineOrderInput!): OnlineOrder!
  deleteOnlineOrder(id: ID!): Boolean!
}

input SubscriptionPlanInput {
  tier: String!
  features: [String!]!
  priceAmount: Float!
  priceCurrency: String!
  interval: SubscriptionInterval!
  trialPeriodDays: Int
}

input ClientInput {
  name: String!
  email: String!
  phone: String!
  password: String!
  subscriptionPlan: ID!
  isAdmin: Boolean
}

input RoleInput {
  name: String!
}

input StaffMemberInput {
  username: String!
  password: String!
  roleId: ID!
  clientId: ID!
  isActive: Boolean
}

input BusinessInput {
  name: String!
  ownerId: ID!
  address: AddressInput!
  phone: String!
  email: String!
  website: String
  logo: String!
  socialMedia: SocialMediaInput
  categoryIds: [ID!]
  subcategoryIds: [ID!]
}

input AddressInput {
  house: String!
  street: String!
  city: String!
  state: String!
  postalCode: String!
  country: String!
}

input SocialMediaInput {
  facebook: String
  instagram: String
}

input CategoryInput {
  name: String!
  slug: String!
  description: String
  image: String
}

input SubcategoryInput {
  name: String!
  slug: String!
  description: String
  image: String
  categoryId: ID!
}

input ProductInput {
  name: String!
  slug: String!
  description: String
  basePrice: MoneyInput!
  categoryId: ID!
  subcategoryId: ID!
  businessId: ID!
  hasVariants: Boolean
  status: ProductStatus!
  trackInventory: Boolean!
}

input MoneyInput {
  amount: Float!
  currency: String!
}

input VariantInput {
  name: String!
  sku: String!
  images: [String!]
  buyingPrice: MoneyInput!
  sellingPrice: MoneyInput!
  discountType: DiscountType
  discountValue: Float
  saleStart: DateTime
  saleEnd: DateTime
  productId: ID!
  status: VariantStatus!
}

input InventoryInput {
  name: String!
  type: InventoryType!
  address: AddressInput!
  contact: String!
}

input OrderInput {
  clientId: ID!
  businessId: ID!
  customer: CustomerInput!
  items: [OrderItemInput!]!
  paymentMethod: PaymentMethod!
  deliveryZone: DeliveryZone!
  deliveryCharge: DeliveryChargeInput!
  courierId: ID!
  source: OrderSource!
  notes: String
  address: String!
  isScheduled: Boolean
  scheduledDate: DateTime
  scheduledTime: Time
}

input CustomerInput {
  name: String!
  phone: String!
  email: String
  address: String!
}

input OrderItemInput {
  productId: ID!
  variantId: ID
  quantity: Int!
  price: MoneyInput!
}

input DeliveryChargeInput {
  zone: DeliveryZone!
  chargeAmount: MoneyInput!
}

input OnlineOrderInput {
  clientId: ID!
  businessId: ID!
  customer: CustomerInput!
  items: [OrderItemInput!]!
  paymentMethod: PaymentMethod!
  deliveryZone: DeliveryZone!
  deliveryCharge: DeliveryChargeInput!
  courierId: ID!
  source: OrderSource!
  notes: String
  address: String!
  isScheduled: Boolean
  scheduledDate: DateTime
  scheduledTime: Time
}`;
