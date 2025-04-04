

import Link from 'next/link';
import Search from '../../search';
import DropdownMenu from './dropdownMenu';
import Image from 'next/image';
import { Logo } from '@/utils/image';
import { useGetCategories } from '@/lib/hooks';

export default async function NavLinks() {

  const categories = await useGetCategories();

  return (
    <div className="flex items-center gap-4 w-full">
      <DropdownMenu categories={categories} />

      <Link
        href="/"
        className="flex text-lg font-bold text-yellow-hunt hover:text-hovered"
      >
        <Image
          src={Logo}
          alt='logo Techtonic'
          width={32}
          height={32}
        />
        Techtonic
      </Link>

      <div className="flex-1">
        <Search placeholder="Search products..." />
      </div>
    </div>
  );
}