"use server";
import { revalidatePath } from "next/cache";

export async function revalidateBanners() {
  revalidatePath("/admin/banners");
}

export async function revalidateCategories() {
  revalidatePath("/admin/categories");
}

export async function revalidateProducts() {
  revalidatePath("/admin/products");
}