'use client';

import {
  PhotoIcon,
  Squares2X2Icon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Banner', 
    href: '/admin/banners', 
    icon: PhotoIcon },
  {
    name: 'Categories',
    href: '/admin/categories',
    icon: Squares2X2Icon,
  },
  { name: 'Products', 
    href: '/admin/products', 
    icon: Square3Stack3DIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(`flex h-[48px] grow items-center justify-center gap-2 rounded-md shadow-2xl shadow-yellow-hunt p-3 text-sm font-medium hover:bg-hovered/70  md:flex-none md:justify-start md:p-2 md:px-3`,
              {
                ' bg-hovered text-black': pathname === link.href,
              },
              {
                'bg-yellow-hunt text-black': pathname !== link.href,
              },
          )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
