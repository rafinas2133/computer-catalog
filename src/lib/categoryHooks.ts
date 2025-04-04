'use client';
import { revalidateCategories } from "@/app/action";
import { Category } from "./definition";

const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; 

export async function useCreateCategory(
  name: string, 
  parentId: number | null, 
  subCategories: Category[], 
  products: number[],
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
  
    // Create the banner using a separate API endpoint
    const createResponse = await fetch(`${baseUrl}/api/categories`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, parentId, subCategories, products, imageUrl }),
    });
  
    const createResult = await createResponse.json();
  
    if (!createResponse.ok) {
      throw new Error(createResult.message || 'Failed to create banner');
    }
  
    return createResult;
  }

  export function useDeleteCategory() {
    const deleteCategory = async (id: number) => {
      try {
        const baseUrl = window.location.origin;
        const response = await fetch(`${baseUrl}/api/categories`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete banner');
        }
        await revalidateCategories();
  
        return await response.json();
      } catch (error) {
        console.error('Error deleting banner:', error);
        throw error;
      }
    };
  
    return { deleteCategory };
  }

  export async function useUpdateCategory(
    id: number,
    name: string, 
    parentId: number | null, 
    subCategories: Category[], 
    products: number[],
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
  
      // Update data banner
      const updateResponse = await fetch(`${baseUrl}/api/categories`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name, parentId, subCategories, products, imageUrl }),
      });
  
      if (!updateResponse.ok) {
        throw new Error("Failed to update banner");
      }
  
      const updateResult = await updateResponse.json();
  
      // ✅ Revalidate cache setelah update
      await revalidateCategories();
  
      return updateResult;
    } catch (error) {
      console.error("Update Banner Error:", error);
      throw error; // Pastikan error dilempar kembali ke `handleSubmit`
    }
  }
  