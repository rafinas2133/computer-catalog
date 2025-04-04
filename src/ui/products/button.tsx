'use client'

import Link from "next/link";
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDeleteProduct } from "@/lib/productsHooks";
import { confirmDelete } from "../Modal";
export function CreateProduct() {
    return (
        <Link href={"/admin/products/create"}
            className="flex h-10 items-center rounded-lg bg-yellow-hunt px-4 text-center font-medium text-black transition-colors hover:bg-hovered focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-hunt/90"
        > 
            <span className="hidden md:block">Create Product</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    )
}

export function UpdateProduct({ id }: { id: number }) {
    return (
      <Link
        href={`/admin/products/${id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    );
  }
  
  export function DeleteProduct({ id}: { id: number}) {
    const { deleteproduct } = useDeleteProduct();
    console.log(id);

    const handleDelete = async (event: React.FormEvent) => {
      event.preventDefault();

      confirmDelete(async () => {
        await deleteproduct(id);
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