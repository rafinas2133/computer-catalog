'use client';
import { revalidateProducts } from "@/app/action";

const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; 

export async function useCreateProduct(
    name: string, 
    description: string,
    price: number,
    stock: number,
    categoryId: number,
    imageFile: File
) {
  
    // Upload image first
    const formData = new FormData();
    formData.append('image', imageFile);
  
    // Upload the image
    const uploadResponse = await fetch(`${baseUrl}/api/upload`, {
      method: "POST",
      body: formData,
    });
  
    const uploadResult = await uploadResponse.json();
  
    if (!uploadResponse.ok) {
      throw new Error(uploadResult.message || 'Failed to upload image');
    }
  
    const imageUrl = `/uploads/${uploadResult.filename}`;
  
    // Create the product using a separate API endpoint
    const createResponse = await fetch(`${baseUrl}/api/products`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, price, stock, categoryId, imageUrl }),
    });
  
    const createResult = await createResponse.json();
  
    if (!createResponse.ok) {
      throw new Error(createResult.message || 'Failed to create product');
    }
  
    return createResult;
  }

  export function useDeleteProduct() {
    const deleteproduct = async (id: number) => {
      try {
        const baseUrl = window.location.origin;
        const response = await fetch(`${baseUrl}/api/products`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete product');
        }
        await revalidateProducts();
  
        return await response.json();
      } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
      }
    };
  
    return { deleteproduct };
  }

  export async function useUpdateProduct(
    id: number, 
    name: string, 
    description: string,
    price: number,
    stock: number,
    categoryId: number,
    imageFile?: File | null, 
    existingImageUrl?: string // Untuk menyimpan gambar lama
  ) {
    let imageUrl = existingImageUrl; // Gunakan gambar lama jika tidak ada file baru
  
    try {
      // Jika ada file baru, upload dulu
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
  
        const uploadResponse = await fetch(`${baseUrl}/api/upload`, {
          method: "POST",
          body: formData,
        });
  
        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }
  
        const uploadResult = await uploadResponse.json();
        imageUrl = `/uploads/${uploadResult.filename}`;
      }
  
      // Update data product
      const updateResponse = await fetch(`${baseUrl}/api/products`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, description, price, stock, categoryId, imageUrl }),
      });
  
      if (!updateResponse.ok) {
        throw new Error("Failed to update product");
      }
  
      const updateResult = await updateResponse.json();
  
      // ✅ Revalidate cache setelah update
      await revalidateProducts();
  
      return updateResult;
    } catch (error) {
      console.error("Update product Error:", error);
      throw error; // Pastikan error dilempar kembali ke `handleSubmit`
    }
  }
  