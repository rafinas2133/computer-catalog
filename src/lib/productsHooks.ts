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

  if (!uploadResponse.ok) {
    throw new Error(uploadResult.message || 'Failed to upload image');
  }

  const imageUrl = uploadResult.url; // ⬅️ Vercel Blob URL

  // Create product
  const createResponse = await fetch(`${baseUrl}/api/products`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
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
  existingImageUrl?: string
) {
  let imageUrl = existingImageUrl;

  try {
    if (imageFile) {

      const uploadResponse = await fetch(`/api/upload?filename=${encodeURIComponent(imageFile.name)}`, {
        method: "POST",
        body: imageFile,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const uploadResult = await uploadResponse.json();
      imageUrl = uploadResult.url;
    }

    const updateResponse = await fetch(`${baseUrl}/api/products`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, description, price, stock, categoryId, imageUrl }),
    });

    if (!updateResponse.ok) {
      throw new Error("Failed to update product");
    }

    const updateResult = await updateResponse.json();
    await revalidateProducts();
    return updateResult;
  } catch (error) {
    console.error("Update product Error:", error);
    throw error;
  }
}
