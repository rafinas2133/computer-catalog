import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";
import { revalidatePath } from 'next/cache';
import { Category } from "@/lib/definition";
import fs from 'fs';
import path from 'path';

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

    if(subCategories.length > 0) {
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
    } else {
      const newCategory = await prisma.category.create({
        data: { name, parentId, imageUrl },
      });

      revalidatePath('/admin/categories');

      return NextResponse.json({ 
        success: true, 
        data: newCategory 
      });
    }

  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create category' },
      { status: 500 }
    );
  }
}

// Delete a category
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    
    // First, get the banner to find the image URL
    const category = await prisma.category.findUnique({
      where: { id: Number(id) }
    });
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }
    
    // Extract the filename from the imageUrl
    // Assuming imageUrl is something like "/uploads/image123.jpg"
    const imageUrl = category.imageUrl;
    const filename = imageUrl.split('/').pop();
    
    // Delete the banner from the database
    await prisma.category.delete({ 
      where: { id: Number(id) } 
    });
    
    // Delete the image file from the filesystem
    if (filename) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      const filePath = path.join(uploadDir, filename);
      
      // Check if file exists before attempting to delete
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    // Revalidate the path to update the UI
    revalidatePath('/admin/categories');
    
    return NextResponse.json({ 
      success: true, 
      message: "Banner and image deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting banner:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete banner" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, parentId, subCategories, imageUrl } = await req.json();

    // Cek apakah banner ada di database
    const existingCategory = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { success: false, message: "Banner not found" },
        { status: 404 }
      );
    }

    let finalImageUrl = existingCategory.imageUrl; // Default pakai gambar lama

    // Jika ada gambar baru, hapus gambar lama
    if (imageUrl && imageUrl !== existingCategory.imageUrl) {
      const oldFilename = existingCategory.imageUrl.split("/").pop();
      if (oldFilename) {
        const filePath = path.join(process.cwd(), "public", "uploads", oldFilename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      finalImageUrl = imageUrl;
    }

    // Update data banner
    if(subCategories.length > 0) {
      const newCategory = await prisma.category.update({
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

      revalidatePath('/admin/categories');

      return NextResponse.json({ 
        success: true, 
        data: newCategory 
      });
    } else {
      const newCategory = await prisma.category.update({
        where: { id },
        data: { name, parentId, imageUrl },
      });

      revalidatePath('/admin/categories');

      return NextResponse.json({ 
        success: true, 
        data: newCategory 
      });
    }

  } catch (error) {
    console.error("Error updating banner:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update banner" },
      { status: 500 }
    );
  }
}