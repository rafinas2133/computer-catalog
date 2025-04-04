import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Get all products
export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
  });
  return NextResponse.json(products);
}

// Create a new product
export async function POST(req: Request) {
  try {
  const { name, description, price, stock, imageUrl, categoryId} = await req.json();
  
  const newProduct = await prisma.product.create({
    data: { 
      name, 
      description, 
      price, stock, 
      imageUrl, 
      categoryId, 
    },
  });

  revalidatePath('/admin/products');

    return NextResponse.json({ 
      success: true, 
      data: newProduct 
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create product' },
      { status: 500 }
    );
  }
}

// Update a product
export async function PUT(req: Request) {
  try {
    const { id, name, description, price, stock, imageUrl, categoryId } = await req.json();

    // Cek apakah banner ada di database
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    let finalImageUrl = existingProduct.imageUrl; // Default pakai gambar lama

    // Jika ada gambar baru, hapus gambar lama
    if (imageUrl && imageUrl !== existingProduct.imageUrl) {
      const oldFilename = existingProduct.imageUrl.split("/").pop();
      if (oldFilename) {
        const filePath = path.join(process.cwd(), "public", "uploads", oldFilename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      finalImageUrl = imageUrl;
    }

    // Update data banner
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, description, price, stock, imageUrl: finalImageUrl, categoryId },
    });

    // ✅ Revalidate cache
    revalidatePath('/admin/products');

    return NextResponse.json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating Product:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update Product" },
      { status: 500 }
    );
  }
}

// Delete a product
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    
    // First, get the banner to find the image URL
    const product = await prisma.product.findUnique({
      where: { id: Number(id) }
    });
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }
    
    // Extract the filename from the imageUrl
    // Assuming imageUrl is something like "/uploads/image123.jpg"
    const imageUrl = product.imageUrl;
    const filename = imageUrl.split('/').pop();
    
    // Delete the banner from the database
    await prisma.product.delete({ 
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
    revalidatePath('/admin/products');
    
    return NextResponse.json({ 
      success: true, 
      message: "product and image deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
