import { dateTimeScalar, Time } from "./scalar.js";
import { OnlineOrderModel } from "./models/OnlineOrder.js";
import { OrderModel } from "./models/Order.js";
import { ProductModel } from "./models/Product.js";
import { VariantModel } from "./models/Variant.js";
import { InventoryModel } from "./models/Inventory.js";
import { BusinessModel } from "./models/Business.js";
import { CategoryModel } from "./models/Category.js";
import { SubcategoryModel } from "./models/Subcategory.js";
import { RoleModel } from "./models/Role.js";
import { SubscriptionPlanModel } from "./models/SubscriptionPlan.js";
import { ClientModel } from "./models/Client.js";
import { StaffMemberModel } from "./models/StaffMember.js";
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
      return await ClientModel.find({}).populate("subscriptionPlan");
    },
    client: async (_: any, { id }: { id: string }) => {
      return await ClientModel.findById(id).populate("subscriptionPlan");
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
      return await StaffMemberModel.find().populate("role").populate("client");
    },
    staffMember: async (_: any, { id }: { id: string }) => {
      return await StaffMemberModel.findById(id)
        .populate("role")
        .populate("client");
    },

    // Business Queries
    businesses: async () => {
      try {
        const businesses = await BusinessModel.find()
          .populate("owner")
          .populate("categories")
          .populate("subcategories");

        return businesses;
      } catch (error) {
        console.error("Error fetching businesses:", error);
        throw new Error("Failed to fetch businesses");
      }
    },
    business: async (_: any, { id }: { id: string }) => {
      try {
        const business = await BusinessModel.findById(id)
          .populate("owner")
          .populate("categories")
          .populate("subcategories");

        if (!business) {
          throw new Error("Business not found");
        }

        return business;
      } catch (error) {
        console.error("Error fetching business:", error);
        throw new Error("Failed to fetch business");
      }
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
      try {
        // Validate that the subscriptionPlan exists
        const subscriptionPlan = await SubscriptionPlanModel.findById(
          input.subscriptionPlan
        );
        if (!subscriptionPlan) {
          throw new Error("SubscriptionPlan not found");
        }

        // Create the new client
        const newClient = new ClientModel({
          ...input,
          subscriptionPlan: input.subscriptionPlan, // Ensure this is a valid ObjectId
        });

        // Save the client
        const savedClient = await newClient.save();

        // Populate the subscriptionPlan field
        const populatedClient = await ClientModel.findById(
          savedClient._id
        ).populate("subscriptionPlan");

        return populatedClient;
      } catch (error) {
        console.error("Error creating client:", error);
        throw new Error(`Failed to create client: ${error.message}`);
      }
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
      try {
        // Validate that the role exists
        const role = await RoleModel.findById(input.roleId);
        if (!role) {
          throw new Error("Role not found");
        }

        // Validate that the client exists
        const client = await ClientModel.findById(input.clientId);
        if (!client) {
          throw new Error("Client not found");
        }

        // Create the new staff member
        const newStaffMember = new StaffMemberModel({
          username: input.username,
          password: input.password,
          role: input.roleId, // Map roleId to role
          client: input.clientId, // Map clientId to client
          isActive: input.isActive,
        });

        // Save the staff member
        const savedStaffMember = await newStaffMember.save();

        // Populate the role and client fields
        const populatedStaffMember = await StaffMemberModel.findById(
          savedStaffMember._id
        )
          .populate("role")
          .populate("client");

        return populatedStaffMember;
      } catch (error) {
        console.error("Error creating staff member:", error);
        throw new Error(`Failed to create staff member: ${error.message}`);
      }
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
      try {
        // Destructure input fields
        const {
          ownerId,
          categoryIds,
          subcategoryIds,
          address,
          socialMedia,
          ...rest
        } = input;

        // Validate that the owner exists
        const owner = await ClientModel.findById(ownerId);
        if (!owner) {
          throw new Error("Owner not found");
        }

        // Validate that the categories exist (if provided)
        if (categoryIds && categoryIds.length > 0) {
          const categories = await CategoryModel.find({
            _id: { $in: categoryIds },
          });
          if (categories.length !== categoryIds.length) {
            throw new Error("One or more categories not found");
          }
        }

        // Validate that the subcategories exist (if provided)
        if (subcategoryIds && subcategoryIds.length > 0) {
          const subcategories = await SubcategoryModel.find({
            _id: { $in: subcategoryIds },
          });
          if (subcategories.length !== subcategoryIds.length) {
            throw new Error("One or more subcategories not found");
          }
        }

        // Create the new business
        const newBusiness = new BusinessModel({
          ...rest,
          owner: ownerId,
          address: {
            house: address.house,
            street: address.street,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country,
          },
          socialMedia: {
            facebook: socialMedia?.facebook,
            instagram: socialMedia?.instagram,
          },
          categories: categoryIds || [],
          subcategories: subcategoryIds || [],
        });

        // Save the business
        const savedBusiness = await newBusiness.save();

        // Populate all fields
        const populatedBusiness = await BusinessModel.findById(
          savedBusiness._id
        )
          .populate("owner")
          .populate("categories")
          .populate("subcategories");

        return populatedBusiness;
      } catch (error) {
        console.error("Error creating business:", error);
        throw new Error(`Failed to create business: ${error.message}`);
      }
    },
    updateBusiness: async (
      _: any,
      { id, input }: { id: string; input: any }
    ) => {
      try {
        // Validate that the business exists
        const business = await BusinessModel.findById(id);
        if (!business) {
          throw new Error("Business not found");
        }

        // Validate that the owner exists (if ownerId is provided)
        if (input.ownerId) {
          const owner = await ClientModel.findById(input.ownerId);
          if (!owner) {
            throw new Error("Owner not found");
          }
        }

        // Validate that the categories exist (if categoryIds is provided)
        if (input.categoryIds) {
          const categories = await CategoryModel.find({
            _id: { $in: input.categoryIds },
          });
          if (categories.length !== input.categoryIds.length) {
            throw new Error("One or more categories not found");
          }
        }

        // Validate that the subcategories exist (if subcategoryIds is provided)
        if (input.subcategoryIds) {
          const subcategories = await SubcategoryModel.find({
            _id: { $in: input.subcategoryIds },
          });
          if (subcategories.length !== input.subcategoryIds.length) {
            throw new Error("One or more subcategories not found");
          }
        }

        // Update the business
        const updatedBusiness = await BusinessModel.findByIdAndUpdate(
          id,
          {
            ...input,
            owner: input.ownerId,
            categories: input.categoryIds,
            subcategories: input.subcategoryIds,
          },
          { new: true }
        )
          .populate("owner")
          .populate("categories")
          .populate("subcategories");

        return updatedBusiness;
      } catch (error) {
        console.error("Error updating business:", error);
        throw new Error(`Failed to update business: ${error.message}`);
      }
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
