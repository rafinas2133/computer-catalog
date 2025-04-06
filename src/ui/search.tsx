'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Product } from '@/lib/definition';
import Link from 'next/link';

export default function Search({ placeholder }: { placeholder: string }) {
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    }
    else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">Search</label>
      <input
        id="search"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()} // memanggil fungsi untuk update
        className="peer block w-full rounded-md border border-yellow-hunt py-[9px] pl-10 text-sm outline-2 placeholder:text-yellow-hunt text-yellow-hunt"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-yellow-hunt peer-focus:text-hovered" />
    </div>
  );
}

export function SearchV2({ 
  placeholder,
  products
}: {
  products: Product[],
  placeholder: string 
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [inputValue, setInputValue] = useState<string>(searchParams.get('query')?.toString() || '');

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
      const matches = products.filter(p =>
        p.name.toLowerCase().includes(term.toLowerCase())
      );
      setFiltered(matches);
    } else {
      params.delete('query');
      setFiltered([]);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    if (!inputValue) {
      setFiltered([]);
    }
  }, [inputValue]);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">Search</label>
      <input
        id="search"
        placeholder={placeholder}
        onChange={(e) => {
          const val = e.target.value;
          setInputValue(val);
          handleSearch(val);
        }}
        value={inputValue}
        className="peer block w-full rounded-md border border-yellow-hunt py-[9px] pl-10 text-sm outline-2 placeholder:text-yellow-hunt text-yellow-hunt"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-yellow-hunt peer-focus:text-hovered" />

      {/* Autocomplete Results */}
      {inputValue && (
        <div className="absolute top-full left-0 right-0 z-10 bg-black border border-yellow-hunt rounded-md mt-1 shadow-md max-h-60 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.category.name}/${product.id}`}
                className="block px-4 py-2 text-sm text-yellow-hunt hover:bg-yellow-hunt hover:text-white"
                onClick={() => setFiltered([])}
              >
                {product.name}
              </Link>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-yellow-hunt italic">
              Produk tidak ditemukan
            </div>
          )}
        </div>
      )}
    </div>
  );
}
