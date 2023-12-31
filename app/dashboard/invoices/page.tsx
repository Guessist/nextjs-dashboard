import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';  // 페이지네이션


 /* URL 써치 파라미터
1) 북마크 및 공유 가능한 URL
2) 서버측 렌더링 및 초기 로드
3) 분석 및 추적
*/
export default async function Page({
  searchParams,
}: {
  searchParams?: { // searchParams? -> ?는 searchParams가 선택적으로 제공되어도 동작
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  // Number : 숫자를 string으로 바꾸는 컴포넌트
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query); // 페이지네이션
//  console.log('query: ', query);
//  console.log('currnetpages: ', currentPage)
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />  
        <CreateInvoice />
      </div>
      {/* key={query + currentPage}는  */}
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}