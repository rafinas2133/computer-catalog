import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";
import { revalidatePath } from 'next/cache';
import { Category } from "@/lib/definition";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Get all categories
export async function GET() {
  const categories = await prisma.category.findMany({
    include: { subCategories: true, products: true },
  });
  return NextResponse.json(categories);
}

// Create a new category
export async function POST(request: Request) {
  try {
    const { name, parentId, subCategories, imageUrl } = await request.json();

    const newCategory = await prisma.category.create({
      data: {
        name,
        parentId,
        imageUrl,
        subCategories: {
          connect: subCategories.map((cat: Category) => ({ id: cat.id }))
        }
      },
    });

    revalidatePath('/admin/categories');

    return NextResponse.json({ 
      success: true, 
      data: newCategory 
    });

  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create category' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, parentId, subCategories, imageUrl } = await req.json();

    const existingCategory = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    let finalImageUrl = existingCategory.imageUrl;

    if (imageUrl && imageUrl !== existingCategory.imageUrl) {
      if (existingCategory.imageUrl?.startsWith("https://")) {
        await fetch(`${baseUrl}/api/upload?url=${encodeURIComponent(existingCategory.imageUrl)}`, {
          method: "DELETE",
        });
      }
      finalImageUrl = imageUrl;
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        parentId,
        imageUrl: finalImageUrl,
        subCategories: {
          set: subCategories.map((cat: Category) => ({ id: cat.id }))
        }
      },
    });

    revalidatePath("/admin/categories");

    return NextResponse.json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update category" },
      { status: 500 }
    );
  }
}

// Delete a category
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    
    const category = await prisma.category.findUnique({
      where: { id: Number(id) }
    });
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    // Hapus gambar dari Vercel Blob jika ada
    const imageUrl = category.imageUrl;
    if (imageUrl?.startsWith("https://")) {
      await fetch(`${baseUrl}/api/upload?url=${encodeURIComponent(imageUrl)}`, {
        method: "DELETE",
      });
    }

    await prisma.category.delete({ 
      where: { id: Number(id) } 
    });

    revalidatePath('/admin/categories');

    return NextResponse.json({ 
      success: true, 
      message: "Category and image deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete category" },
      { status: 500 }
    );
  }
}
