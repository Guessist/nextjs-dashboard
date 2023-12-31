'use client' // 액티브 링크를 위한 것
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 액티브 링크를 위한 것
import clsx from 'clsx'; // 액티브 링크를 위한 것
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [  // 네비게이션 바에 아래 형식으로 페이지 추가 가능. 
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname(); // 액티브 링크를 위한 것

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;   // 아이콘 존재하는지 확인, 없으면 추가
        return (
          <Link    // 내가 만든 앱 내에서 페이지 사이의 링크해주는 컴포넌트.: client-side navigation with JavaScript를 가능하게해줌
            key={link.name}
            href={link.href}            
            className={clsx(   
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          > {/* clsx : 액티브 링크를 위한 css stying 라이브러리 */}
            <LinkIcon className="w-6" />   {/* 아이콘 먼저 띄우고 이름 띄우기 */}
            <p className="hidden md:block">{link.name}</p>
          </Link>  // a -> Link로 바꾸면서 다른 페이지 누를때마다 리프레시 되지 않음. 개굿
        );
      })}
    </>
  );
}
