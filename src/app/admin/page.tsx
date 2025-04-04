// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
// import { lusitana } from '@/app/ui/fonts';
// import { Suspense } from 'react';
// import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
// import CardWrapper from '@/app/ui/dashboard/cards';

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {

  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main>
      <h1 className={'mb-4 text-xl md:text-2xl text-white font-bold'}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-white">

      </div>
    </main>
  );
}