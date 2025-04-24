'use client';
import { revalidateCategories } from "@/app/action";
import { Category } from "./definition";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; 

export async function useCreateCategory(
  name: string, 
  parentId: number | null, 
  subCategories: Category[], 
  products: number[],
  imageFile: File
) {

  if (!imageFile.type.startsWith("image/")) {
    throw new Error("File must be an image");
  }

  if (imageFile.size > 5 * 1024 * 1024) {
    throw new Error("Image must be less than 5MB");
  }

  const uploadResponse = await fetch(`/api/upload?filename=${encodeURIComponent(imageFile.name)}`, {
    method: "POST",
    body: imageFile,
  });

  const uploadResult = await uploadResponse.json();

  if (!uploadResponse.ok || !uploadResult.url) {
    throw new Error(uploadResult.message || "Failed to upload image");
  }

  const imageUrl = uploadResult.url;

  const createResponse = await fetch(`/api/categories`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, parentId, subCategories, products, imageUrl }),
  });

  const createResult = await createResponse.json();

  if (!createResponse.ok) {
    throw new Error(createResult.message || "Failed to create category");
  }

  await revalidateCategories();

  return createResult;
}

export function useDeleteCategory() {
  const deleteCategory = async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}/api/categories`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete category');
      }

      await revalidateCategories();

      return await response.json();
    } catch (error) {
      console.error('Error deleting category:', error);
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
  existingImageUrl?: string
) {
  let imageUrl = existingImageUrl;

  try {
    if (imageFile) {

      const uploadResponse = await fetch(`${baseUrl}/api/upload?filename=${encodeURIComponent(imageFile.name)}`, {
        method: "POST",
        body: imageFile,
      });

      const uploadResult = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadResult.url) {
        throw new Error(uploadResult.message || "Failed to upload image");
      }

      imageUrl = uploadResult.url;
    }

    const updateResponse = await fetch(`${baseUrl}/api/categories`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, parentId, subCategories, products, imageUrl }),
    });

    if (!updateResponse.ok) {
      throw new Error("Failed to update category");
    }

    const updateResult = await updateResponse.json();
    await revalidateCategories();

    return updateResult;
  } catch (error) {
    console.error("Update Category Error:", error);
    throw error;
  }
}
