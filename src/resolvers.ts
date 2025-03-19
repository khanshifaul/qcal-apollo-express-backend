import { dateTimeScalar, Time } from "./scalar.js";
import {
  ClientModel,
  RoleModel,
  StaffMemberModel,
  BusinessModel,
  CategoryModel,
  SubcategoryModel,
  ProductModel,
  VariantModel,
  InventoryModel,
  OrderModel,
  OnlineOrderModel,
} from "./models.js";
import { SubscriptionPlanModel } from "./models/SubscriptionPlan.js";
export const resolvers = {
  DateTime: dateTimeScalar,
  Time: Time,

  Query: {
    // SubscriptionPlan Queries
    subscriptionPlans: async () => {
      return await SubscriptionPlanModel.find();
    },
    subscriptionPlan: async (_: any, { id }: { id: string }) => {
      return await SubscriptionPlanModel.findById(id);
    },

    // Client Queries
    clients: async () => {
      return await ClientModel.find();
    },
    client: async (_: any, { id }: { id: string }) => {
      return await ClientModel.findById(id);
    },

    // Role Queries
    roles: async () => {
      return await RoleModel.find();
    },
    role: async (_: any, { id }: { id: string }) => {
      return await RoleModel.findById(id);
    },

    // StaffMember Queries
    staffMembers: async () => {
      return await StaffMemberModel.find();
    },
    staffMember: async (_: any, { id }: { id: string }) => {
      return await StaffMemberModel.findById(id);
    },

    // Business Queries
    businesses: async () => {
      return await BusinessModel.find();
    },
    business: async (_: any, { id }: { id: string }) => {
      return await BusinessModel.findById(id);
    },

    // Category Queries
    categories: async () => {
      return await CategoryModel.find();
    },
    category: async (_: any, { id }: { id: string }) => {
      return await CategoryModel.findById(id);
    },

    // Subcategory Queries
    subcategories: async () => {
      return await SubcategoryModel.find();
    },
    subcategory: async (_: any, { id }: { id: string }) => {
      return await SubcategoryModel.findById(id);
    },

    // Product Queries
    products: async () => {
      return await ProductModel.find();
    },
    product: async (_: any, { id }: { id: string }) => {
      return await ProductModel.findById(id);
    },

    // Variant Queries
    variants: async () => {
      return await VariantModel.find();
    },
    variant: async (_: any, { id }: { id: string }) => {
      return await VariantModel.findById(id);
    },

    // Inventory Queries
    inventories: async () => {
      return await InventoryModel.find();
    },
    inventory: async (_: any, { id }: { id: string }) => {
      return await InventoryModel.findById(id);
    },

    // Order Queries
    orders: async () => {
      return await OrderModel.find();
    },
    order: async (_: any, { id }: { id: string }) => {
      return await OrderModel.findById(id);
    },

    // OnlineOrder Queries
    onlineOrders: async () => {
      return await OnlineOrderModel.find();
    },
    onlineOrder: async (_: any, { id }: { id: string }) => {
      return await OnlineOrderModel.findById(id);
    },
  },

  Mutation: {
    // SubscriptionPlan Mutations
    createSubscriptionPlan: async (_: any, { input }: { input: any }) => {
      try {
        const newSubscriptionPlan = new SubscriptionPlanModel(input);
        await newSubscriptionPlan.save();
        return newSubscriptionPlan;
      } catch (error) {
        console.error("Error creating subscription plan:", error);
        throw new Error("Failed to create subscription plan");
      }
    },
    updateSubscriptionPlan: async (
      _: any,
      { id, input }: { id: string; input: any }
    ) => {
      return await SubscriptionPlanModel.findByIdAndUpdate(id, input, {
        new: true,
      });
    },
    deleteSubscriptionPlan: async (_: any, { id }: { id: string }) => {
      await SubscriptionPlanModel.findByIdAndDelete(id);
      return true;
    },

    // Client Mutations
    createClient: async (_: any, { input }: { input: any }) => {
      const newClient = new ClientModel(input);
      return await newClient.save();
    },
    updateClient: async (_: any, { id, input }: { id: string; input: any }) => {
      return await ClientModel.findByIdAndUpdate(id, input, { new: true });
    },
    deleteClient: async (_: any, { id }: { id: string }) => {
      await ClientModel.findByIdAndDelete(id);
      return true;
    },

    // Role Mutations
    createRole: async (_: any, { input }: { input: any }) => {
      const newRole = new RoleModel(input);
      return await newRole.save();
    },
    updateRole: async (_: any, { id, input }: { id: string; input: any }) => {
      return await RoleModel.findByIdAndUpdate(id, input, { new: true });
    },
    deleteRole: async (_: any, { id }: { id: string }) => {
      await RoleModel.findByIdAndDelete(id);
      return true;
    },

    // StaffMember Mutations
    createStaffMember: async (_: any, { input }: { input: any }) => {
      const newStaffMember = new StaffMemberModel(input);
      return await newStaffMember.save();
    },
    updateStaffMember: async (
      _: any,
      { id, input }: { id: string; input: any }
    ) => {
      return await StaffMemberModel.findByIdAndUpdate(id, input, { new: true });
    },
    deleteStaffMember: async (_: any, { id }: { id: string }) => {
      await StaffMemberModel.findByIdAndDelete(id);
      return true;
    },

    // Business Mutations
    createBusiness: async (_: any, { input }: { input: any }) => {
      const newBusiness = new BusinessModel(input);
      return await newBusiness.save();
    },
    updateBusiness: async (
      _: any,
      { id, input }: { id: string; input: any }
    ) => {
      return await BusinessModel.findByIdAndUpdate(id, input, { new: true });
    },
    deleteBusiness: async (_: any, { id }: { id: string }) => {
      await BusinessModel.findByIdAndDelete(id);
      return true;
    },

    // Category Mutations
    createCategory: async (_: any, { input }: { input: any }) => {
      const newCategory = new CategoryModel(input);
      return await newCategory.save();
    },
    updateCategory: async (
      _: any,
      { id, input }: { id: string; input: any }
    ) => {
      return await CategoryModel.findByIdAndUpdate(id, input, { new: true });
    },
    deleteCategory: async (_: any, { id }: { id: string }) => {
      await CategoryModel.findByIdAndDelete(id);
      return true;
    },

    // Subcategory Mutations
    createSubcategory: async (_: any, { input }: { input: any }) => {
      const newSubcategory = new SubcategoryModel(input);
      return await newSubcategory.save();
    },
    updateSubcategory: async (
      _: any,
      { id, input }: { id: string; input: any }
    ) => {
      return await SubcategoryModel.findByIdAndUpdate(id, input, { new: true });
    },
    deleteSubcategory: async (_: any, { id }: { id: string }) => {
      await SubcategoryModel.findByIdAndDelete(id);
      return true;
    },

    // Product Mutations
    createProduct: async (_: any, { input }: { input: any }) => {
      const newProduct = new ProductModel(input);
      return await newProduct.save();
    },
    updateProduct: async (
      _: any,
      { id, input }: { id: string; input: any }
    ) => {
      return await ProductModel.findByIdAndUpdate(id, input, { new: true });
    },
    deleteProduct: async (_: any, { id }: { id: string }) => {
      await ProductModel.findByIdAndDelete(id);
      return true;
    },

    // Variant Mutations
    createVariant: async (_: any, { input }: { input: any }) => {
      const newVariant = new VariantModel(input);
      return await newVariant.save();
    },
    updateVariant: async (
      _: any,
      { id, input }: { id: string; input: any }
    ) => {
      return await VariantModel.findByIdAndUpdate(id, input, { new: true });
    },
    deleteVariant: async (_: any, { id }: { id: string }) => {
      await VariantModel.findByIdAndDelete(id);
      return true;
    },

    // Inventory Mutations
    createInventory: async (_: any, { input }: { input: any }) => {
      const newInventory = new InventoryModel(input);
      return await newInventory.save();
    },
    updateInventory: async (
      _: any,
      { id, input }: { id: string; input: any }
    ) => {
      return await InventoryModel.findByIdAndUpdate(id, input, { new: true });
    },
    deleteInventory: async (_: any, { id }: { id: string }) => {
      await InventoryModel.findByIdAndDelete(id);
      return true;
    },

    // Order Mutations
    createOrder: async (_: any, { input }: { input: any }) => {
      const newOrder = new OrderModel(input);
      return await newOrder.save();
    },
    updateOrder: async (_: any, { id, input }: { id: string; input: any }) => {
      return await OrderModel.findByIdAndUpdate(id, input, { new: true });
    },
    deleteOrder: async (_: any, { id }: { id: string }) => {
      await OrderModel.findByIdAndDelete(id);
      return true;
    },

    // OnlineOrder Mutations
    createOnlineOrder: async (_: any, { input }: { input: any }) => {
      const newOnlineOrder = new OnlineOrderModel(input);
      return await newOnlineOrder.save();
    },
    updateOnlineOrder: async (
      _: any,
      { id, input }: { id: string; input: any }
    ) => {
      return await OnlineOrderModel.findByIdAndUpdate(id, input, { new: true });
    },
    deleteOnlineOrder: async (_: any, { id }: { id: string }) => {
      await OnlineOrderModel.findByIdAndDelete(id);
      return true;
    },
  },
};

export default resolvers;
