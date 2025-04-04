import Search from "@/ui/search";
import { Suspense } from 'react';
import ProductsTable from "@/ui/products/table";
import { ProductsTableSkeleton } from "@/ui/skeleton/Skeleton";
import Pagination from "@/ui/categories/pagination";
import { useGetTotalProductPages } from "@/lib/hooks";
import { CreateProduct } from "@/ui/products/button";
export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>
}) {

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages =  await useGetTotalProductPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl font-bold text-yellow-hunt">Products</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 ">
                <Search placeholder="Search..."/>
                <CreateProduct/>
            </div>
            <Suspense key={query + currentPage} fallback={<ProductsTableSkeleton />}>
                <ProductsTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}