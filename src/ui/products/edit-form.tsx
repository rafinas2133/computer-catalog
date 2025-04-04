'use client';

import { useState } from 'react';
import { Category, Product } from '@/lib/definition';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import the router
import { CurrencyDollarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../button';
import { useUpdateProduct } from '@/lib/productsHooks';
import { showLoading, showSuccess, showError } from '../Modal';

export default function Form({
  products, 
  categories 
}: { 
  products: Product,
  categories: Category[] 
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
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const quantity = Number(formData.get("quantity"));
    const categoryId = Number(formData.get("categoryId"));

    showLoading();
  
    try {
      await useUpdateProduct( products.id, name, description, price, quantity, categoryId, selectedFile, products.imageUrl);
      showSuccess("Product created successfully!", "/admin/products");
      // Use router.push to navigate programmatically
      setTimeout(() => {
        router.push('/admin/products');
      }, 1500); // Short delay to allow the success message to be seen
    } catch (error) {
      console.error(error);
      showError("Error creating product!");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="rounded-md bg-gray-50 p-4 md:p-6" aria-describedby='field-error'>
        
        {/* Category Selection */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">Choose product category</label>
          <div className="relative">
            <select 
            id="category" 
            name="categoryId"
            defaultValue={products.categoryId} 
            required
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm">
              <option value="#" disabled>Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">Enter Name</label>
          <div className="relative">
            <input 
            id="name" 
            name="name" 
            type="text" 
            placeholder="Enter name" 
            defaultValue={products.name}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm" required />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">Enter Description</label>
          <textarea 
          id="description" 
          name="description" 
          placeholder="Enter description"
          defaultValue={products.description} 
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm" required></textarea>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">Enter Price</label>
          <div className="relative">
            <input 
            id="price" 
            name="price" 
            type="number" 
            placeholder="Enter price" 
            defaultValue={products.price}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm" required />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label htmlFor="quantity" className="mb-2 block text-sm font-medium">Enter Quantity</label>
          <input 
          id="quantity" 
          name="quantity" 
          type="number" 
          defaultValue={products.stock}
          placeholder="Enter quantity" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm" required />
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
          {products.imageUrl && (
            <div className="mt-2 text-sm text-gray-600">
              Current Image:{' '}
              <img
                src={products.imageUrl}
                alt="Current"
                className="mt-1 h-20 rounded object-contain"
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link href="/admin/products" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600">Cancel</Link>
          <Button type="submit">Update Product</Button>
        </div>
      </div>
    </form>
  );
}