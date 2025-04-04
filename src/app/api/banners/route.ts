"use server";

import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';
import { prisma } from "../../../../prisma";
import fs from 'fs';
import path from 'path';

// Get all banners
export async function GET() {
  try {
    const banners = await prisma.banner.findMany();
    return NextResponse.json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch banners' },
      { status: 500 }
    );
  }
}

// Create a new banner
 // Adjust this import to your prisma client setup

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
    
    // First, get the banner to find the image URL
    const banner = await prisma.banner.findUnique({
      where: { id: Number(id) }
    });
    
    if (!banner) {
      return NextResponse.json(
        { success: false, message: "Banner not found" },
        { status: 404 }
      );
    }
    
    // Extract the filename from the imageUrl
    // Assuming imageUrl is something like "/uploads/image123.jpg"
    const imageUrl = banner.imageUrl;
    const filename = imageUrl.split('/').pop();
    
    // Delete the banner from the database
    await prisma.banner.delete({ 
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
    revalidatePath('/admin/banners');
    
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
    const { id, title, imageUrl, linkProduct } = await req.json();

    // Cek apakah banner ada di database
    const existingBanner = await prisma.banner.findUnique({
      where: { id: Number(id) },
    });

    if (!existingBanner) {
      return NextResponse.json(
        { success: false, message: "Banner not found" },
        { status: 404 }
      );
    }

    let finalImageUrl = existingBanner.imageUrl; // Default pakai gambar lama

    // Jika ada gambar baru, hapus gambar lama
    if (imageUrl && imageUrl !== existingBanner.imageUrl) {
      const oldFilename = existingBanner.imageUrl.split("/").pop();
      if (oldFilename) {
        const filePath = path.join(process.cwd(), "public", "uploads", oldFilename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      finalImageUrl = imageUrl;
    }

    // Update data banner
    const updatedBanner = await prisma.banner.update({
      where: { id: Number(id) },
      data: { title, imageUrl: finalImageUrl, linkProduct },
    });

    // ✅ Revalidate cache
    revalidatePath('/admin/banners');

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

