'use client';

import { useState } from 'react';
import { Product, Banner } from '@/lib/definition';
import Link from 'next/link';
import { CurrencyDollarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../button';
import { useRouter } from 'next/navigation';
import { useUpdateBanner } from '@/lib/bannerHooks';
import { showLoading, showSuccess, showError, confirmUpdate } from '../Modal';

export default function Form({ 
    banners,
    products 
}: {
    banners: Banner,
    products: Product[] 
}) {
  const router = useRouter(); 
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const productId = formData.get("productId") as string;
  
    confirmUpdate(async () => {
      showLoading();
  
      try {
        await useUpdateBanner(banners.id, title, productId, selectedFile, banners.imageUrl);
        showSuccess("Banner updated successfully!");
        
        // Navigasi setelah sukses
        router.push('/admin/banners');
      } catch (error) {
        console.error("Update Error:", error);
        showError("Error updating banner!");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="rounded-md bg-gray-50 p-4 md:p-6" aria-describedby='field-error'>
        
        {/* Product Selection */}
        <div className="mb-4">
          <label htmlFor="product" className="mb-2 block text-sm font-medium">Choose product to Link in Banner</label>
          <div className="relative">
            <select 
            id="product" 
            name="productId"
            defaultValue={banners.linkProduct} 
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm">
              <option value="#" disabled>Select a product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">Enter Title</label>
          <div className="relative">
            <input 
            id="title" 
            name="title" 
            type="text"
            defaultValue={banners.title} 
            placeholder="Enter title" 
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm" required />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="mb-2 block text-sm font-medium">
            Upload Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50"
          />
          {banners.imageUrl && (
            <div className="mt-2 text-sm text-gray-600">
              Current Image:{' '}
              <img
                src={banners.imageUrl}
                alt="Current"
                className="mt-1 h-20 rounded object-contain"
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link href="/admin/banners" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600">Cancel</Link>
          <Button type="submit">Update Banner</Button>
        </div>
      </div>
    </form>
  );
}