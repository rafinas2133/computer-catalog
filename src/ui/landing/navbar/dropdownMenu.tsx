'use client';

import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { categoriesData } from '@/utils/data';
import { useRouter } from 'next/navigation';

export default function DropdownMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

  const router = useRouter();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleMouseEnter = (categoryName: string) => {
    setHoveredCategory(categoryName);
    setIsSubMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
    setIsSubMenuVisible(false);
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/products/${category}`);
  };

  const handleSubCategoryClick = (category: string, subcategory: string) => {
    router.push(`/products/${category}/${subcategory}`);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-md bg-gray-200 hover:bg-gray-300"
      >
        <Bars3Icon className="h-6 w-6 text-gray-800" />
      </button>

      {/* Dropdown Wrapper */}
      {isDropdownOpen && (
        <div
          className="absolute left-0 mt-2 w-[500px] flex"
          onMouseEnter={() => setIsSubMenuVisible(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Dropdown for Categories */}
          <div className="w-64 bg-white shadow-md rounded-md max-h-80 overflow-y-auto">
            <ul>
              {categoriesData.map((category) => (
                <li
                  key={category.name}
                  onMouseEnter={() => handleMouseEnter(category.name)}
                  onClick={() => handleCategoryClick(category.name)} // Navigasi ke kategori
                  className="group px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <span>{category.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dropdown for Subcategories */}
          {isSubMenuVisible && hoveredCategory && (
            <div className="w-96 bg-white shadow-md rounded-md max-h-80 overflow-y-auto flex flex-col gap-4 p-4">
              {categoriesData
                .find((category) => category.name === hoveredCategory)
                ?.subCategories.map((subCategory) => (
                  <div
                    key={subCategory.name}
                    className="flex flex-col cursor-pointer"
                    onClick={() => handleSubCategoryClick(hoveredCategory, subCategory.name)} // Navigasi ke subkategori
                  >
                    <span className="font-semibold">{subCategory.name}</span>
                    <ul className="mt-2 space-y-1">
                      {subCategory.products.map((product, index) => (
                        <li
                          key={index}
                          className="pl-4 py-1 text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                          {product}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
