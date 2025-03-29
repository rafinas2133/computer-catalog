'use client';

import {
  UserGroupIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Search from '../../search';
import DropdownMenu from './dropdownMenu';

const links = [
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

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