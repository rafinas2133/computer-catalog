'use server'

import { prisma } from "../../prisma"
import { Category, Product, Banner } from "./definition";

const ITEMS_PER_PAGE = 6;

// Get all users
export async function useGetUser(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { email},
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

// Create a new user
export async function useCreateUser(email: string, name: string, password: string) {
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password, // Jangan lupa hash password sebelum menyimpan di production
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// Get all products
export async function useGetProducts(): Promise <Product[]> {
    try {
      const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: {
          createdAt: 'desc',
        }
      });
      return products as Product[];
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  export async function useGetProductsRandom(): Promise <Product[]> {
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
    return product as Product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
}

export async function useGetFilteredProducts(query: string, currentPage: number): Promise<Product[]> {
    
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try{
    const products = await prisma.product.findMany({
      include: { category: true },
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive', 
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return products as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function useGetTotalProductPages(query: string): Promise<number> {
  try {
    // Hitung jumlah total banner berdasarkan query pencarian
    const totalProducts = await prisma.product.count({
      where: {
        name: {
          contains: query, // mencari yang title-nya mengandung query
          mode: 'insensitive', // supaya pencarian tidak case-sensitive
        },
      },
    });

    // Hitung total pages berdasarkan hasil pencarian
    const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
    
    return totalPages;
  } catch (error) {
    console.error("Error counting Products:", error);
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
  //categories--------------------------------------------------
  
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

  export async function useGetCategoryById(id: number) {
    try {
      const category = await prisma.category.findFirst({
        where: {
          id,
        },
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
      return category as Category;
    } catch (error) {
      console.error("Error fetching category by name:", error);
      throw error;
    }
  }

  export async function useGetFilteredCategories(query: string, currentPage: number): Promise<Category[]> {
    
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try{
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
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: 'insensitive', 
              },
            },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: ITEMS_PER_PAGE,
        skip: offset,
      });

      return categories as Category[];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  export async function useGetTotalCategoryPages(query: string): Promise<number> {
    try {
      // Hitung jumlah total banner berdasarkan query pencarian
      const totalBanners = await prisma.category.count({
        where: {
          name: {
            contains: query, // mencari yang title-nya mengandung query
            mode: 'insensitive', // supaya pencarian tidak case-sensitive
          },
        },
      });
  
      // Hitung total pages berdasarkan hasil pencarian
      const totalPages = Math.ceil(totalBanners / ITEMS_PER_PAGE);
      
      return totalPages;
    } catch (error) {
      console.error("Error counting banners:", error);
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
  
//banner----------------------------------------------------------------------------
export async function useGetBanners(): Promise<Banner[]> {
    try {
      const banners = await prisma.banner.findMany();
      return banners as Banner[];
    } catch (error) {
      console.error("Error fetching banners:", error);
      throw error;
    }
  }

export async function useGetTotalBannerPages(query: string): Promise<number> {
  try {
    // Hitung jumlah total banner berdasarkan query pencarian
    const totalBanners = await prisma.banner.count({
      where: {
        title: {
          contains: query, // mencari yang title-nya mengandung query
          mode: 'insensitive', // supaya pencarian tidak case-sensitive
        },
      },
    });

    // Hitung total pages berdasarkan hasil pencarian
    const totalPages = Math.ceil(totalBanners / ITEMS_PER_PAGE);
    
    return totalPages;
  } catch (error) {
    console.error("Error counting banners:", error);
    throw error;
  }
}

export async function useGetFilteredBanners(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const banners = await prisma.banner.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive', // case-insensitive search
            },
          },
          {
            linkProduct: {
              contains: query,
              mode: 'insensitive', // case-insensitive search
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc', // Anda bisa mengganti ini dengan field yang sesuai untuk urutan
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return banners;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch banners.');
  }
}
  

  export async function useGetBannersById(id: number) {
    try {
      const banner = await prisma.banner.findUnique({
        where: { id },
      });
      return banner;
    } catch (error) {
      console.error("Error fetching banner by ID:", error);
      throw error;
    }
  }
  
  