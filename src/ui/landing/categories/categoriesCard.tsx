'use client';

import Link from "next/link";
import { ErrorImage } from "@/utils/image";
import Image from "next/image";
import { ImageSkeleton } from "@/ui/skeleton/Skeleton";
import { useState } from "react";

export function CategoryCard({
  title,
  image,
  link,
}: {
  title: string;
  image?: string;
  link: string;
}) {

  const linkParsed = link.replace(/\s+/g, "--");

  const [isLoading, setIsLoading] = useState(true);
  const [isOptimized, setIsOptimized] = useState(true);
  const [imgSrc, setImgSrc] = useState(image ?? ErrorImage);

  function handleImageError() {
    setImgSrc(ErrorImage);
    setIsOptimized(false);
  }

  return (
    <Link
      href={`products/${linkParsed}`}
      className="w-32 h-32 flex flex-col justify-center items-center rounded-lg hover:shadow-lg hover:shadow-yellow-hunt/50 transition duration-300 group"
    >
      <div className="w-24 h-24 rounded-full overflow-hidden group-hover:animate-breathe">
        {(isLoading) && <ImageSkeleton />}
        <Image
          src={imgSrc}
          alt={title}
          width={96}
          height={96}
          className="w-full h-full object-cover"
          onError={handleImageError}
          onLoad={() => setIsLoading(false)}
          unoptimized={!isOptimized}
          
        />
      </div>
      <h3 className="text-md font-semibold mt-4">{title}</h3>
    </Link>
  );
}
