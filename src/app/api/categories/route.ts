import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all categories
export async function GET() {
  const categories = await prisma.category.findMany({
    include: { subCategories: true, products: true },
  });
  return NextResponse.json(categories);
}

// Create a new category
export async function POST(req: Request) {
  const { name, imageUrl, parentId } = await req.json();
  const newCategory = await prisma.category.create({
    data: { name, imageUrl, parentId },
  });
  return NextResponse.json(newCategory);
}

// Delete a category
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ message: "Category deleted successfully" });
}
