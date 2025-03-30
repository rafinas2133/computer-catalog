import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all banners
export async function GET() {
  const banners = await prisma.banner.findMany();
  return NextResponse.json(banners);
}

// Create a new banner
export async function POST(req: Request) {
  const { title, imageUrl } = await req.json();
  const newBanner = await prisma.banner.create({
    data: { title, imageUrl },
  });
  return NextResponse.json(newBanner);
}

// Delete a banner
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.banner.delete({ where: { id } });
  return NextResponse.json({ message: "Banner deleted successfully" });
}
