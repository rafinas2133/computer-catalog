import Search from "@/ui/search";
import { CreateCategory } from "@/ui/categories/button";
import { Suspense } from 'react';
import CategoryTable from "@/ui/categories/table";
import { CategoriesTableSkeleton } from "@/ui/skeleton/Skeleton";
import Pagination from "@/ui/categories/pagination";
import { useGetTotalCategoryPages } from "@/lib/hooks";
export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>
}) {

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages =  await useGetTotalCategoryPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl font-bold text-yellow-hunt">Banners</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 ">
                <Search placeholder="Search..."/>
                <CreateCategory/>
            </div>
            <Suspense key={query + currentPage} fallback={<CategoriesTableSkeleton />}>
                <CategoryTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}