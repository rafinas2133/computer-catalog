'use client'

import { useSearchParams } from "next/navigation";

export default function ProductListPage() {
const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");

  // Tipe eksplisit untuk data produk
  const allProducts: Record<
    string,
    Record<string, string[]>
  > = {
    Electronics: {
      "Mobile Phones": ["iPhone 14", "Samsung Galaxy S23", "Google Pixel 7"],
      Laptops: ["MacBook Pro", "Dell XPS 13", "HP Spectre x360"],
    },
    Fashion: {
      Men: ["T-Shirts", "Jeans", "Shoes"],
      Women: ["Dresses", "Handbags", "Jewelry"],
    },
    "Home Appliances": {
      Kitchen: ["Microwave", "Blender", "Refrigerator"],
      Cleaning: ["Vacuum Cleaner", "Washing Machine", "Air Purifier"],
    },
  };

  // Mengambil produk berdasarkan kategori dan subkategori
  const products =
    allProducts[category as string]?.[subcategory as string] || [];

  return (
    <div className="max-w-screen-lg mx-auto py-8">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6">
        Products in {subcategory} ({category})
      </h1>

      {/* Product List */}
      {products.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product: string, index: number) => (
            <li
              key={index}
              className="border rounded-md p-4 hover:shadow-md transition"
            >
              {product}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found for this category/subcategory.</p>
      )}
    </div>
  );
}
