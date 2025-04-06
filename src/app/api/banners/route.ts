"use server";

import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';
import { prisma } from "../../../../prisma";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; 

export async function GET() {
  try {
    const banners = await prisma.banner.findMany();
    return NextResponse.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 });
  }
}


// Create a new banner
export async function POST(request: Request) {
  try {
    const { title, imageUrl, linkProduct } = await request.json();

    const newBanner = await prisma.banner.create({
      data: { title, imageUrl, linkProduct },
    });

    // Revalidate the banners path to update the cache
    revalidatePath('/admin/banners');

    return NextResponse.json({ 
      success: true, 
      data: newBanner 
    });
  } catch (error) {
    console.error('Error creating banner:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create banner' },
      { status: 500 }
    );
  }
}

// Delete a banner
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const banner = await prisma.banner.findUnique({
      where: { id: Number(id) },
    });

    if (!banner) {
      return NextResponse.json(
        { success: false, message: "Banner not found" },
        { status: 404 }
      );
    }

    const imageUrl = banner.imageUrl;

    // Kirim DELETE request ke endpoint upload, pakai URL absolut
    await fetch(`${baseUrl}/api/upload?url=${encodeURIComponent(imageUrl)}`, {
      method: 'DELETE',
    });

    await prisma.banner.delete({
      where: { id: Number(id) },
    });

    revalidatePath('/admin/banners');

    return NextResponse.json({
      success: true,
      message: "Banner and image deleted successfully",
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
    const { id, title, imageUrl, linkProduct } = await req.json();

    const existingBanner = await prisma.banner.findUnique({
      where: { id: Number(id) },
    });

    if (!existingBanner) {
      return NextResponse.json(
        { success: false, message: "Banner not found" },
        { status: 404 }
      );
    }

    let finalImageUrl = existingBanner.imageUrl;

    // Jika gambar baru berbeda, hapus gambar lama dari Vercel Blob
    if (imageUrl && imageUrl !== existingBanner.imageUrl) {
      if (existingBanner.imageUrl?.startsWith("https://")) {
        await fetch(`${baseUrl}/api/upload?url=${encodeURIComponent(existingBanner.imageUrl)}`, {
          method: "DELETE",
        });
      }

      finalImageUrl = imageUrl;
    }

    const updatedBanner = await prisma.banner.update({
      where: { id: Number(id) },
      data: {
        title,
        imageUrl: finalImageUrl,
        linkProduct,
      },
    });

    revalidatePath("/admin/banners");

    return NextResponse.json({
      success: true,
      data: updatedBanner,
    });
  } catch (error) {
    console.error("Error updating banner:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update banner" },
      { status: 500 }
    );
  }
}


