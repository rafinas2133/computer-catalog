'use client';
import { revalidateBanners } from "@/app/action";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; 

export async function useCreateBanner(
  title: string,
  linkProduct: string,
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

  const createResponse = await fetch(`/api/banners`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, imageUrl, linkProduct }),
  });

  const createResult = await createResponse.json();

  if (!createResponse.ok) {
    throw new Error(createResult.message || "Failed to create banner");
  }

  await revalidateBanners();

  return createResult;
}

export async function useUpdateBanner(
  id: number,
  title: string,
  linkProduct: string,
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

      const uploadResult = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadResult.url) {
        throw new Error(uploadResult.message || "Failed to upload image");
      }

      imageUrl = uploadResult.url;

      if (existingImageUrl && existingImageUrl !== imageUrl) {
        await fetch(`/api/upload?url=${encodeURIComponent(existingImageUrl)}`, {
          method: "DELETE",
        });
      }
    }

    const updateResponse = await fetch(`/api/banners`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, imageUrl, linkProduct }),
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      throw new Error(errorData.message || "Failed to update banner");
    }

    const updateResult = await updateResponse.json();
    await revalidateBanners();

    return updateResult;
  } catch (error) {
    console.error("Update Banner Error:", error);
    throw error;
  }
}
        

export function useDeleteBanner() {
  const deleteBanner = async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}/api/banners`, {
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
      await revalidateBanners();

      return await response.json();
    } catch (error) {
      console.error('Error deleting banner:', error);
      throw error;
    }
  };

  return { deleteBanner };
}


  
  