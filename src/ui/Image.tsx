'use client'

import Image from "next/image";
import { useState } from "react";
import { ErrorImage } from "@/utils/image";
import { ImageSkeleton } from "./skeleton/Skeleton";

interface ImageHolderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string | undefined;
    alt: string;
    className?: string;
    width: number;
    height: number;
  }

export default function ImageHolder({ src, alt, className, width, height}: ImageHolderProps) {

    const [imgSrc, setImgSrc] = useState(src ?? ErrorImage);
    const [isOptimized, setIsOptimized] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    function handleImageError() {
        setImgSrc(ErrorImage);
        setIsOptimized(false);
    }

    return (
        <>
            {(isLoading) && <div className="h-[28px] w-[28px]"><ImageSkeleton/></div>}
            <Image
                src={imgSrc}
                alt={alt}
                className={className}
                width={width}
                height={height}
                unoptimized={!isOptimized}
                onError={() => handleImageError()} 
                onLoad={() => setIsLoading(false)}
                >
            </Image>
        </>
    )
}