'use client';

import { useState } from 'react';
import { Category } from '@/lib/definition';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CurrencyDollarIcon} from '@heroicons/react/24/outline';
import { Button } from '../button';
import { useCreateCategory } from '@/lib/categoryHooks';
import { showLoading, showSuccess, showError } from '../Modal';

export default function Form({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isParent, setIsParent] = useState<boolean>(true);
  const [selectedSubCategories, setSelectedSubCategories] = useState<number[]>([]);

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
    const name = formData.get("name") as string;
    const parentId = isParent ? null : Number(formData.get("parentId"));
    const subCategories = isParent
  ? categories.filter(cat => selectedSubCategories.includes(cat.id))
  : [];

    showLoading();

    try {
      await useCreateCategory(name, parentId, subCategories, [], selectedFile);
      showSuccess("Category created successfully!");
      setTimeout(() => {
        router.push('/admin/categories');
      }, 1500);
    } catch (error) {
      console.error(error);
      showError("Error creating category!");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="rounded-md bg-gray-50 p-4 md:p-6" aria-describedby="field-error">

        {/* Category Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">Category Name</label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter category name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm"
              required
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Checkbox - Is Parent Category */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
              checked={isParent}
              onChange={(e) => setIsParent(e.target.checked)}
            />
            <span className="ml-2 text-sm">Is Parent Category?</span>
          </label>
        </div>

        {/* Parent Category Selector */}
        {!isParent && (
          <div className="mb-4">
            <label htmlFor="parentId" className="mb-2 block text-sm font-medium">Select Parent Category</label>
            <select
              id="parentId"
              name="parentId"
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              required={!isParent}
            >
              <option value="">-- Select Parent Category --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Subcategories Multi-select */}
        {isParent && (
          <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Select Subcategories</label>
          <div className="space-y-2 max-h-40 overflow-y-auto border p-3 rounded-md">
            {categories.map(cat => (
              <label key={cat.id} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  value={cat.id}
                  checked={selectedSubCategories.includes(cat.id)}
                  onChange={(e) => {
                    const id = Number(e.target.value);
                    setSelectedSubCategories((prev) =>
                      e.target.checked
                        ? [...prev, id]
                        : prev.filter((val) => val !== id)
                    );
                  }}
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span>{cat.name}</span>
              </label>
            ))}
          </div>
        </div>
        
        )}

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="mb-2 block text-sm font-medium">Upload Image</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50"
            required
          />
        </div>

        {/* Submit/Cancel Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <Link href="/admin/categories" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600">Cancel</Link>
          <Button type="submit">Create Category</Button>
        </div>
      </div>
    </form>
  );
}
