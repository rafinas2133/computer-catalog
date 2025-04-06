

import Link from 'next/link';
import { SearchV2 } from '../../search';
import DropdownMenu from './dropdownMenu';
import Image from 'next/image';
import { Logo } from '@/utils/image';
import { useGetCategories, useGetFilteredProducts } from '@/lib/hooks';
import { Suspense } from 'react';
import { SearchSkeleton } from '@/ui/skeleton/Skeleton';

export default async function NavLinks(props: {
  searchParams?: Promise<{
      query?: string;
      page?: string;
  }>
}) {

  const categories = await useGetCategories();
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const products = await useGetFilteredProducts(query, currentPage);

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
        <Suspense key={query + currentPage} fallback={<SearchSkeleton/>}>
          <SearchV2 placeholder="Search products..." products={products}/>
        </Suspense>
      </div>
    </div>
  );
}