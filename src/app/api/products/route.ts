import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';
import { prisma } from "../../../../prisma";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// GET all products
export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
  });
  return NextResponse.json(products);
}

// CREATE product
export async function POST(req: Request) {
  try {
    const { name, description, price, stock, imageUrl, categoryId } = await req.json();

    const newProduct = await prisma.product.create({
      data: { name, description, price, stock, imageUrl, categoryId },
    });

    revalidatePath('/admin/products');

    return NextResponse.json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ success: false, message: 'Failed to create product' }, { status: 500 });
  }
}

// UPDATE product
export async function PUT(req: Request) {
  try {
    const { id, name, description, price, stock, imageUrl, categoryId } = await req.json();

    const existingProducts = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProducts) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    if (imageUrl && imageUrl !== existingProducts.imageUrl) {
      if (existingProducts.imageUrl?.startsWith("https://")) {
        await fetch(`${baseUrl}/api/upload?url=${encodeURIComponent(existingProducts.imageUrl)}`, {
          method: "DELETE",
        });
      }
    }

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, description, price, stock, imageUrl, categoryId },
    });

    revalidatePath('/admin/products');

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ success: false, message: "Failed to update product" }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const product = await prisma.product.findUnique({
      where: { id: Number(id) }
    });

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    const imageUrl = product.imageUrl;
    if (imageUrl?.startsWith("https://")) {
      await fetch(`${baseUrl}/api/upload?url=${encodeURIComponent(imageUrl)}`, {
        method: "DELETE",
      });
    }

    await prisma.product.delete({ where: { id: Number(id) } });

    revalidatePath('/admin/products');

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ success: false, message: "Failed to delete product" }, { status: 500 });
  }
}
