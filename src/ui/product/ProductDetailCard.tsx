'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ErrorImage, whatsappIcon2 } from "@/utils/image";
import { ImageSkeleton } from "../skeleton/Skeleton";

export function ProductDetailCard(
    {name,
    description,
    price,
    imageUrl
    }: {
        name: string;
        description: string;
        price: number;
        imageUrl: string;
    }) {

        const [imgSrc, setImgSrc] = useState(imageUrl ?? ErrorImage);
        const [ isOptimized, setIsOptimized ] = useState(true);
        const [ isLoading, setIsLoading ] = useState(true);

        function handleImageError() {
            setImgSrc(ErrorImage);
            setIsOptimized(false);
        }

    return (
        <div className="max-w-screen-lg w-full h-full rounded-xl p-6 bg-black ring-2 ring-yellow-hunt/50 text-yellow-hunt shadow-2xl shadow-yellow-hunt/50">
            <div className="flex h-fit flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 w-full md:w-1/3">
                    {(isLoading) && <ImageSkeleton/>}
                    <Image 
                        src={imgSrc} 
                        alt={description} 
                        layout="responsive" 
                        width={400} 
                        height={400} 
                        objectFit="cover" 
                        className="rounded-xl" 
                        unoptimized={!isOptimized}
                        onError={() => handleImageError()}
                        onLoad={() => setIsLoading(false)}
                    />
                </div>
                <div className="flex flex-col w-full md:w-2/3">
                    <div className="grow">
                        <h1 className="text-3xl font-bold mb-6">{name}</h1>
                        <p className="text-lg mb-4">{description}</p>
                        <p className="text-xl font-semibold text-red-600 mb-6">${price}</p>
                    </div>
                    <Link 
                        href={`https://wa.me/6281290669999?text=Halo%20saya%20ingin%20beli%20${name}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-yellow-hunt text-black py-2 px-4 rounded-lg shadow hover:bg-hovered transition inline-flex justify-center"
                    >
                        <Image src={whatsappIcon2} alt="whatsapp-icon" width={24} height={24} className="inline mr-2" /> Beli Sekarang
                    </Link>
                </div>
            </div>
        </div>
    );
}