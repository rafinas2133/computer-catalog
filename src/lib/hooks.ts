'use server'

import { PrismaClient } from "@prisma/client";
import { Category } from "./definition";
import { Product } from "./definition";

const prisma = new PrismaClient();

// Get all users
export async function useGetUser() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Create a new user
export async function useCreateUser(username: string, password: string) {
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        password, // Jangan lupa hash password sebelum menyimpan di production
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// Update user
export async function useUpdateUser(id: number, data: Partial<{ username: string; password: string }>) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

// Delete user
export async function useDeleteUser(id: number) {
  try {
    await prisma.user.delete({ where: { id } });
    return { message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

// Get all products
export async function useGetProducts(): Promise <Product[]> {
    try {
      const products = await prisma.product.findMany({
        include: { category: true },
      });
      return products as Product[];
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

export async function useGetProductById(id: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true, // Menyertakan informasi kategori produk
      },
    });
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
}

  // Get products by category
  export async function useGetCategoryWithDetails(id: number) {
    try {
      const category = await prisma.category.findFirst({
        where: { id },
        include: {
          products: true,
          subCategories: {
            include: {
              products: true, // Mengambil produk dalam subkategori
            },
          },
        },
      });
      return category;
    } catch (error) {
      console.error("Error fetching category with details:", error);
      throw error;
    }
  }
  

export async function useGetCategoryByName(name: string) {
  try {
    const category = await prisma.category.findFirst({
      where: {
        name,
      },
    });
    return category;
  } catch (error) {
    console.error("Error fetching category by name:", error);
    throw error;
  }
}
  
  // Create a new product
  export async function useCreateProduct(data: { name: string; description: string; price: number; stock: number; imageUrl: string; categoryId: number }) {
    try {
      const newProduct = await prisma.product.create({
        data,
      });
      return newProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }
  
  // Update product
  export async function useUpdateProduct(id: number, data: Partial<{ name: string; description: string; price: number; stock: number; imageUrl: string }>) {
    try {
      const updatedProduct = await prisma.product.update({
        where: { id },
        data,
      });
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }
  
  // Delete product
  export async function useDeleteProduct(id: number) {
    try {
      await prisma.product.delete({ where: { id } });
      return { message: "Product deleted successfully" };
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
  
  // Get all categories
  export async function useGetCategories(): Promise<Category[]> {
    try {
      const categories = await prisma.category.findMany({
        include: {
          subCategories: {
            include: {
              subCategories: true, 
              products: true, 
            },
          },
          products: true, 
          parent: true, 
        },
      });
  
      return categories as Category[];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
  
  // Create a new category
  export async function useCreateCategory(name: string, parentId: number | null, imageUrl: string) {
    try {
      const newCategory = await prisma.category.create({
        data: {
          name,
          parentId,
          imageUrl,
        },
      });
      return newCategory;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }
  
  // Delete category
  export async function useDeleteCategory(id: number) {
    try {
      await prisma.category.delete({ where: { id } });
      return { message: "Category deleted successfully" };
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
  
  // Get all banners
export async function useGetBanners() {
    try {
      const banners = await prisma.banner.findMany();
      return banners;
    } catch (error) {
      console.error("Error fetching banners:", error);
      throw error;
    }
  }
  
  // Create a new banner
  export async function useCreateBanner(title: string, imageUrl: string) {
    try {
      const newBanner = await prisma.banner.create({
        data: { title, imageUrl },
      });
      return newBanner;
    } catch (error) {
      console.error("Error creating banner:", error);
      throw error;
    }
  }
  
  // Delete banner
  export async function useDeleteBanner(id: number) {
    try {
      await prisma.banner.delete({ where: { id } });
      return { message: "Banner deleted successfully" };
    } catch (error) {
      console.error("Error deleting banner:", error);
      throw error;
    }
  }
  