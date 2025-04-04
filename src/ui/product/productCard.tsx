'use client';

import Link from "next/link";
import Image from "next/image";
import { ErrorImage, whatsappIcon } from '@/utils/image';
import { useState } from "react";
import { ImageSkeleton } from "../skeleton/Skeleton";

export function ProductCard(
{  image, 
    title, 
    description, 
    link, 
    price,
}:{
    image?: string;
    title: string;
    description: string;
    link: string;
    price: number;
}) 
{
    const [imgSrc, setImgSrc] = useState(image ?? ErrorImage);
    const [isOptimized, setIsOptimized] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    function handleImageError() {
        setImgSrc(ErrorImage);
        setIsOptimized(false);
    }

    return (
        <>
        <div className="w-full h-full p-2 flex flex-row grow gap-2 border rounded-2xl">
            <Link href={link} className="w-1/6 h-32 relative">
            {(isLoading) && <ImageSkeleton/>}
            <Image 
                src={imgSrc} 
                alt={description} 
                layout="fill" 
                objectFit="cover" 
                className="rounded-xl" 
                unoptimized={!isOptimized}
                onError={() => handleImageError()} 
                onLoad={() => setIsLoading(false)}
            />
            </Link>
            <div className="flex flex-row w-5/6">
                <Link href={link} className="flex flex-col justify-start grow hover:text-hovered transform duration-300">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm">{description}</p>
                </Link>
                <div className="flex flex-col items-end gap-2">
                    <p className="text-lg font-semibold grow">Rp {price}</p>
                    <Link href="https://wa.me/628123456789" target="_blank" className="">
                        <Image src={whatsappIcon} alt="whatsapp" width={64} height={64}/>
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}
