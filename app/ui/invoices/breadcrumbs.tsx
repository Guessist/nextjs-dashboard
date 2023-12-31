import { clsx } from 'clsx';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
// "Breadcrumb"는 사용자가 현재 위치한 페이지의 경로를
//  시각적으로 표시하는 탐색 요소를 나타냅니다

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx(lusitana.className, 'flex text-xl md:text-2xl')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
            )}
          >
            {/* 
            - key 속성은 주로 React에서 동적으로 생성되는 목록에서 각 항목을 식별하는 데 사용됩니다. 
            React의 성능 최적화 및 목록 업데이트에 도움이 됩니다. React에서 목록을 렌더링할 때 각 항목에 고유한 key를 제공하는 것이 좋습니다.
            - aria-current 속성은 현재 활성화된 항목을 나타내는 데 사용됩니다.
             주로 웹 페이지의 내비게이션 메뉴에서 현재 페이지를 표시하는 데 활용됩니다. 
             */}
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
