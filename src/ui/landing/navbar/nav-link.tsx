'use client';

import Link from 'next/link';
import Search from '../../search';
import DropdownMenu from './dropdownMenu';

export default function NavLinks() {

  return (
    <div className="flex items-center gap-4 w-full">
      <DropdownMenu />

      {/* Logo */}
      <Link
        href="/"
        className="text-lg font-bold text-gray-900 hover:text-blue-600"
      >
        Tokonya
      </Link>

      {/* Search */}
      <div className="flex-1">
        <Search placeholder="Search products..." />
      </div>
    </div>
  );
}