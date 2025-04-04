'use client';

import { useState, useEffect } from "react";
import { ErrorImage, banner1, banner2, banner3 } from "@/utils/image";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
import Link from 'next/link';

const banners = [
  { id: 1, image: banner1, link: "/page1" },
  { id: 2, image: banner2, link: "/page2" },
  { id: 3, image: banner3, link: "/page3" },
];

export function Banner() {
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
      <div
        className="flex transition-transform ease-in-out duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
        }}
      >
        {extendedBanners.map((banner, index) => (
          <Link key={index} href={banner.link} className="flex-shrink-0 w-full ">
            <Image
              src={banner.image ?? ErrorImage}
              alt={`Banner ${index}`}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
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
    </div>
  );
}
