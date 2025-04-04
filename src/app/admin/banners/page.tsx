import Search from "@/ui/search";
import { CreateBanner } from "@/ui/banners/button";
import { Suspense } from 'react';
import BannerTable from "@/ui/banners/table";
import { BannerTableSkeleton } from "@/ui/skeleton/Skeleton";
import Pagination from "@/ui/banners/pagination";
import { useGetTotalBannerPages } from "@/lib/hooks";
export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>
}) {

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages =  await useGetTotalBannerPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl font-bold text-yellow-hunt">Banners</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 ">
                <Search placeholder="Search..."/>
                <CreateBanner/>
            </div>
            <Suspense key={query + currentPage} fallback={<BannerTableSkeleton />}>
                <BannerTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}