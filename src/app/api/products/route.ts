import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

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
  const { name, description, price, stock, imageUrl, categoryId } = await req.json();
  const newProduct = await prisma.product.create({
    data: { name, description, price, stock, imageUrl, categoryId },
  });
  return NextResponse.json(newProduct);
}

// Update a product
export async function PUT(req: Request) {
  const { id, name, description, price, stock, imageUrl, categoryId } = await req.json();
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: { name, description, price, stock, imageUrl, categoryId },
  });
  return NextResponse.json(updatedProduct);
}

// Delete a product
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ message: "Product deleted successfully" });
}
