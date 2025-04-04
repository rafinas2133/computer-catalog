'use client'

import Link from "next/link";
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDeleteCategory } from "@/lib/categoryHooks";
import { confirmDelete } from "../Modal";
export function CreateCategory() {
    return (
        <Link href={"/admin/categories/create"}
            className="flex h-10 items-center rounded-lg bg-yellow-hunt px-4 text-center font-medium text-black transition-colors hover:bg-hovered focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-hunt/90"
        > 
            <span className="hidden md:block">Create Category</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    )
}

export function UpdateCategory({ id }: { id: number }) {
    return (
      <Link
        href={`/admin/categories/${id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    );
  }
  
  export function DeleteCategory({ id}: { id: number}) {
    const { deleteCategory } = useDeleteCategory();

    const handleDelete = async (event: React.FormEvent) => {
      event.preventDefault();

      confirmDelete(async () => {
        await deleteCategory(id);
      });
    }
    
    return (
      <>
        <form onSubmit={handleDelete}>
          <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
          </button>
        </form>
      </>
    );
  }