'use client';

import { useState } from 'react';
import { Product } from '@/lib/definition';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import the router
import { CurrencyDollarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../button';
import { useCreateBanner } from '@/lib/bannerHooks';
import { showLoading, showSuccess, showError } from '../Modal';

export default function Form({ products }: { products: Product[] }) {
  const router = useRouter(); 
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!selectedFile) {
      alert("Please select an image file");
      return;
    }
  
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const productId = formData.get("productId") as string;

    showLoading();
  
    try {
      await useCreateBanner(title, productId, selectedFile);
      showSuccess("Banner created successfully!");
      // Use router.push to navigate programmatically
      setTimeout(() => {
        router.push('/admin/banners');
      }, 1500); // Short delay to allow the success message to be seen
    } catch (error) {
      console.error(error);
      showError("Error creating banner!");
    }
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
            defaultValue="#" 
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
            <input id="title" name="title" type="text" placeholder="Enter title" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm" required />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="mb-2 block text-sm font-medium">Upload Image</label>
          <input id="image" name="image" type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none" required/>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link href="/admin/banners" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600">Cancel</Link>
          <Button type="submit">Create Banner</Button>
        </div>
      </div>
    </form>
  );
}