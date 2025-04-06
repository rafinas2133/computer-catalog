import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos", 
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "4tiuhjlnn08yijes.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
