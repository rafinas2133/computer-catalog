'use client'

import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { Category } from '@/lib/definition';

export default function DropdownMenu({ categories }: { categories: Category[] }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const router = useRouter();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleMouseEnter = (category: Category) => setHoveredCategory(category);
  const handleMouseLeave = () => setHoveredCategory(null);

  function linkParser({link} : {link:string}) {
    return link.replace(/\s+/g, "--");
}
  

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/products/${linkParser({link: categoryName})}`);
  };

  const handleSubCategoryClick = (categoryName: string) => {
    router.push(`/products/${linkParser({link: categoryName})}`);
  };

  const handleProductClick = (categoryName: string, productId: number) => {
    router.push(`/products/${linkParser({link: categoryName})}/${productId}`);
  };

  return (
    <div className="relative">
      <button
        onClick ={toggleDropdown}
        className="p-2 rounded-md bg-yellow-hunt hover:bg-hovered"
      >
        <Bars3Icon className="h-6 w-6 text-black" />
      </button>

      {/* Dropdown Wrapper */}
      {isDropdownOpen && (
        <div
          className="absolute left-0 mt-2 w-[600px] flex text-black"
          onMouseLeave={handleMouseLeave}
        >
          {/* Categories List */}
          <div className="w-64 bg-yellow-hunt shadow-md rounded-md max-h-80 overflow-y-auto">
            <ul>
              {categories.filter((category) => category.parent === null).map((category) => (
                <li
                  key={category.id}
                  onMouseEnter={() => handleMouseEnter(category)}
                  onClick={() => handleCategoryClick(category.name)}
                  className="group px-4 py-2 hover:bg-hovered cursor-pointer"
                >
                  <span>{category.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Subcategories and Products */}
          {hoveredCategory && (
            <div className="w-96 bg-yellow-hunt shadow-md rounded-md max-h-80 overflow-y-auto p-4">
              {hoveredCategory.subCategories?.map((subCategory) => (
                <div key={subCategory.id} className="mb-4">
                  {/* Subcategory */}
                  <div
                    className="font-semibold cursor-pointer hover:text-hovered"
                    onClick={() => handleSubCategoryClick(subCategory.name)}
                  >
                    {subCategory.name}
                  </div>

                  {/* Products under Subcategory */}
                  <ul className="mt-2 space-y-1">
                    {subCategory.products.map((product) => (
                      <li
                        key={product.id}
                        onClick={() => handleProductClick( subCategory.name, product.id)}
                        className="pl-4 py-1 text-gray-700 hover:bg-hovered hover:text-white rounded-md cursor-pointer"
                      >
                        {product.name}
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
