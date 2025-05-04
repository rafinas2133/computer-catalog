"use server";
import { revalidatePath } from "next/cache";

export async function revalidateBanners() {
  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function revalidateCategories() {
  revalidatePath("/admin/categories");
  revalidatePath("/");
}

export async function revalidateProducts() {
  revalidatePath("/admin/products");
  revalidatePath("/");
}