'use client';

import { useState, useEffect } from "react";
import { ErrorImage} from "@/utils/image";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
import Link from 'next/link';
import { useGetBanners } from "@/lib/bannerHooks";

export function Banner() {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; 

  const { banners, loading}  = useGetBanners();
  const [currentIndex, setCurrentIndex] = useState(1); // Start with 1 to show the first "real" banner
  const [isTransitioning, setIsTransitioning] = useState(false);


  // Extended banners with duplicates for seamless looping
  const extendedBanners = [
    banners[banners.length - 1], // Last banner
    ...banners,
    banners[0], // First banner
  ];

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  // Reset position after transition to loop seamlessly
  useEffect(() => {
    if (currentIndex === 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(banners.length);
      }, 500); // Match transition duration
      return () => clearTimeout(timer);
    }
    if (currentIndex === banners.length + 1) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500); // Match transition duration
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full max-h-[480px] mx-auto overflow-hidden bg-white shadow-2xl shadow-yellow-hunt/50">
      { loading ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="flex w-96 h-[480px] border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      ) : 
      (
        <>
        <div
        className="flex transition-transform ease-in-out duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
        }}
      >
        {extendedBanners.map((banner, index) => (
          <Link key={index} href={baseUrl + "/products/" + banner?.linkProduct} className="flex-shrink-0 w-full">
            <Image
              src={banner?.imageUrl ?? ErrorImage}
              alt={`Banner ${index}`}
              width={1920}
              height={400}
              className="w-full h-full object-fill object-center"
              placeholder="blur"
              blurDataURL= {ErrorImage}
            />
          </Link>
        ))}
      </div>
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 opacity-50 text-white p-2 rounded-full hover:bg-gray-900"
      >
        <ChevronLeftIcon className="w-6 h-6 bg-transparent" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 opacity-50 text-white p-2 rounded-full hover:bg-gray-900"
      >
        <ChevronRightIcon className="w-6 h-6 bg-transparent" />
      </button>
        </>
      )
      }
      
    </div>
  );
}
