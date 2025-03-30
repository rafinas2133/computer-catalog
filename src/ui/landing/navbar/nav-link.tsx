

import Link from 'next/link';
import Search from '../../search';
import DropdownMenu from './dropdownMenu';
import { useGetCategories } from '@/lib/hooks';

export default async function NavLinks() {

  const categories = await useGetCategories();

  return (
    <div className="flex items-center gap-4 w-full">
      <DropdownMenu categories={categories} />

      {/* Logo */}
      <Link
        href="/"
        className="text-lg font-bold text-gray-900 hover:text-blue-600"
      >
        Logo Toko
      </Link>

      {/* Search */}
      <div className="flex-1">
        <Search placeholder="Search products..." />
      </div>
    </div>
  );
}