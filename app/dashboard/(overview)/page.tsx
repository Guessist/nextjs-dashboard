import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData, practice_  } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton, 
          LatestInvoicesSkeleton, 
          CardsSkeleton,
} from '@/app/ui/skeletons'; // 컴포넌트별로 스트리밍하는 방식
import InvoicesTable from '@/app/ui/invoices/table';
import CardWrapper from '@/app/ui/dashboard/cards';
// 각각의 정보를 DB로부터 저장해두고(const) return 내에서 어떻게 표시할지 결정된 형식
export default async function Page() {
  /* 
  스켈레톤을 표시하고, 여러 컴포넌트를 한번에 표시하고 싶은 경우 suspense를 사용.
  하나의 컴포넌트 안에서 다양한 컴포넌트 집어 넣기도 가능. (Card 참고)
  */
  //const revenue = await fetchRevenue(); 
  //const latestInvoices = await fetchLatestInvoices(); // wait for fetchRevenue() to finish
  // const {numberOfCustomers,
  //  numberOfInvoices,
  //  totalPaidInvoices, 
  //  totalPendingInvoices }  = await fetchCardData(); // wait for fetchLatestInvoices() to finish
  
  // const test = await practice_();
  
   return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard대시보드
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices/>
        </Suspense>
        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
      </div>
    </main>
  );
}